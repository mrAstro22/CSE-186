import {pool} from './pool.js'

import {pool} from './pool.js'

    // Access JSON Properties
    // ->> - Leaf
    // ->  - Branch

    // From and To are JSON within JSON for this asgn

export async function selectAll() {
  let selectName = `
    SELECT mailbox.data->> 'name', mail.data
    FROM mail, mailbox
    WHERE mail.mailbox = mailbox.id
    `
  
  const query = {
    mailbox: selectName,
  };
  const {rows} = await pool.query(query);
  const books = [];
  for (const row of rows) {
    books.push(row.book);
  }
  return books;
}

export async function selectAll() {
  let selectName = `
    SELECT mailbox.data->> 'name' AS mailbox_name
    FROM mail, mailbox
    WHERE mail.mailbox = mailbox.id
    `
  
  const query = {
    mailbox: selectName,
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
