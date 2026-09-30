// Care-reminder content catalog and policy, imported from the
// "DogTrial-notifications-Claude" conception pack (2026-09-30) and
// reconciled against this app's real breed IDs (see BREEDS in
// index.html) — the pack's own snapshot used stale ids (labrador,
// french, border, cane, german) recovered from an older deliverable.
// Templates are editorial examples selected for matching routines, not
// scheduled alerts; only NOTIFICATION_DECIDE (index.html) turns a
// template + due occurrence into an actual local notification.
// Not veterinary guidance — see policy.status below.
var NOTIFICATION_POLICY = {
  "version": 1,
  "status": "proposed_product_defaults_not_veterinary_recommendations",
  "life_stage_resolution": "existing app stage first; configurable owner/clinician correction; no automatic change during a 30-day trial",
  "fallback_age_bands_months": {
    "puppy": [
      2,
      6
    ],
    "adolescent": [
      6,
      24
    ],
    "adult": [
      24,
      null
    ]
  },
  "age_band_semantics": "half-open; product approximation only, never biological diagnosis; under 2 months unsupported by fallback; senior dogs require an adapted adult plan",
  "quiet_hours": {
    "start": "22:00",
    "end": "08:00",
    "timezone": "user IANA timezone",
    "same_start_end": "disabled"
  },
  "push_limits": {
    "gentle": {
      "puppy": 4,
      "adolescent": 3,
      "adult": 2
    },
    "balanced": {
      "puppy": 6,
      "adolescent": 4,
      "adult": 3
    },
    "more_frequent": {
      "puppy": 8,
      "adolescent": 5,
      "adult": 4
    }
  },
  "default_frequency": "gentle",
  "max_pushes_per_user_local_day": 8,
  "minimum_minutes_between_pushes": 60,
  "snooze_minutes": 15,
  "repeated_unanswered_escalation": false,
  "marketing_pushes": false,
  "bark_sound_default": false,
  "critical_alerts": false,
  "care_need_vs_push": "Simulation needs can occur more often than push cap. Keep remaining tasks visible in app; do not equate the push quota with animal care requirements.",
  "quiet_hours_simulation": "Do not create blame/punishment solely because pushes were silenced. Use existing pause rules; summarize actual overnight events on return.",
  "unresolved_expired": "Record in history, do not replay stale messages. Re-evaluate current state once."
};

var NOTIFICATION_CATALOG = [
  {
    "id": "labrador.puppy.breed_focus",
    "breed_id": "lab",
    "stage": "puppy",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_labrador",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Reward a calm greeting.",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "labrador.puppy.walk",
    "breed_id": "lab",
    "stage": "puppy",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_labrador",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 90,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "labrador.puppy.meal",
    "breed_id": "lab",
    "stage": "puppy",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_labrador",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "labrador.adolescent.breed_focus",
    "breed_id": "lab",
    "stage": "adolescent",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_labrador",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Try a gentle retrieve game.",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "labrador.adolescent.walk",
    "breed_id": "lab",
    "stage": "adolescent",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_labrador",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "labrador.adolescent.meal",
    "breed_id": "lab",
    "stage": "adolescent",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_labrador",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "labrador.adult.breed_focus",
    "breed_id": "lab",
    "stage": "adult",
    "title": "{dogName} · A moment together",
    "category": "care",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_labrador",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_routine",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Time for my planned weight check-in.",
      "after_adoption": "Your planned care activity reminder is ready."
    }
  },
  {
    "id": "labrador.adult.walk",
    "breed_id": "lab",
    "stage": "adult",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_labrador",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "labrador.adult.meal",
    "breed_id": "lab",
    "stage": "adult",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_labrador",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "husky.puppy.breed_focus",
    "breed_id": "husky",
    "stage": "puppy",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_husky",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Let’s practise coming back to you.",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "husky.puppy.walk",
    "breed_id": "husky",
    "stage": "puppy",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_husky",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 90,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "husky.puppy.meal",
    "breed_id": "husky",
    "stage": "puppy",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_husky",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "husky.adolescent.breed_focus",
    "breed_id": "husky",
    "stage": "adolescent",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_husky",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "A secure sniff adventure together?",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "husky.adolescent.walk",
    "breed_id": "husky",
    "stage": "adolescent",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_husky",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "husky.adolescent.meal",
    "breed_id": "husky",
    "stage": "adolescent",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_husky",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "husky.adult.breed_focus",
    "breed_id": "husky",
    "stage": "adult",
    "title": "{dogName} · A moment together",
    "category": "care",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_husky",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_routine",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My coat-care routine is waiting.",
      "after_adoption": "Your planned care activity reminder is ready."
    }
  },
  {
    "id": "husky.adult.walk",
    "breed_id": "husky",
    "stage": "adult",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_husky",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "husky.adult.meal",
    "breed_id": "husky",
    "stage": "adult",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_husky",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "french.puppy.breed_focus",
    "breed_id": "frenchie",
    "stage": "puppy",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_french",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "A calm little exploration together?",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "french.puppy.walk",
    "breed_id": "frenchie",
    "stage": "puppy",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_french",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 90,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "french.puppy.meal",
    "breed_id": "frenchie",
    "stage": "puppy",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_french",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "french.adolescent.breed_focus",
    "breed_id": "frenchie",
    "stage": "adolescent",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_french",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Let’s choose a comfortable, easy activity.",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "french.adolescent.walk",
    "breed_id": "frenchie",
    "stage": "adolescent",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_french",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "french.adolescent.meal",
    "breed_id": "frenchie",
    "stage": "adolescent",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_french",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "french.adult.breed_focus",
    "breed_id": "frenchie",
    "stage": "adult",
    "title": "{dogName} · A moment together",
    "category": "care",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_french",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_routine",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Time for my planned skin-care routine.",
      "after_adoption": "Your planned care activity reminder is ready."
    }
  },
  {
    "id": "french.adult.walk",
    "breed_id": "frenchie",
    "stage": "adult",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_french",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "french.adult.meal",
    "breed_id": "frenchie",
    "stage": "adult",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_french",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "border.puppy.breed_focus",
    "breed_id": "collie",
    "stage": "puppy",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_border",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "A tiny learning moment together?",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "border.puppy.walk",
    "breed_id": "collie",
    "stage": "puppy",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_border",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 90,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "border.puppy.meal",
    "breed_id": "collie",
    "stage": "puppy",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_border",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "border.adolescent.breed_focus",
    "breed_id": "collie",
    "stage": "adolescent",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_border",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Ready for a little search game?",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "border.adolescent.walk",
    "breed_id": "collie",
    "stage": "adolescent",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_border",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "border.adolescent.meal",
    "breed_id": "collie",
    "stage": "adolescent",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_border",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "border.adult.breed_focus",
    "breed_id": "collie",
    "stage": "adult",
    "title": "{dogName} · A moment together",
    "category": "care",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_border",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_routine",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My brushing routine is ready.",
      "after_adoption": "Your planned care activity reminder is ready."
    }
  },
  {
    "id": "border.adult.walk",
    "breed_id": "collie",
    "stage": "adult",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_border",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "border.adult.meal",
    "breed_id": "collie",
    "stage": "adult",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_border",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "chihuahua.puppy.breed_focus",
    "breed_id": "chihuahua",
    "stage": "puppy",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_chihuahua",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "A gentle handling practice together?",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "chihuahua.puppy.walk",
    "breed_id": "chihuahua",
    "stage": "puppy",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_chihuahua",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 90,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "chihuahua.puppy.meal",
    "breed_id": "chihuahua",
    "stage": "puppy",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_chihuahua",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "chihuahua.adolescent.breed_focus",
    "breed_id": "chihuahua",
    "stage": "adolescent",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_chihuahua",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "A small puzzle, a big adventure?",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "chihuahua.adolescent.walk",
    "breed_id": "chihuahua",
    "stage": "adolescent",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_chihuahua",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "chihuahua.adolescent.meal",
    "breed_id": "chihuahua",
    "stage": "adolescent",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_chihuahua",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "chihuahua.adult.breed_focus",
    "breed_id": "chihuahua",
    "stage": "adult",
    "title": "{dogName} · A moment together",
    "category": "care",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_chihuahua",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_routine",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Time for my planned tooth-care routine.",
      "after_adoption": "Your planned care activity reminder is ready."
    }
  },
  {
    "id": "chihuahua.adult.walk",
    "breed_id": "chihuahua",
    "stage": "adult",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_chihuahua",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "chihuahua.adult.meal",
    "breed_id": "chihuahua",
    "stage": "adult",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_chihuahua",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "amstaff.puppy.breed_focus",
    "breed_id": "amstaff",
    "stage": "puppy",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_amstaff",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Let’s practise a calm hello.",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "amstaff.puppy.walk",
    "breed_id": "amstaff",
    "stage": "puppy",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_amstaff",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 90,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "amstaff.puppy.meal",
    "breed_id": "amstaff",
    "stage": "puppy",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_amstaff",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "amstaff.adolescent.breed_focus",
    "breed_id": "amstaff",
    "stage": "adolescent",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_amstaff",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "A little lead-walking practice?",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "amstaff.adolescent.walk",
    "breed_id": "amstaff",
    "stage": "adolescent",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_amstaff",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "amstaff.adolescent.meal",
    "breed_id": "amstaff",
    "stage": "adolescent",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_amstaff",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "amstaff.adult.breed_focus",
    "breed_id": "amstaff",
    "stage": "adult",
    "title": "{dogName} · A moment together",
    "category": "care",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_amstaff",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_routine",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My coat-care check-in is ready.",
      "after_adoption": "Your planned care activity reminder is ready."
    }
  },
  {
    "id": "amstaff.adult.walk",
    "breed_id": "amstaff",
    "stage": "adult",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_amstaff",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "amstaff.adult.meal",
    "breed_id": "amstaff",
    "stage": "adult",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_amstaff",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "cane.puppy.breed_focus",
    "breed_id": "canecorso",
    "stage": "puppy",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_cane",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "A calm new experience together?",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "cane.puppy.walk",
    "breed_id": "canecorso",
    "stage": "puppy",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_cane",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 90,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "cane.puppy.meal",
    "breed_id": "canecorso",
    "stage": "puppy",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_cane",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "cane.adolescent.breed_focus",
    "breed_id": "canecorso",
    "stage": "adolescent",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_cane",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Let’s practise walking together calmly.",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "cane.adolescent.walk",
    "breed_id": "canecorso",
    "stage": "adolescent",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_cane",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "cane.adolescent.meal",
    "breed_id": "canecorso",
    "stage": "adolescent",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_cane",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "cane.adult.breed_focus",
    "breed_id": "canecorso",
    "stage": "adult",
    "title": "{dogName} · A moment together",
    "category": "care",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_cane",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_routine",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Time to review my planned care routine.",
      "after_adoption": "Your planned care activity reminder is ready."
    }
  },
  {
    "id": "cane.adult.walk",
    "breed_id": "canecorso",
    "stage": "adult",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_cane",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "cane.adult.meal",
    "breed_id": "canecorso",
    "stage": "adult",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_cane",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "malinois.puppy.breed_focus",
    "breed_id": "malinois",
    "stage": "puppy",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_malinois",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "A short focus game together?",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "malinois.puppy.walk",
    "breed_id": "malinois",
    "stage": "puppy",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_malinois",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 90,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "malinois.puppy.meal",
    "breed_id": "malinois",
    "stage": "puppy",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_malinois",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "malinois.adolescent.breed_focus",
    "breed_id": "malinois",
    "stage": "adolescent",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_malinois",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Ready for our next search game?",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "malinois.adolescent.walk",
    "breed_id": "malinois",
    "stage": "adolescent",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_malinois",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "malinois.adolescent.meal",
    "breed_id": "malinois",
    "stage": "adolescent",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_malinois",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "malinois.adult.breed_focus",
    "breed_id": "malinois",
    "stage": "adult",
    "title": "{dogName} · A moment together",
    "category": "care",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_malinois",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_routine",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Let’s check in on my activity routine.",
      "after_adoption": "Your planned care activity reminder is ready."
    }
  },
  {
    "id": "malinois.adult.walk",
    "breed_id": "malinois",
    "stage": "adult",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_malinois",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "malinois.adult.meal",
    "breed_id": "malinois",
    "stage": "adult",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_malinois",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "german.puppy.breed_focus",
    "breed_id": "gsd",
    "stage": "puppy",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_german",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Let’s practise looking back at you.",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "german.puppy.walk",
    "breed_id": "gsd",
    "stage": "puppy",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_german",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 90,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "german.puppy.meal",
    "breed_id": "gsd",
    "stage": "puppy",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_german",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "german.adolescent.breed_focus",
    "breed_id": "gsd",
    "stage": "adolescent",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_german",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "A little recall practice together?",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "german.adolescent.walk",
    "breed_id": "gsd",
    "stage": "adolescent",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_german",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "german.adolescent.meal",
    "breed_id": "gsd",
    "stage": "adolescent",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_german",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "german.adult.breed_focus",
    "breed_id": "gsd",
    "stage": "adult",
    "title": "{dogName} · A moment together",
    "category": "care",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_german",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_routine",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My brushing routine is waiting.",
      "after_adoption": "Your planned care activity reminder is ready."
    }
  },
  {
    "id": "german.adult.walk",
    "breed_id": "gsd",
    "stage": "adult",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_german",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "german.adult.meal",
    "breed_id": "gsd",
    "stage": "adult",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_german",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "bichon.puppy.breed_focus",
    "breed_id": "bichon",
    "stage": "puppy",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_bichon",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Let’s get comfortable with my brush.",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "bichon.puppy.walk",
    "breed_id": "bichon",
    "stage": "puppy",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_bichon",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 90,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "bichon.puppy.meal",
    "breed_id": "bichon",
    "stage": "puppy",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_bichon",
      "puppy_activity"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "bichon.adolescent.breed_focus",
    "breed_id": "bichon",
    "stage": "adolescent",
    "title": "{dogName} · A moment together",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_bichon",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_training",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "A playful little learning break?",
      "after_adoption": "Your planned activity reminder is ready."
    }
  },
  {
    "id": "bichon.adolescent.walk",
    "breed_id": "bichon",
    "stage": "adolescent",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_bichon",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "bichon.adolescent.meal",
    "breed_id": "bichon",
    "stage": "adolescent",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_bichon",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "bichon.adult.breed_focus",
    "breed_id": "bichon",
    "stage": "adult",
    "title": "{dogName} · A moment together",
    "category": "care",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_bichon",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_routine",
    "ttl_minutes": 180,
    "priority": 50,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My coat-care appointment is waiting.",
      "after_adoption": "Your planned care activity reminder is ready."
    }
  },
  {
    "id": "bichon.adult.walk",
    "breed_id": "bichon",
    "stage": "adult",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_bichon",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_walk",
    "ttl_minutes": 60,
    "priority": 50,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned outdoor break is ready.",
      "after_adoption": "Your planned outdoor break reminder is ready."
    }
  },
  {
    "id": "bichon.adult.meal",
    "breed_id": "bichon",
    "stage": "adult",
    "title": "{dogName} · Mealtime",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "matching_stage",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "breed_bichon",
      "life_checklist"
    ],
    "source_relation": "Editorial example inspired by guidance; wording, schedule and notification frequency are product choices.",
    "action": "open_meal",
    "ttl_minutes": 60,
    "priority": 80,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "My scheduled meal is ready.",
      "after_adoption": "Your planned meal reminder is ready."
    }
  },
  {
    "id": "puppy.wake_potty",
    "breed_id": "all",
    "stage": "puppy",
    "title": "{dogName} · Potty break",
    "category": "daily",
    "trigger": "wake_recorded",
    "requires": [
      "active_dog_context",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "toilet"
    ],
    "source_relation": "Original product copy; trigger design is not a medical conclusion.",
    "action": "open_walk",
    "ttl_minutes": 30,
    "priority": 90,
    "sound_eligible": true,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "I’m awake. A little potty break?",
      "after_adoption": "Your planned routine reminder is ready."
    }
  },
  {
    "id": "puppy.after_meal",
    "breed_id": "all",
    "stage": "puppy",
    "title": "{dogName} · Potty break",
    "category": "daily",
    "trigger": "meal_completed",
    "requires": [
      "active_dog_context",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "toilet"
    ],
    "source_relation": "Original product copy; trigger design is not a medical conclusion.",
    "action": "open_walk",
    "ttl_minutes": 30,
    "priority": 90,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Meal finished. Ready for a potty break?",
      "after_adoption": "Your planned routine reminder is ready."
    }
  },
  {
    "id": "puppy.after_play",
    "breed_id": "all",
    "stage": "puppy",
    "title": "{dogName} · Potty break",
    "category": "daily",
    "trigger": "play_completed",
    "requires": [
      "active_dog_context",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "toilet"
    ],
    "source_relation": "Original product copy; trigger design is not a medical conclusion.",
    "action": "open_walk",
    "ttl_minutes": 30,
    "priority": 90,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "After play, a little outdoor break?",
      "after_adoption": "Your planned routine reminder is ready."
    }
  },
  {
    "id": "puppy.rest",
    "breed_id": "all",
    "stage": "puppy",
    "title": "{dogName} · Quiet moment",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "puppy_activity"
    ],
    "source_relation": "Original product copy; trigger design is not a medical conclusion.",
    "action": "open_rest",
    "ttl_minutes": 180,
    "priority": 30,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Let’s enjoy a quiet little break.",
      "after_adoption": "Your planned routine reminder is ready."
    }
  },
  {
    "id": "adolescent.settle",
    "breed_id": "all",
    "stage": "adolescent",
    "title": "{dogName} · Quiet moment",
    "category": "activity",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "training"
    ],
    "source_relation": "Original product copy; trigger design is not a medical conclusion.",
    "action": "open_rest",
    "ttl_minutes": 180,
    "priority": 30,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Time to settle after our activity.",
      "after_adoption": "Your planned routine reminder is ready."
    }
  },
  {
    "id": "adult.appointment",
    "breed_id": "all",
    "stage": "adult",
    "title": "{dogName} · Care appointment",
    "category": "care",
    "trigger": "appointment_due",
    "requires": [
      "active_dog_context",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "life_checklist"
    ],
    "source_relation": "Original product copy; trigger design is not a medical conclusion.",
    "action": "open_appointment",
    "ttl_minutes": 180,
    "priority": 90,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our saved care appointment is coming up.",
      "after_adoption": "Your planned routine reminder is ready."
    }
  },
  {
    "id": "all.accident",
    "breed_id": "all",
    "stage": "all",
    "title": "{dogName} · Virtual dog update",
    "category": "daily",
    "trigger": "simulation_accident_confirmed",
    "requires": [
      "active_dog_context",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "toilet"
    ],
    "source_relation": "Original product copy; trigger design is not a medical conclusion.",
    "action": "open_cleanup",
    "ttl_minutes": 180,
    "priority": 70,
    "sound_eligible": false,
    "supported_modes": [
      "simulation"
    ],
    "body_by_mode": {
      "simulation": "Oops, a little accident. Can you help me?"
    }
  },
  {
    "id": "all.missed_walk",
    "breed_id": "all",
    "stage": "all",
    "title": "{dogName} · Outdoor break",
    "category": "daily",
    "trigger": "routine_due",
    "requires": [
      "active_dog_context",
      "unresolved_occurrence",
      "category_enabled"
    ],
    "source_ids": [
      "life_checklist"
    ],
    "source_relation": "Original product copy; trigger design is not a medical conclusion.",
    "action": "open_walk",
    "ttl_minutes": 180,
    "priority": 60,
    "sound_eligible": false,
    "supported_modes": [
      "simulation",
      "after_adoption"
    ],
    "body_by_mode": {
      "simulation": "Our planned walk is still waiting.",
      "after_adoption": "Your planned routine reminder is ready."
    }
  }
];
