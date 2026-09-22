import { requireUser, json, newId, corsPreflight } from "../../_lib/auth.js";

export function onRequestOptions() { return corsPreflight(); }

const ROUTINE_COLUMNS = "id, dog_id, type, title, local_time, recurrence, active, created_at";

// GET /api/routines?dogId=... — list a real dog's active + inactive routines
// (archived ones excluded). Ownership is checked via real_dogs.user_id, not
// a client-supplied field, so one account can never list another's routines.
export async function onRequestGet({ request, env }) {
  var userId = await requireUser(request, env);
  if (!userId) return json({ error: "Unauthorized" }, 401);

  var url = new URL(request.url);
  var dogId = url.searchParams.get("dogId");
  if (!dogId) return json({ error: "Missing dogId" }, 400);

  var dog = await env.DB.prepare("SELECT id FROM real_dogs WHERE id = ? AND user_id = ?").bind(dogId, userId).first();
  if (!dog) return json({ error: "Not found" }, 404);

  var rows = await env.DB.prepare(
    "SELECT " + ROUTINE_COLUMNS + " FROM routines WHERE dog_id = ? AND archived_at IS NULL ORDER BY local_time ASC"
  ).bind(dogId).all();

  return json({ routines: rows.results || [] });
}

// POST /api/routines — create a routine for a dog the caller owns.
export async function onRequestPost({ request, env }) {
  var userId = await requireUser(request, env);
  if (!userId) return json({ error: "Unauthorized" }, 401);

  var body;
  try { body = await request.json(); } catch (e) { return json({ error: "Invalid JSON" }, 400); }

  var dogId = (body.dogId || "").trim();
  var type = (body.type || "other").trim();
  var title = (body.title || "").trim();
  var localTime = (body.localTime || "").trim();
  var recurrence = (body.recurrence || "daily").trim();

  if (!dogId) return json({ error: "Missing dogId" }, 400);
  if (!title) return json({ error: "Enter a title" }, 400);
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(localTime)) return json({ error: "Invalid time" }, 400);

  var dog = await env.DB.prepare("SELECT id FROM real_dogs WHERE id = ? AND user_id = ?").bind(dogId, userId).first();
  if (!dog) return json({ error: "Not found" }, 404);

  var id = newId();
  var now = Date.now();
  await env.DB.prepare(
    "INSERT INTO routines (id, dog_id, user_id, type, title, local_time, recurrence, active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)"
  ).bind(id, dogId, userId, type, title, localTime, recurrence, now, now).run();

  var routine = await env.DB.prepare("SELECT " + ROUTINE_COLUMNS + " FROM routines WHERE id = ?").bind(id).first();
  return json({ routine: routine });
}
