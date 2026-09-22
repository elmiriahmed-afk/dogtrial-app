import { requireUser, json, newId, corsPreflight } from "../../_lib/auth.js";

export function onRequestOptions() { return corsPreflight(); }

const STATUSES = ["completed", "skipped", "postponed"];

// GET /api/activity-logs?dogId=...&date=YYYY-MM-DD — today's (or any day's)
// per-routine status for a dog.
export async function onRequestGet({ request, env }) {
  var userId = await requireUser(request, env);
  if (!userId) return json({ error: "Unauthorized" }, 401);

  var url = new URL(request.url);
  var dogId = url.searchParams.get("dogId");
  var date = url.searchParams.get("date");
  if (!dogId || !date) return json({ error: "Missing dogId or date" }, 400);

  var dog = await env.DB.prepare("SELECT id FROM real_dogs WHERE id = ? AND user_id = ?").bind(dogId, userId).first();
  if (!dog) return json({ error: "Not found" }, 404);

  var rows = await env.DB.prepare(
    "SELECT id, routine_id, status, completed_at FROM activity_logs WHERE dog_id = ? AND scheduled_local_date = ?"
  ).bind(dogId, date).all();

  return json({ logs: rows.results || [] });
}

// POST /api/activity-logs — mark a routine completed/skipped/postponed for a
// given day. Idempotent: UNIQUE(routine_id, scheduled_local_date) in the
// schema plus this upsert means a retried or double-tapped check-off updates
// the same row rather than creating a duplicate.
export async function onRequestPost({ request, env }) {
  var userId = await requireUser(request, env);
  if (!userId) return json({ error: "Unauthorized" }, 401);

  var body;
  try { body = await request.json(); } catch (e) { return json({ error: "Invalid JSON" }, 400); }

  var routineId = (body.routineId || "").trim();
  var date = (body.scheduledLocalDate || "").trim();
  var status = (body.status || "").trim();
  if (!routineId || !date) return json({ error: "Missing routineId or scheduledLocalDate" }, 400);
  if (STATUSES.indexOf(status) === -1) return json({ error: "Invalid status" }, 400);

  var routine = await env.DB.prepare("SELECT id, dog_id FROM routines WHERE id = ? AND user_id = ?").bind(routineId, userId).first();
  if (!routine) return json({ error: "Not found" }, 404);

  var id = newId();
  var now = Date.now();
  var completedAt = status === "completed" ? now : null;

  await env.DB.prepare(
    "INSERT INTO activity_logs (id, routine_id, dog_id, user_id, scheduled_local_date, status, completed_at, created_at, updated_at) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) " +
    "ON CONFLICT(routine_id, scheduled_local_date) DO UPDATE SET status = excluded.status, completed_at = excluded.completed_at, updated_at = excluded.updated_at"
  ).bind(id, routineId, routine.dog_id, userId, date, status, completedAt, now, now).run();

  var log = await env.DB.prepare(
    "SELECT id, routine_id, status, completed_at FROM activity_logs WHERE routine_id = ? AND scheduled_local_date = ?"
  ).bind(routineId, date).first();

  return json({ log: log });
}

// DELETE /api/activity-logs?routineId=...&date=YYYY-MM-DD — clear a day's
// status so the routine goes back to "to do" (correcting a mis-tap).
export async function onRequestDelete({ request, env }) {
  var userId = await requireUser(request, env);
  if (!userId) return json({ error: "Unauthorized" }, 401);

  var url = new URL(request.url);
  var routineId = url.searchParams.get("routineId");
  var date = url.searchParams.get("date");
  if (!routineId || !date) return json({ error: "Missing routineId or date" }, 400);

  var routine = await env.DB.prepare("SELECT id FROM routines WHERE id = ? AND user_id = ?").bind(routineId, userId).first();
  if (!routine) return json({ error: "Not found" }, 404);

  await env.DB.prepare(
    "DELETE FROM activity_logs WHERE routine_id = ? AND scheduled_local_date = ?"
  ).bind(routineId, date).run();

  return json({ ok: true });
}
