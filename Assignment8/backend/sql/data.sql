-- Your data insert statements go here;
DELETE FROM users;
DELETE FROM posts;

-- Add users
INSERT INTO users (data) VALUES
  (json_build_object('user', json_build_object('name', 'Aye Astro', 'email', 'ayeastro@gmail.com', 'password_hash', crypt('likeaboss', gen_salt('bf'))))),
  (json_build_object('user', json_build_object('name', 'John Pork', 'email', 'johnpork@gmail.com', 'password_hash', crypt('calling', gen_salt('bf'))))),
  (json_build_object('user', json_build_object('name', 'Molly Maze', 'email', 'molly@books.com', 'password_hash', crypt('mollymember', gen_salt('bf'))))),
  (json_build_object('user', json_build_object('name', 'Anna Banana', 'email', 'anna@books.com', 'password_hash', crypt('annaadmin', gen_salt('bf'))))),
  (json_build_object('user', json_build_object('name', 'John Doe', 'email', 'johndoe@gmail.com', 'password_hash', crypt('crime', gen_salt('bf')))));

-- Add groups
INSERT INTO groups (data) VALUES
  (json_build_object('groupname', 'Guitars', 'description', 'Everything about Guitars')),
  (json_build_object('groupname', 'Movie Names', 'description', 'Post Your Favorite Movies')),
  (json_build_object('groupname', 'Best Boy Names', 'description', 'Post Your Favorite Boy Names'));

-- Add group roles
INSERT INTO grouproles (groupid, userid, data) VALUES
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), (SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), json_build_object('role', 'owner')),
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), (SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), json_build_object('role', 'member')),
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), (SELECT id FROM users WHERE data->'user'->>'email' = 'johnpork@gmail.com'), json_build_object('role', 'member')),
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Best Boy Names'), (SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), json_build_object('role', 'owner')),
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Best Boy Names'), (SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), json_build_object('role', 'member')),
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Movie Names'), (SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), json_build_object('role', 'owner')),
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Movie Names'), (SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), json_build_object('role', 'member'));


  -- Add posts (look up the user by email)
INSERT INTO posts (userid, groupid, data) VALUES
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), NULL, json_build_object('content', 'Hello world!', 'date-posted', '2026-02-04T20:15:12.123Z', 'ispublic', false)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), json_build_object('content', 'Fender Stratocaster', 'date-posted', '2025-05-05T20:15:12.123Z', 'ispublic', false)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), json_build_object('content', 'Fender Telecaster', 'date-posted', '2025-05-05T20:15:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), json_build_object('content', 'Acoustic Guitar', 'date-posted', '2023-05-05T20:15:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), json_build_object('content', 'Electric Guitar', 'date-posted', '2025-05-05T20:15:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Movie Names'), json_build_object('content', 'Favorite Movie ATM: Guardians of the Galaxy 2', 'date-posted', '2022-10-04T20:14:12.123Z', 'ispublic', true));