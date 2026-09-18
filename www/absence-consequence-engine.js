// Absence-gated, deterministic (no dice roll) incident evaluation. Eligibility
// depends only on an immutable departure snapshot and how long the absence
// actually ran — never on a daily probability band, and never called while
// the dog is still away. Reuses incident-rules.json's own catalog fields
// (ages, housing, allowedWhileCrated, requirement, causes) so the incident
// definitions stay single-sourced rather than duplicated with a second,
// simplified list — the snapshot/duration gating is this module's only job.
(function (global) {
  "use strict";

  function clamp01(v) { return Math.max(0, Math.min(1, Number(v) || 0)); }

  function evaluate(snapshot, durationMinutes, rules) {
    var d = {
      walk: 1 - clamp01(snapshot.completion.walk),
      play: 1 - clamp01(snapshot.completion.play),
      training: 1 - clamp01(snapshot.completion.training),
      toilet: snapshot.toiletOnTime ? 0 : 1,
      meal: snapshot.mealOnTime ? 0 : 1
    };
    if (d.walk === 0 && d.play === 0 && d.training === 0 && d.toilet === 0 && d.meal === 0) return null;

    function compatible(item) {
      if (item.ages.indexOf(snapshot.ageStage) === -1 || item.housing.indexOf(snapshot.housingKey) === -1) return false;
      if (snapshot.currentlyCrated && !item.allowedWhileCrated) return false;
      if (item.requirement && !snapshot.environment[item.requirement]) return false;
      return true;
    }
    function scoreOf(item) {
      return d.walk * (item.causes.walk || 0) + d.play * (item.causes.play || 0) + d.training * (item.causes.training || 0) +
        d.meal * (item.causes.meal || 0) + d.toilet * (item.causes.toilet || 0);
    }
    function dominantCause(item) {
      var parts = [
        ["walk", d.walk * (item.causes.walk || 0)],
        ["play", d.play * (item.causes.play || 0)],
        ["training", d.training * (item.causes.training || 0)],
        ["meal", d.meal * (item.causes.meal || 0)],
        ["toilet", d.toilet * (item.causes.toilet || 0)]
      ];
      parts.sort(function (a, b) { return b[1] - a[1]; });
      return parts[0][0];
    }

    var candidates = [];
    // A toilet accident needs the toilet break to have actually been missed
    // and a plausible minimum absence length — not just "some" deficit.
    if (d.toilet > 0 && durationMinutes >= 45) {
      candidates = candidates.concat(rules.incidents.filter(function (item) { return item.causes.toilet && compatible(item); }));
    }
    // Destruction needs the dog to have been free in the home, a longer
    // absence, and a real walk/play/training/meal shortfall — never just an
    // accessible object on its own.
    if (!snapshot.currentlyCrated && durationMinutes >= 60) {
      candidates = candidates.concat(rules.incidents.filter(function (item) { return !item.causes.toilet && compatible(item) && scoreOf(item) > 0; }));
    }
    if (!candidates.length) return null;
    candidates.sort(function (a, b) { return scoreOf(b) - scoreOf(a); });
    var incident = candidates[0];
    var cause = dominantCause(incident);
    var labels = {
      walk: ["an incomplete walk", "The walk only reached " + Math.round(clamp01(snapshot.completion.walk) * 100) + "% of the goal before you left."],
      play: ["not enough play", "Play only reached " + Math.round(clamp01(snapshot.completion.play) * 100) + "% of the goal before you left."],
      training: ["incomplete training", "Training only reached " + Math.round(clamp01(snapshot.completion.training) * 100) + "% of the goal before you left."],
      meal: ["a missed meal", "The scheduled meal wasn't given before you left."],
      toilet: ["a missed toilet break", "The toilet break wasn't taken before you left."]
    };
    var l = labels[cause];
    return {
      incidentId: incident.id,
      title: incident.title,
      asset: rules.assetsBasePath + incident.asset,
      primaryCause: cause,
      durationMinutes: Math.round(durationMinutes),
      explanation: l[1] + " Breed, age, and housing adjust the risk, but never prove the cause — this is probably associated, not certain."
    };
  }

  global.DogTrailAbsenceConsequences = { evaluate: evaluate };
})(typeof window !== "undefined" ? window : global);
