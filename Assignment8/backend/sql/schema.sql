-- Your DDL statements go here;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  -- IF user is deleted, so will all their posts
  id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Must not be NULL 
  data jsonb
);