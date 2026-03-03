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

import books from '../../data/books.json' with { type: "json" };

export function retrieveAll() {
  return books;
}

export function retrieveByISBN(isbn) {
  return books.find((book) => book.isbn == isbn);
}

export function create(newBook) {
  const book = books.find((book) => book.isbn == newBook.isbn);
  if (book) {
    throw new Error("Duplicate ISBN");
  }
  books.push(newBook);
  return newBook;
}