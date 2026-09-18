// Shared helpers for the Pages Functions under /api/*. Password hashing uses
// PBKDF2 via Web Crypto (no external deps available in the Workers runtime).
// Sessions are stateless signed tokens (HMAC-SHA256 over userId + expiry) so
// there's no session table to clean up.

const PBKDF2_ITERATIONS = 100000;
const TOKEN_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

function toHex(buf) {
  return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
}

function fromHex(hex) {
  var bytes = new Uint8Array(hex.length / 2);
  for (var i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  return bytes;
}

function b64urlEncode(str) {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(str) {
  var padded = str.replace(/-/g, "+").replace(/_/g, "/");
  while (padded.length % 4) padded += "=";
  return atob(padded);
}

export async function hashPassword(password) {
  var salt = crypto.getRandomValues(new Uint8Array(16));
  var keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  var derived = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return { hash: toHex(derived), salt: toHex(salt) };
}

export async function verifyPassword(password, saltHex, hashHex) {
  var keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  var derived = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: fromHex(saltHex), iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return toHex(derived) === hashHex;
}

async function hmac(secret, message) {
  var key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  var sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return toHex(sig);
}

export async function signToken(userId, secret) {
  var payload = JSON.stringify({ uid: userId, exp: Date.now() + TOKEN_TTL_MS });
  var payloadB64 = b64urlEncode(payload);
  var sig = await hmac(secret, payloadB64);
  return payloadB64 + "." + sig;
}

export async function verifyToken(token, secret) {
  if (!token || token.indexOf(".") === -1) return null;
  var parts = token.split(".");
  var payloadB64 = parts[0], sig = parts[1];
  var expected = await hmac(secret, payloadB64);
  if (expected !== sig) return null;
  var payload;
  try { payload = JSON.parse(b64urlDecode(payloadB64)); } catch (e) { return null; }
  if (!payload.uid || !payload.exp || payload.exp < Date.now()) return null;
  return payload.uid;
}

// The native Android/iOS builds call this API from a local Capacitor origin
// (capacitor://localhost, https://localhost), so every response — including
// preflight — needs CORS headers, unlike a same-origin web-only setup.
export var CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

export function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: Object.assign({ "Content-Type": "application/json" }, CORS_HEADERS)
  });
}

export function corsPreflight() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function requireUser(request, env) {
  var authHeader = request.headers.get("Authorization") || "";
  var token = authHeader.indexOf("Bearer ") === 0 ? authHeader.slice(7) : "";
  return verifyToken(token, env.SESSION_SECRET);
}

export function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function newId() {
  return crypto.randomUUID();
}
