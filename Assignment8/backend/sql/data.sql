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

DELETE FROM users;

-- Aye Astro
WITH new_user AS (
  INSERT INTO users (data)
  VALUES (
    json_build_object(
      'user', json_build_object(
        'name', 'Aye Astro',
        'email', 'ayeastro@gmail.com',
        'password_hash', crypt('likeaboss', gen_salt('bf'))
      )
    )
  )
  RETURNING id
)

INSERT INTO posts (user_id, data)
SELECT id, json_build_object('content', v, 'likes', l)
FROM new_user
CROSS JOIN (VALUES 
  ('Hello world!', 2),
  ('Working On Smth New!', 200)
) AS t(v, l);

-- John Pork
WITH new_user AS (
  INSERT INTO users (data)
  VALUES (
    json_build_object(
      'user',
      json_build_object(
        'name', 'John Pork',
        'email', 'johnpork@gmail.com',
        'password_hash', crypt('calling', gen_salt('bf'))
      )
    )
  )
  RETURNING id
)

INSERT INTO posts (user_id, data)
SELECT id, json_build_object('content', v, 'likes', l)
FROM new_user
CROSS JOIN (VALUES 
  ('Im Calling', 50),
  ('Answer the Phone', 20)
) AS t(v, l);

-- Molly Maze
WITH new_user AS (
  INSERT INTO users (data)
  VALUES (
    json_build_object(
      'user',
      json_build_object(
        'name', 'Molly Maze',
        'email', 'molly@books.com',
        'password_hash', crypt('mollymember', gen_salt('bf'))
      )
    )
  )
  RETURNING id
)
INSERT INTO posts (user_id, data)
SELECT id, json_build_object('content', v, 'likes', l)
FROM new_user
CROSS JOIN (VALUES 
  ('Beautiful Weekend', 10),
  ('Love Nature', 15)
) AS t(v, l);

-- Anna Banana
WITH new_user AS (
  INSERT INTO users (data)
  VALUES (
    json_build_object(
      'user',
      json_build_object(
        'name', 'Anna Banana',
        'email', 'anna@books.com',
        'password_hash', crypt('annaadmin', gen_salt('bf'))
      )
    )
  )
  RETURNING id
)
INSERT INTO posts (user_id, data)
SELECT id, json_build_object('content', v, 'likes', l)
FROM new_user
CROSS JOIN (VALUES 
  ('Reading', 100),
  ('I Love Banana Slugs', 115)
) AS t(v, l);