-- Your DDL statements go here;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB
);

-- DROP TABLE IF EXISTS userData;
-- CREATE TABLE userData (
--   user UUID REFERENCES user(id),
--   username TEXT UNIQUE NOT NULL,
--   email TEXT UNIQUE NOT NULL,
--   password_hash TEXT NOT NULL,
--   created_at TIMESTAMPTZ DEFAULT now(),
--   data jsonb
-- )