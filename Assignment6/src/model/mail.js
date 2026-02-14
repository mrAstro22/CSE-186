import {pool} from './pool.js';

// Access JSON Properties
// ->> - Leaf
// ->  - Branch

// From and To are JSON within JSON for this asgn

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
 * @param {string} id UUID
 * @returns {object} id + email
 */
export async function retrieveMailByID(id) {
  // $1 is the UUID passed in the route
  const selectID = `
    SELECT mail.data AS mail,
      mail.id AS id
    FROM mail
    WHERE id = $1::uuid;
    `;

  const query = {
    text: selectID,
    values: [id], // Route fills in
  };

  const result = await pool.query(query);

  if (result.rowCount === 0) return null;

  // Chat GPT assisted with putting the row in Mail Object
  const {mail, id: mailID} = result.rows[0];
  return {
    id: mailID,
    from: mail.from,
    to: mail.to,
    subject: mail.subject,
    sent: mail.sent,
    received: mail.received,
    content: mail.content
  };
}

export async function create(newEmail) {
  const insert = `
    INSERT INTO mail(id, mailbox, data)
    VALUES (
    gen_random_uuid(),
    $1, $2)
    RETURNING id, data
  `;

  // Set time and date 
  const currDate = new Date().toISOString();

   const emailToAdd = {
    'from': {
      'name': 'CSE186 Student', 
      'email': 'CSEstudent@ucsc.edu'
    },
    'to': newEmail['to'],
    'subject': newEmail.subject,
    'content': newEmail.content,
    'sent': currDate,
    'received': currDate,
  };

  const result = await pool.query({
    text: insert,
    values: [
      'ad025332-0bc0-466d-a65f-49f55d8f785f',
      JSON.stringify(emailToAdd)
    ]
  });

// Specify Order of Properties
const data = result.rows[0].data;
  return {
    id: result.rows[0].id,
    from: data.from,
    to: data.to,
    subject: data.subject,
    sent: data.sent,
    received: data.received,
    content: data.content
  };
}
