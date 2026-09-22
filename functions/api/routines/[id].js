import { requireUser, json, corsPreflight } from "../../_lib/auth.js";

export function onRequestOptions() { return corsPreflight(); }

const ROUTINE_COLUMNS = "id, dog_id, type, title, local_time, recurrence, active, created_at";

// PATCH /api/routines/:id — edit or toggle a routine the caller owns.
// A routine's own user_id (set once at creation) is the ownership check, so
// this never needs a join through real_dogs.
export async function onRequestPatch({ request, env, params }) {
  var userId = await requireUser(request, env);
  if (!userId) return json({ error: "Unauthorized" }, 401);

  var body;
  try { body = await request.json(); } catch (e) { return json({ error: "Invalid JSON" }, 400); }

  var routine = await env.DB.prepare("SELECT id FROM routines WHERE id = ? AND user_id = ?").bind(params.id, userId).first();
  if (!routine) return json({ error: "Not found" }, 404);

  var fields = [];
  var values = [];
  if (typeof body.active === "boolean") { fields.push("active = ?"); values.push(body.active ? 1 : 0); }
  if (typeof body.title === "string" && body.title.trim()) { fields.push("title = ?"); values.push(body.title.trim()); }
  if (typeof body.localTime === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(body.localTime)) { fields.push("local_time = ?"); values.push(body.localTime); }
  if (typeof body.recurrence === "string" && body.recurrence.trim()) { fields.push("recurrence = ?"); values.push(body.recurrence.trim()); }
  if (!fields.length) return json({ error: "Nothing to update" }, 400);
  fields.push("updated_at = ?"); values.push(Date.now());
  values.push(params.id);

  var stmt = env.DB.prepare("UPDATE routines SET " + fields.join(", ") + " WHERE id = ?");
  await stmt.bind.apply(stmt, values).run();

  var updated = await env.DB.prepare("SELECT " + ROUTINE_COLUMNS + " FROM routines WHERE id = ?").bind(params.id).first();
  return json({ routine: updated });
}
