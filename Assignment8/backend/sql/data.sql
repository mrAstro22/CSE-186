-- Your data insert statements go here;
DELETE FROM users;

INSERT INTO users (data)
VALUES (
  json_build_object(
    'user',
    json_build_object(
      'name', 'Aye Astro',
      'email', 'ayeastro@gmail.com',
      'password_hash', crypt('likeaboss', gen_salt('bf'))
    )
  )
);

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
);