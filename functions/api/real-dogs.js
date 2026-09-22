import { requireUser, json, newId, corsPreflight } from "../_lib/auth.js";

export function onRequestOptions() { return corsPreflight(); }

// GET /api/real-dogs — list the caller's real (post-adoption) dog profiles.
export async function onRequestGet({ request, env }) {
  var userId = await requireUser(request, env);
  if (!userId) return json({ error: "Unauthorized" }, 401);

  var rows = await env.DB.prepare(
    "SELECT id, name, arrival_date, birth_date, estimated_age, breed, photo_ref, time_zone, archived_at, created_at FROM real_dogs WHERE user_id = ? ORDER BY created_at ASC"
  ).bind(userId).all();

  return json({ dogs: rows.results || [] });
}

// POST /api/real-dogs — confirm an adoption transition and create the real
// dog profile. Idempotent on idempotencyKey: a retried or double-tapped
// confirm returns the same dog instead of creating a second one.
export async function onRequestPost({ request, env }) {
  var userId = await requireUser(request, env);
  if (!userId) return json({ error: "Unauthorized" }, 401);

  var body;
  try { body = await request.json(); } catch (e) { return json({ error: "Invalid JSON" }, 400); }

  var idempotencyKey = (body.idempotencyKey || "").trim();
  var name = (body.name || "").trim();
  var arrivalDate = (body.arrivalDate || "").trim();
  var timeZone = (body.timeZone || "").trim();
  if (!idempotencyKey) return json({ error: "Missing idempotencyKey" }, 400);
  if (!name) return json({ error: "Enter your dog's name" }, 400);
  if (!arrivalDate) return json({ error: "Enter the arrival date" }, 400);
  if (!timeZone) return json({ error: "Missing time zone" }, 400);

  var existingTransition = await env.DB.prepare(
    "SELECT real_dog_id FROM adoption_transitions WHERE idempotency_key = ? AND user_id = ?"
  ).bind(idempotencyKey, userId).first();

  if (existingTransition) {
    var existingDog = await env.DB.prepare(
      "SELECT id, name, arrival_date, birth_date, estimated_age, breed, photo_ref, time_zone, archived_at, created_at FROM real_dogs WHERE id = ?"
    ).bind(existingTransition.real_dog_id).first();
    return json({ dog: existingDog, alreadyConfirmed: true });
  }

  var dogId = newId();
  var transitionId = newId();
  var now = Date.now();

  await env.DB.batch([
    env.DB.prepare(
      "INSERT INTO real_dogs (id, user_id, name, arrival_date, birth_date, estimated_age, breed, photo_ref, time_zone, archived_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?)"
    ).bind(
      dogId, userId, name, arrivalDate,
      body.birthDate || null, body.estimatedAge || null, body.breed || null, body.photoRef || null,
      timeZone, now
    ),
    env.DB.prepare(
      "INSERT INTO adoption_transitions (id, user_id, source_simulation_id, real_dog_id, idempotency_key, confirmed_at) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(transitionId, userId, body.sourceSimulationId || null, dogId, idempotencyKey, now)
  ]);

  var dog = await env.DB.prepare(
    "SELECT id, name, arrival_date, birth_date, estimated_age, breed, photo_ref, time_zone, archived_at, created_at FROM real_dogs WHERE id = ?"
  ).bind(dogId).first();

  return json({ dog: dog, alreadyConfirmed: false });
}
