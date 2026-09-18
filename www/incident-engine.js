// Deterministic, dependency-free incident engine. Same dog + same local date +
// same completion snapshot always yields the same result (or lack of one) —
// no re-roll on reload. See incident-rules.json for the tunable config this
// reads (age/breed/housing multipliers, risk thresholds, incident catalog).
(function (global) {
  "use strict";

  const clamp01 = value => Math.max(0, Math.min(1, Number(value) || 0));

  function hash01(input) {
    let h = 2166136261;
    for (let i = 0; i < input.length; i += 1) {
      h ^= input.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0) / 4294967296;
  }

  function deficits(day) {
    const c = day.completion || {};
    return {
      walk: 1 - clamp01(c.walk),
      play: 1 - clamp01(c.play),
      training: 1 - clamp01(c.training),
      toilet: c.toiletOnTime === true ? 0 : 1,
      meal: c.mealOnTime === true ? 0 : 1
    };
  }

  function strongestCause(d, incident) {
    return Object.entries(incident.causes)
      .map(([cause, weight]) => [cause, d[cause] * weight])
      .sort((a, b) => b[1] - a[1])[0][0];
  }

  function causeCopy(cause, d) {
    const labels = {
      walk: ["an incomplete walk", `The walk only reached ${Math.round((1 - d.walk) * 100)}% of today's goal.`],
      play: ["not enough play", `Play only reached ${Math.round((1 - d.play) * 100)}% of today's goal.`],
      training: ["incomplete training", `Training only reached ${Math.round((1 - d.training) * 100)}% of today's goal.`],
      toilet: ["a late toilet break", "The scheduled toilet break wasn't taken on time."],
      meal: ["a late meal", "The scheduled meal wasn't given on time."]
    };
    return labels[cause];
  }

  function compatible(item, day, d) {
    if (!item.ages.includes(day.ageStage) || !item.housing.includes(day.housing)) return false;
    if (day.currentlyCrated && !item.allowedWhileCrated) return false;
    if (day.currentlyCrated && item.id === "pee_accident" && d.toilet === 0) return false;
    if (item.requirement && !(day.environment || {})[item.requirement]) return false;
    return true;
  }

  function weightedIncident(items, d, seed) {
    const weighted = items.map(item => ({
      item,
      weight: Object.entries(item.causes).reduce((sum, [cause, weight]) => sum + d[cause] * weight, 0)
    })).filter(entry => entry.weight > 0);
    const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
    if (!total) return null;
    let cursor = hash01(`${seed}:type`) * total;
    for (const entry of weighted) {
      cursor -= entry.weight;
      if (cursor <= 0) return entry.item;
    }
    return weighted[weighted.length - 1].item;
  }

  async function evaluateIncident(day, rulesUrl = "incident-rules.json") {
    const rules = typeof rulesUrl === "string"
      ? await fetch(rulesUrl).then(response => {
          if (!response.ok) throw new Error(`Incident rules unavailable: ${response.status}`);
          return response.json();
        })
      : rulesUrl;
    const d = deficits(day);
    if (Object.values(d).every(value => value === 0)) return null;

    const needScore = d.walk * 0.4 + d.play * 0.3 + d.training * 0.2 + Math.max(d.toilet, d.meal) * 0.1;
    const breed = rules.breedMultipliers[day.breed] || 1;
    const age = rules.ageMultipliers[day.ageStage] || 1;
    const housing = rules.housingMultipliers[day.housing] || 1;
    const riskScore = clamp01(needScore * breed * age * housing);
    const band = rules.thresholds.find(entry => riskScore >= entry.minimumScore);
    const probability = band ? band.probability : 0;
    const seed = `${day.dogId}:${day.date}`;
    if (hash01(`${seed}:trigger`) >= probability) return null;

    const candidates = rules.incidents.filter(item => compatible(item, day, d));
    const incident = weightedIncident(candidates, d, seed);
    if (!incident) return null;
    const primaryCause = strongestCause(d, incident);
    const [causeLabel, causeDetail] = causeCopy(primaryCause, d);
    return {
      incidentId: incident.id,
      title: incident.title,
      asset: `${rules.assetsBasePath}${incident.asset}`,
      riskScore: Number(riskScore.toFixed(3)),
      probability,
      primaryCause,
      summary: `An incident happened at home — probably linked to ${causeLabel}.`,
      explanation: `${causeDetail} Breed, age, and housing adjusted the risk level; this is a probability, never a certainty.`
    };
  }

  global.DogTrailIncidents = { evaluateIncident, hash01 };
})(typeof window !== "undefined" ? window : global);
