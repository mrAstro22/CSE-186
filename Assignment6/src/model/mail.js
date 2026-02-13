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

    const stripped = {
      id: row.id, // uuid
      ...rest,
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
 * @param mailbox
 */
export async function retrieveMailbox(mailbox) {
  const emails = await retrieveAllMailboxes();

  // Find Mailbox with given name
  const selectedMailbox = emails.find((e) => e.name === mailbox);

  if (!selectedMailbox) {
    return [];
  }

  return selectedMailbox;
}
