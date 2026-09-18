import { requireUser, json, newId, corsPreflight } from "../_lib/auth.js";

export function onRequestOptions() { return corsPreflight(); }

export async function onRequestPost({ request, env }) {
  var userId = await requireUser(request, env);
  if (!userId) return json({ error: "Unauthorized" }, 401);

  var body;
  try { body = await request.json(); } catch (e) { return json({ error: "Invalid JSON" }, 400); }

  var id = newId();
  await env.DB.prepare(
    "INSERT INTO onboarding_submissions (id, user_id, breed_id, housing_id, life_id, sex, start_stage, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(
    id, userId,
    body.breedId || null, body.housingId || null, body.lifeId || null,
    body.sex || null, body.startStage || null,
    Date.now()
  ).run();

  return json({ ok: true });
}
