DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS grouproles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS post_likes CASCADE;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB
);

-- Group ID and Group Metadata(groupname, description)
CREATE TABLE groups (
  -- IF user is deleted, so will all their posts
  groupid UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
  data jsonb
);

-- Group ID, User ID,  and Role
CREATE TABLE grouproles (
  groupid UUID NOT NULL REFERENCES groups(groupid) ON DELETE CASCADE,
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  data jsonb,
  PRIMARY KEY (groupid, userid)
);

CREATE TABLE posts (
  -- IF user is deleted, so will all their posts
  postid UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  groupid UUID REFERENCES groups(groupid) ON DELETE CASCADE,
  data jsonb
);

CREATE TABLE post_likes (
  postid UUID NOT NULL REFERENCES posts(postid) ON DELETE CASCADE,
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (postid, userid)
);