import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dataDir = path.join(__dirname, '../../data'); // default directory

// Allows tests to override directory
/**
 *
 * @param {object} dir - Finds directory data
 * @returns {Array} - Array of Mailboxes
 */
export function setDataDirectory(dir) {
  dataDir = dir;
}

// Reads all files and returns mailboxes with content stripped
/**
 *
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
