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

import {pool} from './pool.js'

export async function selectAll(author) {
  let select = `
    SELECT data || jsonb_build_object('isbn', isbn)
    AS book FROM book
  `;
  if (author) {
    select += ` WHERE data->>'author' ~* $1`
  }
  const query = {
    text: select,
    values: author ? [ `${author}` ] : [ ]
  };
  const {rows} = await pool.query(query);
  const books = [];
  for (const row of rows) {
    books.push(row.book);
  }
  return books;
}

export async function selectOne(isbn) {
  const select = `
    SELECT data || jsonb_build_object('isbn', isbn)
    AS book FROM book WHERE isbn = $1
  `;
  const query = {
    text: select,
    values: [ isbn ]
  };
  const {rows} = await pool.query(query);
  if (rows.length == 0) {
    return undefined;
  }
  return rows[0].book;
}

export async function insertOne(book) {
  const insert = `
    INSERT INTO book(isbn, data)
    VALUES ($1, $2)
  `;
  const query = {
    text: insert,
    values: [ book.isbn, book ]
  };
  await pool.query(query);
}
