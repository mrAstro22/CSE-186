import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {v4 as uuidv4} from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../../data'); // default directory

// Reads all mailboxes and strips content from emails
/**
 * @returns {object} - stripped email
 */
export function retrieveAllMailboxes() {
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json'));

  return files.map((file) => {
    const mailboxName = path.basename(file, '.json');
    const filePath = path.join(dataDir, file);
    const emails = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    return {
      name: mailboxName,
      mail: emails.map(({content, ...rest}) => rest), // strip content
    };
  });
}

// Reads a single mailbox by name and strips content
/**
 *
 * @param {object} name - mailboxName
 * @returns {object} - stripped email
 */
export function retrieveMailbox(name) {
  const filePath = path.join(dataDir, `${name}.json`);
  if (!fs.existsSync(filePath)) return null;

  const emails = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return emails.map(({content, ...rest}) => rest); // strip content
}

// Retrieve a single email by ID (include content)
/**
 *
 * @param {object} id - email with id
 * @returns {object} with content
 */
export function retrieveEmailByID(id) {
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const emails = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const email = emails.find((e) => e.id === id);
    if (email) return email; // return with content
  }

  return null; // not found
}

/**
 *
 * @param {object} newEmail - req
 * @returns {object} Created Email
 */
export function create(newEmail) {
  // const filePath = path.join(dataDir, `${mailboxName}.json`);

  // Read existing mailbox
  // const mailbox = fs.existsSync(filePath) ?
  //   JSON.parse(fs.readFileSync(filePath, 'utf8')) :
  //   [];

  const mailbox = [];

  const emailToAdd = {
    'to-name': newEmail['to-name'],
    'to-email': newEmail['to-email'],
    'subject': newEmail.subject,
    'content': newEmail.content,
    'id': uuidv4(),
    'received': new Date().toISOString(),
    'from-name': 'CSE186 Student',
    'from-email': 'cse186-student@ucsc.edu',
  };

  mailbox.push(emailToAdd);

  // Write updated mailbox back to disk
  // fs.writeFileSync(filePath, JSON.stringify(mailbox, null, 2));

  return emailToAdd;
}
