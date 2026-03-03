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

import jwt from 'jsonwebtoken';

export function verify(token) {
  let data;
  jwt.verify(token, process.env.secret, (err, plain) => {
    if (err) {
      throw err;
    }
    data = plain;
    delete data.iat;
    delete data.exp;
  });
  return data;
};

export function sign(data) {
  return jwt.sign(
    data, 
    process.env.secret, {
      expiresIn: '30m',
      algorithm: 'HS256'
  });
};