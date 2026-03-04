/*
#######################################################################
#
# Copyright (C) 2025-2026 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

import * as model from '../model/book.js';
import * as socket from '../socket/book.js';

/**
 * @param {object} req request
 * @param {object} res response
 */
export async function getAll(req, res) {
  res.status(200).json(await model.retrieve());
}

/**
 * @param {object} req request
 * @param {object} res response
 */
export async function post(req, res) {
  const book = await model.create(req.body);
  if (!book) {
    res.status(409).send();
  } else {
    res.status(201).send(book);
    socket.broadcast(book);
  }
}
