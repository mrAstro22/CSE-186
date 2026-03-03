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

import * as userModel from '../model/user.js';
import * as authModel from '../model/auth.js';

export async function login(req, res) {
  const { email, password } = req.body;
  const user = userModel.retrieveByCredentials(email, password);
  if (user) {
    const accessToken = authModel.sign({id: user.id});
    res.status(200).json({name: user.name, accessToken: accessToken});
  } else {
    res.status(401).send('Invalid credentials');
  }
};
