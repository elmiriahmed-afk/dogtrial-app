import { verifyPassword, signToken, json, isValidEmail, corsPreflight } from "../_lib/auth.js";

export function onRequestOptions() { return corsPreflight(); }

export async function onRequestPost({ request, env }) {
  var body;
  try { body = await request.json(); } catch (e) { return json({ error: "Invalid JSON" }, 400); }

  var email = (body.email || "").trim().toLowerCase();
  var password = body.password || "";
  if (!isValidEmail(email) || !password) return json({ error: "Enter your email and password" }, 400);

  var user = await env.DB.prepare("SELECT id, password_hash, salt FROM users WHERE email = ?").bind(email).first();
  if (!user) return json({ error: "Incorrect email or password" }, 401);

  var ok = await verifyPassword(password, user.salt, user.password_hash);
  if (!ok) return json({ error: "Incorrect email or password" }, 401);

  var token = await signToken(user.id, env.SESSION_SECRET);
  return json({ token: token });
}
