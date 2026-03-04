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

import books from '../../data/books.json' with { type: "json" };

/**
 * @returns {Array} of books
 */
export async function retrieve() {
  return books;
}

/**
 * @param {object} newBook the new book
 * @returns {object} newBook or undefind if book exsists
 */
export async function create(newBook) {
  const book = books.find((book) => book.isbn == newBook.isbn);
  if (book) {
    return undefined;
  } else {
    books.push(newBook);
    return newBook;
  }
}
