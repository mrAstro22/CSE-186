import {pool} from './pool.js';

// Access JSON Properties
// ->> - Leaf
// ->  - Branch

// From and To are JSON within JSON for this asgn

// Reads all mailboxes and strips content from emails
/**
 * @returns {object} - stripped email
 */
export async function retrieveAllMailboxes() {
  const selectAll = `
    SELECT mailbox.data->> 'name' AS name, 
    mail.data AS mail
    FROM mail, mailbox
    WHERE mail.mailbox = mailbox.id
    `;
  const query = {
    text: selectAll,
  };
  const {rows} = await pool.query(query);

  const mailboxMap = new Map();

  for (const row of rows) {
    // Strip Content from Row
    const stripped = (({content, ...rest}) => rest)(row.mail);

    // Check if Mailbox Exists
    if (!mailboxMap.has(row.name)) {
      mailboxMap.set(row.name, []);
    }

    mailboxMap.get(row.name).push(stripped);
  }
  // Chat GPT API friendly return
  const arr = Array.from(mailboxMap, ([name, mail]) => ({name, mail}));
  return arr;
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
