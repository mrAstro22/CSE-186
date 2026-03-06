-- Your DDL statements go here;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB
);

-- DROP TABLE IF EXISTS groups;
-- CREATE TABLE groups (
--   -- IF user is deleted, so will all their posts
--   groupid UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
--   userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   data jsonb
-- );

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  -- IF user is deleted, so will all their posts
  postid UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  -- groupid UUID REFERENCES groups(groupid) ON DELETE CASCADE,
  data jsonb
);