-- Your data insert statements go here;
DELETE FROM users;
DELETE FROM posts;

-- Add users
INSERT INTO users (data) VALUES
  (json_build_object('user', json_build_object('name', 'Aye Astro', 'email', 'ayeastro@gmail.com', 'password_hash', crypt('likeaboss', gen_salt('bf'))))),
  (json_build_object('user', json_build_object('name', 'Molly Maze', 'email', 'molly@books.com', 'password_hash', crypt('mollymember', gen_salt('bf'))))),
  (json_build_object('user', json_build_object('name', 'Anna Banana', 'email', 'anna@books.com', 'password_hash', crypt('annaadmin', gen_salt('bf')))));

-- Add groups
INSERT INTO groups (data) VALUES
  (json_build_object('groupname', 'Guitars', 'description', 'Everything about Guitars')),
  (json_build_object('groupname', 'Movie Names', 'description', 'Post Your Favorite Movies')),
  (json_build_object('groupname', 'Song Names', 'description', 'Post Your Favorite Songs')),
  (json_build_object('groupname', 'Best Boy Names', 'description', 'Post Your Favorite Boy Names'));

-- Add group roles
INSERT INTO grouproles (groupid, userid, data) VALUES
  -- Guitar Members
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), (SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), json_build_object('role', 'owner')),
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), (SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), json_build_object('role', 'member')),
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), (SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), json_build_object('role', 'member')),
  
  -- Best Boy Name Members
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Best Boy Names'), (SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), json_build_object('role', 'owner')),
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Best Boy Names'), (SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), json_build_object('role', 'member')),
  
  -- Movie Name Members
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Movie Names'), (SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), json_build_object('role', 'owner')),
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Movie Names'), (SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), json_build_object('role', 'member')),

  -- Song Name Members
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Song Names'), (SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), json_build_object('role', 'member')),
  ((SELECT groupid FROM groups WHERE data->>'groupname' = 'Song Names'), (SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), json_build_object('role', 'owner'));

  -- Add posts (look up the user by email)
INSERT INTO posts (userid, groupid, data) VALUES
  -- No Group
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), NULL, json_build_object('content', 'Public Post: Hello World!', 'date-posted', '2026-02-04T20:15:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), NULL, json_build_object('content', 'Public Post: Exploring New Horizons', 'date-posted', '2025-01-04T20:15:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), NULL, json_build_object('content', 'Private Post: Just ate Steak Frites #Yummy', 'date-posted', '2026-12-04T20:15:12.123Z', 'ispublic', false)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), NULL, json_build_object('content', 'Public Post: Thinking of Traveling', 'date-posted', '2024-11-12T20:15:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), NULL, json_build_object('content', 'Public Post: Just Got Back From Mexico', 'date-posted', '2022-04-25T20:15:12.123Z', 'ispublic', true)),

  -- Guitars
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), json_build_object('content', 'Private Post in "Guitars": Fender Stratocaster', 'date-posted', '2025-05-05T20:15:12.123Z', 'ispublic', false)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), json_build_object('content', 'Public Post in "Guitars": Fender Telecaster', 'date-posted', '2025-05-05T20:15:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), json_build_object('content', 'Public Post in "Guitars": Acoustic Guitar', 'date-posted', '2023-05-05T20:15:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), json_build_object('content', 'Public Post in "Guitars": Electric Guitar', 'date-posted', '2025-05-05T20:15:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), json_build_object('content', 'Private Post in "Guitars": Indian Sitar', 'date-posted', '2024-05-05T20:15:12.123Z', 'ispublic', false)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), json_build_object('content', 'Private Post in "Guitars": Fender Jaguar', 'date-posted', '2024-05-05T20:15:12.123Z', 'ispublic', false)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), json_build_object('content', 'Private Post in "Guitars": Gibson Les Paul', 'date-posted', '2024-05-05T20:15:12.123Z', 'ispublic', false)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Guitars'), json_build_object('content', 'Public Post in "Guitars": Ibanez Electric Guitar', 'date-posted', '2023-05-05T20:15:12.123Z', 'ispublic', true)),

  -- Best Boy Names
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Best Boy Names'), json_build_object('content', 'Public Post in "Best Boy Names": Jacob', 'date-posted', '2023-05-05T20:15:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Best Boy Names'), json_build_object('content', 'Public Post in "Best Boy Names": John Pork', 'date-posted', '2021-05-05T20:15:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'ayeastro@gmail.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Best Boy Names'), json_build_object('content', 'Public Post in "Best Boy Names": Samuel', 'date-posted', '2020-05-05T20:15:12.123Z', 'ispublic', true)),

  ((SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Best Boy Names'), json_build_object('content', 'Public Post in "Best Boy Names": Darnell', 'date-posted', '2025-05-05T20:15:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Best Boy Names'), json_build_object('content', 'Private Post in "Best Boy Names": Alex', 'date-posted', '2025-05-04T20:15:12.123Z', 'ispublic', false)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Best Boy Names'), json_build_object('content', 'Public Post in "Best Boy Names": Devon', 'date-posted', '2025-05-03T20:15:12.123Z', 'ispublic', true)),

  -- Movie Names
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Movie Names'), json_build_object('content', 'Public Post in "Movie Names": Favorite Movie ATM - Guardians of the Galaxy 2', 'date-posted', '2023-10-04T20:14:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Movie Names'), json_build_object('content', 'Public Post in "Movie Names": Favorite Movie ATM - Hacksaw Ridge', 'date-posted', '2022-11-04T20:14:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Movie Names'), json_build_object('content', 'Public Post in "Movie Names": Favorite Movie ATM - Step Brothers', 'date-posted', '2022-06-09T20:14:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Movie Names'), json_build_object('content', 'Public Post in "Movie Names": Favorite Movie ATM - 21 Jump Street', 'date-posted', '2010-08-06T20:14:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Movie Names'), json_build_object('content', 'Public Post in "Movie Names": Favorite Movie ATM - Dune 2', 'date-posted', '2025-02-06T20:14:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Movie Names'), json_build_object('content', 'Private Post in "Movie Names": Favorite Movie ATM - Dune 1', 'date-posted', '2024-08-06T20:14:12.123Z', 'ispublic', false)),

  -- Song Names
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Song Names'), json_build_object('content', 'Public Post in "Song Names": Favorite Song ATM - Free As a Bird - The Beatles', 'date-posted', '2010-08-06T20:14:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'anna@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Song Names'), json_build_object('content', 'Public Post in "Song Names": Favorite Song ATM - What You Saying - Lil Uzi Vert', 'date-posted', '2016-02-06T20:14:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Song Names'), json_build_object('content', 'Public Post in "Song Names": Favorite Song ATM - Sun King - The Beatles', 'date-posted', '2025-02-06T20:14:12.123Z', 'ispublic', true)),
  ((SELECT id FROM users WHERE data->'user'->>'email' = 'molly@books.com'), (SELECT groupid FROM groups WHERE data->>'groupname' = 'Song Names'), json_build_object('content', 'Public Post in "Song Names": Favorite Song ATM - Death Metal - Panchiko', 'date-posted', '2025-02-06T20:14:12.123Z', 'ispublic', true));

  