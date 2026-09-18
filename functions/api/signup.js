import { hashPassword, signToken, json, isValidEmail, newId, corsPreflight } from "../_lib/auth.js";

export function onRequestOptions() { return corsPreflight(); }

export async function onRequestPost({ request, env }) {
  var body;
  try { body = await request.json(); } catch (e) { return json({ error: "Invalid JSON" }, 400); }

  var email = (body.email || "").trim().toLowerCase();
  var password = body.password || "";
  if (!isValidEmail(email)) return json({ error: "Enter a valid email address" }, 400);
  if (password.length < 8) return json({ error: "Password must be at least 8 characters" }, 400);

  var existing = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
  if (existing) return json({ error: "An account with this email already exists" }, 409);

  var hashed = await hashPassword(password);
  var id = newId();
  await env.DB.prepare(
    "INSERT INTO users (id, email, password_hash, salt, created_at) VALUES (?, ?, ?, ?, ?)"
  ).bind(id, email, hashed.hash, hashed.salt, Date.now()).run();

  var token = await signToken(id, env.SESSION_SECRET);
  return json({ token: token });
}
