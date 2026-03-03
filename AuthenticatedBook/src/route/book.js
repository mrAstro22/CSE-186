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

import * as bookModel from '../model/book.js';

export async function getAll(req, res) {
  res.status(200).json(bookModel.retrieveAll());
}

export async function getByISBN(req, res) {
  const book = bookModel.retrieveByISBN(req.params.isbn);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).send();
  }
}

export async function post(req, res) {
  const { role } = req.user;
  if (role !== 'admin') {
    return res.sendStatus(403);
  }
  try {
    const book = bookModel.create(req.body);
    res.status(201).send(book);
  } catch {
    res.status(409).send();
  }
}

