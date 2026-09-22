CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS onboarding_submissions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  breed_id TEXT,
  housing_id TEXT,
  life_id TEXT,
  sex TEXT,
  start_stage TEXT,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_onboarding_user ON onboarding_submissions(user_id);

-- Life Together: real dog profiles, distinct from the simulated trial dog
-- (whose state lives only in localStorage and never reaches this DB).
CREATE TABLE IF NOT EXISTS real_dogs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  arrival_date TEXT NOT NULL,
  birth_date TEXT,
  estimated_age TEXT,
  breed TEXT,
  photo_ref TEXT,
  time_zone TEXT NOT NULL,
  archived_at INTEGER,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_real_dogs_user ON real_dogs(user_id);

-- One row per confirmed adoption transition. idempotency_key is unique so a
-- retried/double-tapped confirm can never create a second dog for the same
-- transition attempt.
CREATE TABLE IF NOT EXISTS adoption_transitions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  source_simulation_id TEXT,
  real_dog_id TEXT NOT NULL REFERENCES real_dogs(id),
  idempotency_key TEXT NOT NULL UNIQUE,
  confirmed_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_adoption_transitions_user ON adoption_transitions(user_id);
