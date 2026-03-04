-- Your data insert statements go here;
-- DELETE FROM users;

-- INSERT INTO users (data)
-- VALUES (
--   json_build_object(
--     'user',
--     json_build_object(
--       'name', 'Aye Astro',
--       'email', 'ayeastro@gmail.com',
--       'password_hash', crypt('likeaboss', gen_salt('bf'))
--     )
--   )
-- );

-- INSERT INTO users (data)
-- VALUES (
--   json_build_object(
--     'user',
--     json_build_object(
--       'name', 'John Pork',
--       'email', 'johnpork@gmail.com',
--       'password_hash', crypt('calling', gen_salt('bf'))
--     )
--   )
-- );

-- INSERT INTO users (data)
-- VALUES (
--   json_build_object(
--     'user',
--     json_build_object(
--       'name', 'Molly Maze',
--       'email', 'molly@books.com',
--       'password_hash', crypt('mollymember', gen_salt('bf'))
--     )
--   )
-- );


-- INSERT INTO users (data)
-- VALUES (
--   json_build_object(
--     'user',
--     json_build_object(
--       'name', 'Anna Banana',
--       'email', 'anna@books.com',
--       'password_hash', crypt('annaadmin', gen_salt('bf'))
--     )
--   )
-- );

-- INSERT INTO users (data) VALUES
--   (json_build_object('name', 'Aye Astro', 'email', 'ayeastro@gmail.com')),
--   json_build_object(
--     'user',
--     json_build_object(
--       'name', 'Anna Banana',
--       'email', 'anna@books.com',
--       'password_hash', crypt('annaadmin', gen_salt('bf'))
--     )
--   )
-- Add users
INSERT INTO users (data) VALUES
  (json_build_object('user', json_build_object('name', 'Aye Astro', 'email', 'ayeastro@gmail.com', 'password_hash', crypt('likeaboss', gen_salt('bf'))))),
  (json_build_object('user', json_build_object('name', 'John Pork', 'email', 'johnpork@gmail.com', 'password_hash', crypt('calling', gen_salt('bf'))))),
  (json_build_object('user', json_build_object('name', 'Molly Maze', 'email', 'molly@books.com', 'password_hash', crypt('mollymember', gen_salt('bf'))))),
  (json_build_object('user', json_build_object('name', 'Anna Banana', 'email', 'anna@books.com', 'password_hash', crypt('annaadmin', gen_salt('bf'))))),
  (json_build_object('user', json_build_object('name', 'John Doe', 'email', 'johndoe@gmail.com', 'password_hash', crypt('crime', gen_salt('bf')))));

  -- Add posts (look up the user by email)
INSERT INTO posts (user_id, data) VALUES
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), json_build_object('content', 'Hello world!')),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), json_build_object('content', 'Hey everyone!'));