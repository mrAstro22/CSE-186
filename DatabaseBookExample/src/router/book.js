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

import * as model from '../model/book.js';

export async function getAll(req, res) {
  const books = await model.selectAll(req.query.author);
  res.status(200).json(books);
}

export async function getByISBN(req, res) {
  const book = await model.selectOne(req.params.isbn);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).send();
  }
} 

export async function create(req, res) {
  const book = await model.selectOne(req.body.isbn);
  if (book) {
    res.status(409).send();
  } else {
    await model.insertOne(req.body);
    res.status(201).send(req.body);
  }
}

