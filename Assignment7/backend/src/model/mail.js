import {pool} from './pool.js';

// Access JSON Properties
// ->> - Leaf
// ->  - Branch

// From and To are JSON within JSON for this asgn


// Reads names of mailboxes as an array of strings
/**
 * @returns {Array} - mailbox names
 */
export async function retrieveMailboxNames() {
  const selectNames = `
    SELECT mailbox.data->> 'name' AS name
    FROM mailbox
    `;
  const query = {
    text: selectNames,
  };
  const {rows} = await pool.query(query);

  const mailboxNames = rows.map((row) => row.name);
  return mailboxNames;
}


// Reads all mailboxes and strips content from emails
/**
 * @returns {Array} - stripped email
 */
export async function retrieveAllMailboxes() {
  const selectAll = `
    SELECT mailbox.data->> 'name' AS name, 
      mail.data AS mail,
      mail.id as id
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
    const {...rest} = row.mail;
    delete rest.content;

    // Set Correct Order
    const stripped = {
      id: row.id, // uuid
      from: row.mail.from,
      to: row.mail.to,
      subject: row.mail.subject,
      sent: row.mail.sent,
      received: row.mail.received,
    };

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

// Retrieve Queried Mailbox
/**
 *
 * @param {object } mailbox - allMail from Query
 * @returns {Array} selectedMailbox
 */
export async function retrieveMailbox(mailbox) {
  const emails = await retrieveAllMailboxes();

  // Find Mailbox with given name
  const selectedMailbox = emails.find((e) => e.name === mailbox);

  return selectedMailbox || null;
}

/**
 *
 * @param {string} mailbox - user input
 * @param {string} id - user input
 * @returns {object} succesful transfer or error
 */
export async function puttingIt(mailbox, id) {
  const selectID = `
    SELECT 
        mail.data AS mail,
        mail.id AS id,
        mailbox.data->>'name' AS "currentMailbox"
    FROM mail
    JOIN mailbox ON mail.mailbox = mailbox.id
    WHERE mail.id = $1::uuid;
    `;

  const currEmail = await pool.query({
    text: selectID,
    values: [id],
  });

  // Mail Not Found
  if (currEmail.rowCount === 0) {
    return null;
  }

  // Look for Mailbox ID
  const mailboxResult = await pool.query({
    text: `
    SELECT id FROM mailbox 
    WHERE data->>'name' = $1`,
    values: [mailbox],
  });

  // Mailbox Not Found
  if (mailboxResult.rowCount === 0) {
    return null;
  }

  if (mailbox === 'sent') {
    const e = new Error('Cannot move to sent');
    e.status = 403;
    throw e;
  }

  // Move into Desired Mailbox
  const move = `
        UPDATE mail
        SET mailbox = $1
        WHERE id = $2
        RETURNING id, data, mailbox
    `;

  const mailboxID = mailboxResult.rows[0].id;

  const result = await pool.query({
    text: move,
    values: [mailboxID, id],
  });

  // Return Email
  return result.rows[0];
}
