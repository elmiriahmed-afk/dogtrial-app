const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
global.window = global;
require('../www/absence-consequence-engine.js');
const engine = global.DogTrailAbsenceConsequences;
const rules = JSON.parse(fs.readFileSync(path.join(__dirname, '../www/incident-rules.json'), 'utf8'));

const baseSnapshot = {
  ageStage: 'adolescent', housingKey: 'apartment_terrace', currentlyCrated: false,
  toiletOnTime: true, mealOnTime: true,
  completion: { walk: 1, play: 1, training: 1 },
  environment: { accessiblePlant: true, accessibleBin: true, accessibleBathroom: true, accessibleBooks: true, accessibleRemote: true, accessibleFood: true }
};

// All needs met -> never an incident, regardless of how long the absence ran.
assert.equal(engine.evaluate(baseSnapshot, 600, rules), null, 'all needs met must never produce an incident');

// Deterministic: same snapshot + duration always yields the same result.
const deficitSnapshot = { ...baseSnapshot, toiletOnTime: false, completion: { walk: 0.2, play: 0.2, training: 1 } };
const first = engine.evaluate(deficitSnapshot, 90, rules);
const second = engine.evaluate(deficitSnapshot, 90, rules);
assert.deepEqual(first, second, 'same snapshot + duration must be deterministic');
console.log('OK: all-needs-met never fires, and results are deterministic');

// Toilet miss alone: needs the break to actually be missed AND a plausible
// minimum absence length (45 min) — not just "some" deficit.
const toiletMissShort = { ...baseSnapshot, toiletOnTime: false };
assert.equal(engine.evaluate(toiletMissShort, 30, rules), null, 'a toilet miss under 45 minutes must not fire');
const toiletMissLong = engine.evaluate(toiletMissShort, 45, rules);
assert.ok(toiletMissLong && toiletMissLong.primaryCause === 'toilet', 'a toilet miss over 45 minutes must produce a toilet-caused incident');
console.log('OK: toilet accident respects the 45-minute minimum absence');

// Destruction needs a longer absence (60 min) even with a real deficit.
const walkDeficit = { ...baseSnapshot, completion: { walk: 0.05, play: 0.05, training: 1 } };
assert.equal(engine.evaluate(walkDeficit, 59, rules), null, 'destruction under 60 minutes must not fire');
const destructionResult = engine.evaluate(walkDeficit, 90, rules);
assert.ok(destructionResult, 'a real walk/play deficit over 60 minutes should be eligible for destruction');
console.log('OK: destruction respects the 60-minute minimum absence');

// Crated dog: only incidents explicitly marked allowedWhileCrated are candidates
// (in practice, only the toilet accident) — never a destroyed object.
const cratedDeficit = { ...baseSnapshot, currentlyCrated: true, completion: { walk: 0.05, play: 0.05, training: 0.05 } };
const cratedResult = engine.evaluate(cratedDeficit, 120, rules);
assert.equal(cratedResult, null, 'a crated dog with no toilet miss must not get a destruction incident');

// Object inaccessible: that specific incident must never be chosen even with
// a matching deficit and enough time.
const noRemote = { ...baseSnapshot, completion: { walk: 0.05, play: 0.05, training: 1 }, environment: { ...baseSnapshot.environment, accessibleRemote: false } };
for (let i = 0; i < 5; i++) {
  const r = engine.evaluate(noRemote, 90, rules);
  if (r) assert.notEqual(r.incidentId, 'damaged_remote', 'damaged_remote must never be chosen when the remote is inaccessible');
}
console.log('OK: crate gating and inaccessible-object exclusion both hold');

console.log('\nAll absence-consequence-engine tests passed.');
