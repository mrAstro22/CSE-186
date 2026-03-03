/*
#######################################################################
#
# Copyright (C) 2020-2026 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

import bcrypt from 'bcrypt';

import users from '../../data/users.json' with { type: "json" }

const strip = (user) => {
  let stripped;
  if (user) {
    stripped = {...user};
    delete stripped.password;
    delete stripped.email;
  }
  return stripped;
};

export function retrieveById(id) {
  const user = users.find((u) => { 
    return u.id === id;
  });
  return strip(user);
}

export function retrieveByCredentials(email, password) {
  const user = users.find((u) => { 
    return u.email === email && 
      bcrypt.compareSync(password, u.password);
  });
  return strip(user);
}

