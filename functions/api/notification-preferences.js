import { requireUser, json, newId, corsPreflight } from "../_lib/auth.js";

export function onRequestOptions() { return corsPreflight(); }

var PREF_COLUMNS = "enabled, categories_json, quiet_start, quiet_end, frequency, bark, time_zone";

// GET /api/notification-preferences — the caller's own reminder preferences
// (defaults if they've never saved any), for the after-adoption Preferences
// screen. One row per user; multiple dogs share it (see schema.sql comment).
export async function onRequestGet({ request, env }) {
  var userId = await requireUser(request, env);
  if (!userId) return json({ error: "Unauthorized" }, 401);

  var row = await env.DB.prepare(
    "SELECT " + PREF_COLUMNS + " FROM notification_preferences WHERE user_id = ?"
  ).bind(userId).first();

  if (!row) {
    return json({ preferences: {
      enabled: false, categories: { daily: true, activity: true, care: true },
      quietStart: "22:00", quietEnd: "08:00", frequency: "gentle", bark: false, timeZone: null
    } });
  }
  return json({ preferences: {
    enabled: !!row.enabled, categories: JSON.parse(row.categories_json),
    quietStart: row.quiet_start, quietEnd: row.quiet_end, frequency: row.frequency,
    bark: !!row.bark, timeZone: row.time_zone
  } });
}

// POST /api/notification-preferences — upsert the caller's own preferences.
export async function onRequestPost({ request, env }) {
  var userId = await requireUser(request, env);
  if (!userId) return json({ error: "Unauthorized" }, 401);

  var body;
  try { body = await request.json(); } catch (e) { return json({ error: "Invalid JSON" }, 400); }

  var enabled = body.enabled ? 1 : 0;
  var categories = body.categories && typeof body.categories === "object" ? body.categories : { daily: true, activity: true, care: true };
  var quietStart = /^([01]\d|2[0-3]):[0-5]\d$/.test(body.quietStart) ? body.quietStart : "22:00";
  var quietEnd = /^([01]\d|2[0-3]):[0-5]\d$/.test(body.quietEnd) ? body.quietEnd : "08:00";
  var frequency = ["gentle", "balanced", "more_frequent"].indexOf(body.frequency) !== -1 ? body.frequency : "gentle";
  var bark = body.bark ? 1 : 0;
  var timeZone = typeof body.timeZone === "string" ? body.timeZone : null;
  var now = Date.now();

  var existing = await env.DB.prepare("SELECT id FROM notification_preferences WHERE user_id = ?").bind(userId).first();
  if (existing) {
    await env.DB.prepare(
      "UPDATE notification_preferences SET enabled=?, categories_json=?, quiet_start=?, quiet_end=?, frequency=?, bark=?, time_zone=?, updated_at=? WHERE user_id=?"
    ).bind(enabled, JSON.stringify(categories), quietStart, quietEnd, frequency, bark, timeZone, now, userId).run();
  } else {
    await env.DB.prepare(
      "INSERT INTO notification_preferences (id, user_id, enabled, categories_json, quiet_start, quiet_end, frequency, bark, time_zone, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(newId(), userId, enabled, JSON.stringify(categories), quietStart, quietEnd, frequency, bark, timeZone, now, now).run();
  }

  return json({ preferences: {
    enabled: !!enabled, categories: categories, quietStart: quietStart, quietEnd: quietEnd,
    frequency: frequency, bark: !!bark, timeZone: timeZone
  } });
}
