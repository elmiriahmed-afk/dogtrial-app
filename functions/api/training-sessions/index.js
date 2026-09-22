import { requireUser, json, newId, corsPreflight } from "../../_lib/auth.js";

export function onRequestOptions() { return corsPreflight(); }

const SESSION_COLUMNS = "id, lesson_id, difficulty, completed_at, created_at";
const DIFFICULTIES = ["easy", "almost", "too_hard"];

// GET /api/training-sessions?dogId=... — every practiced session for a real
// dog's Life Together program, newest first. Ownership is checked via
// real_dogs.user_id, same as routines/activity-logs.
export async function onRequestGet({ request, env }) {
  var userId = await requireUser(request, env);
  if (!userId) return json({ error: "Unauthorized" }, 401);

  var url = new URL(request.url);
  var dogId = url.searchParams.get("dogId");
  if (!dogId) return json({ error: "Missing dogId" }, 400);

  var dog = await env.DB.prepare("SELECT id FROM real_dogs WHERE id = ? AND user_id = ?").bind(dogId, userId).first();
  if (!dog) return json({ error: "Not found" }, 404);

  var rows = await env.DB.prepare(
    "SELECT " + SESSION_COLUMNS + " FROM training_sessions WHERE dog_id = ? ORDER BY completed_at DESC"
  ).bind(dogId).all();

  return json({ sessions: rows.results || [] });
}

// POST /api/training-sessions — log a practiced lesson (Easy / Almost / Too
// hard) for a dog the caller owns. Not idempotent by design: practicing the
// same lesson again on a later day is a new session, not a correction.
export async function onRequestPost({ request, env }) {
  var userId = await requireUser(request, env);
  if (!userId) return json({ error: "Unauthorized" }, 401);

  var body;
  try { body = await request.json(); } catch (e) { return json({ error: "Invalid JSON" }, 400); }

  var dogId = (body.dogId || "").trim();
  var lessonId = (body.lessonId || "").trim();
  var difficulty = (body.difficulty || "").trim();

  if (!dogId) return json({ error: "Missing dogId" }, 400);
  if (!lessonId) return json({ error: "Missing lessonId" }, 400);
  if (DIFFICULTIES.indexOf(difficulty) === -1) return json({ error: "Invalid difficulty" }, 400);

  var dog = await env.DB.prepare("SELECT id FROM real_dogs WHERE id = ? AND user_id = ?").bind(dogId, userId).first();
  if (!dog) return json({ error: "Not found" }, 404);

  var id = newId();
  var now = Date.now();
  await env.DB.prepare(
    "INSERT INTO training_sessions (id, dog_id, user_id, lesson_id, difficulty, completed_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).bind(id, dogId, userId, lessonId, difficulty, now, now).run();

  var session = await env.DB.prepare("SELECT " + SESSION_COLUMNS + " FROM training_sessions WHERE id = ?").bind(id).first();
  return json({ session: session });
}
