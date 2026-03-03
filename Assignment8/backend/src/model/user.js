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

const strip = (userRow) => {
  if (!userRow) return null;
  
  // Return Without Password
  return {
    id: userRow.id,
    name: userRow.data.user.name,
    email: userRow.data.user.email
  };
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
  const res = await pool.query(`
    SELECT *
    FROM users
    WHERE data->'user'->>'email' = $1
      AND data->'user'->>'password_hash' = $2
  `, [email, password]);

  const user = res.rows[0];
  if (!user) return null;

  return strip(user);
  // const valid = await bcrypt.compareSync(password, user.password_hash);
  // if(!valid) return null;
  // return strip(user);
}

