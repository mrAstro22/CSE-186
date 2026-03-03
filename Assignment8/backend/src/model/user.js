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

import {pool} from './pool.js';
// import bcrypt from 'bcrypt';

const strip = (user) => {
  // if (!user) return null;
  const stripped = {...user};
  stripped.name = user.username;
  delete stripped.password_hash;
  return stripped;
};

// /**
//  *
//  * @param {string} id - UUID of user
//  * @returns {object} user info without sensitive info
//  */
// export async function retrieveById(id) {
//   const res = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
//   const user = res.rows[0];
//   return strip(user);
// }


/**
 *
 * @param {string} email - check email
 * @param {string} password - compare hashed password
 * @returns {object} stripped senstitive info
 */
export async function retrieveByCredentials(email, password) {
  const res = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  const user = res.rows[0];

  if (!user) return null;

  // const valid = await bcrypt.compareSync(password, user.password_hash);
  if (password === user.password_hash) {
    return strip(user);
  } else {
    return null;
  }
}

