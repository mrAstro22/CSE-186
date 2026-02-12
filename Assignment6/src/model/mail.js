import {pool} from './pool.js'

import {pool} from './pool.js'

export async function selectAll(mailbox) {
  let selectName = `
    SELECT data->> 'name' AS mailbox_name
    FROM mailbox
    `
    
  const query = {
    name: selectName,
    values: author ? [ `${author}` ] : [ ]
  };
  const {rows} = await pool.query(query);
  const books = [];
  for (const row of rows) {
    books.push(row.book);
  }
  return books;
}

// export async function selectOne(isbn) {
//   const select = `
//     SELECT data || jsonb_build_object('isbn', isbn)
//     AS book FROM book WHERE isbn = $1
//   `;
//   const query = {
//     text: select,
//     values: [ isbn ]
//   };
//   const {rows} = await pool.query(query);
//   if (rows.length == 0) {
//     return undefined;
//   }
//   return rows[0].book;
// }

// export async function insertOne(book) {
//   const insert = `
//     INSERT INTO book(isbn, data)
//     VALUES ($1, $2)
//   `;
//   const query = {
//     text: insert,
//     values: [ book.isbn, book ]
//   };
//   await pool.query(query);
// }
