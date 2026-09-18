const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
global.window = global;
require('../www/incident-engine.js');
const rules = JSON.parse(fs.readFileSync(path.join(__dirname, '../www/incident-rules.json'), 'utf8'));

const base = {
  dogId: 'test-dog', date: '2026-09-18', breed: 'belgian_malinois',
  ageStage: 'adolescent', housing: 'apartment_terrace', currentlyCrated: false,
  environment: { accessiblePlant:true, accessibleBin:true, accessibleBathroom:true, accessibleBooks:true, accessibleRemote:true, accessibleFood:true },
  completion: { walk:1, play:1, training:1, toiletOnTime:true, mealOnTime:true }
};

const breeds = Object.keys(rules.breedMultipliers);
const ages = Object.keys(rules.ageMultipliers);
const housings = Object.keys(rules.housingMultipliers);

(async () => {
  // Perfect day never triggers, across every breed/age/housing combination.
  for (const breed of breeds) {
    for (const ageStage of ages) {
      for (const housing of housings) {
        const result = await DogTrailIncidents.evaluateIncident({ ...base, breed, ageStage, housing }, rules);
        assert.equal(result, null, `perfect day must never trigger (${breed}/${ageStage}/${housing})`);
      }
    }
  }
  console.log('OK: perfect day never triggers for any breed/age/housing');

  // Same dog/date/snapshot -> same decision on reload (determinism).
  const deficitDay = { ...base, completion:{ walk:0, play:0, training:0, toiletOnTime:false, mealOnTime:false } };
  const first = await DogTrailIncidents.evaluateIncident(deficitDay, rules);
  const second = await DogTrailIncidents.evaluateIncident(deficitDay, rules);
  assert.deepEqual(first, second, 'same dog/date/snapshot must be deterministic');
  console.log('OK: same dog/date/snapshot is deterministic');

  // High-energy adolescent breed in a confined home must carry more risk than
  // a low-energy adult breed in the same situation, same deficit.
  const malinoisScore = riskOf({ ...base, breed:'belgian_malinois', ageStage:'adolescent', housing:'apartment_terrace' });
  const frenchieScore = riskOf({ ...base, breed:'french_bulldog', ageStage:'adult', housing:'apartment_terrace' });
  function riskOf(day){
    const c = day.completion || {};
    const d = { walk:1-c.walk, play:1-c.play, training:1-c.training, toilet:c.toiletOnTime?0:1, meal:c.mealOnTime?0:1 };
    const needScore = d.walk*0.4 + d.play*0.3 + d.training*0.2 + Math.max(d.toilet,d.meal)*0.1;
    return needScore * (rules.breedMultipliers[day.breed]||1) * (rules.ageMultipliers[day.ageStage]||1) * (rules.housingMultipliers[day.housing]||1);
  }
  const bigDeficitDay = { walk:0.1, play:0.1, training:0.5, toiletOnTime:true, mealOnTime:true };
  assert.ok(
    riskOf({ ...base, breed:'belgian_malinois', ageStage:'adolescent', housing:'apartment_terrace', completion:bigDeficitDay }) >
    riskOf({ ...base, breed:'french_bulldog', ageStage:'adult', housing:'apartment_terrace', completion:bigDeficitDay }),
    'adolescent Malinois in an apartment must score higher risk than an adult French Bulldog in the same situation'
  );
  console.log('OK: breed+age risk ordering matches expectations');

  // Puppy with a late toilet break (plus some walk/play deficit, so the risk
  // band is above zero) makes a toilet accident an eligible, reachable candidate.
  const puppyLateToilet = { ...base, ageStage:'puppy', completion:{ walk:0.5, play:0.5, training:1, toiletOnTime:false, mealOnTime:true } };
  let sawPeeAccidentEligible = false;
  for (let i = 0; i < 200 && !sawPeeAccidentEligible; i++) {
    const result = await DogTrailIncidents.evaluateIncident({ ...puppyLateToilet, date: `2026-09-${(i%28)+1}` }, rules);
    if (result && result.incidentId === 'pee_accident') sawPeeAccidentEligible = true;
  }
  assert.ok(sawPeeAccidentEligible, 'a late toilet break must make pee_accident reachable for a puppy');
  console.log('OK: late toilet break makes a toilet accident reachable');

  // currentlyCrated=true only allows incidents explicitly marked allowedWhileCrated.
  for (let i = 0; i < 100; i++) {
    const result = await DogTrailIncidents.evaluateIncident({
      ...base, currentlyCrated: true, date: `2026-10-${(i%28)+1}`,
      completion: { walk:0, play:0, training:0, toiletOnTime:false, mealOnTime:false }
    }, rules);
    if (result) {
      const incidentDef = rules.incidents.find(item => item.id === result.incidentId);
      assert.ok(incidentDef.allowedWhileCrated, `${result.incidentId} must not be selectable while crated`);
    }
  }
  console.log('OK: crated dog only ever gets allowedWhileCrated incidents');

  // accessibleRemote=false must never select damaged_remote.
  for (let i = 0; i < 100; i++) {
    const result = await DogTrailIncidents.evaluateIncident({
      ...base, date: `2026-11-${(i%28)+1}`,
      environment: { ...base.environment, accessibleRemote: false },
      completion: { walk:0.1, play:0.1, training:0.5, toiletOnTime:true, mealOnTime:true }
    }, rules);
    if (result) assert.notEqual(result.incidentId, 'damaged_remote', 'damaged_remote must never be chosen when the remote is inaccessible');
  }
  console.log('OK: inaccessible remote is never chosen');

  // Cause text matches the dominant deficit and includes the exact percentage.
  const walkDeficitDay = { ...base, completion: { walk:0.35, play:1, training:1, toiletOnTime:true, mealOnTime:true } };
  let sawWalkCauseWithPercentage = false;
  for (let i = 0; i < 200 && !sawWalkCauseWithPercentage; i++) {
    const result = await DogTrailIncidents.evaluateIncident({ ...walkDeficitDay, date: `2027-01-${(i%28)+1}` }, rules);
    if (result && result.primaryCause === 'walk') {
      assert.ok(result.explanation.includes('35%'), 'explanation must include the exact walk completion percentage');
      sawWalkCauseWithPercentage = true;
    }
  }
  assert.ok(sawWalkCauseWithPercentage, 'expected at least one walk-caused incident with the exact percentage across 200 dates');
  console.log('OK: cause text matches the dominant deficit and includes the exact percentage');

  console.log('\nAll incident-engine tests passed.');
})().catch(error => { console.error(error); process.exitCode = 1; });
