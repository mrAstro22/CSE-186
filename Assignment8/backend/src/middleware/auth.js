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

// We won't do this check until we make a sensitive request

// import * as authModel from '../model/auth.js';
// import * as userModel from '../model/user.js';

// /**
//  *
//  * @param req
//  * @param res
//  * @param next
//  */
// export async function check(req, res, next) {
//   const authHeader = req.headers.authorization;
//   const token = authHeader.split(' ')[1];
//   try {
//     const data = authModel.verify(token);
//     req.user = userModel.retrieveById(data.id);
//     next();
//   } catch {
//     return res.sendStatus(403);
//   };
// };
