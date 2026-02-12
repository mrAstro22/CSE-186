import * as model from '../model/mail.js';

// Mental Model of how 'model' works
// const allMailboxes = model.retrieveAllMailboxes();
// const email = model.retrieveEmailByID(id);
// const mailboxEmails = model.retrieveMailbox('inbox');

/**
 *
 * @param {object} req - req
 * @param {object} res - res
 * @returns {object} mail
 */
export async function getAll(req, res) {
  const {mailbox} = req.query;

  // Case 1 - Specific Mailbox Requested
  if (mailbox) {
    const emails = model.retrieveMailbox(mailbox);
    if (!emails) {
      return res.status(404).send();
    }
    return res.status(200).json([
      {
        name: mailbox,
        mail: emails,
      },
    ]);
  }

  // Case 2 - return all mailboxes
  const mailboxes = model.retrieveAllMailboxes();
  res.status(200).json(mailboxes);
}

/**
 * @param {object} req - req
 * @param {object} res - res
 * @returns {object} mail
 */
export async function getById(req, res) {
  const {id} = req.params;
  const email = model.retrieveEmailByID(id);

  if (!email) {
    return res.status(404).send();
  }

  res.status(200).json(email);
}


// Similarly to my /router/book.js
/**
 * @param {object} req - req
 * @param {object} res - res
 * @returns {object} mail
 */
export async function post(req, res) {
  const allowedProps = ['to-email', 'to-name', 'subject', 'content'];

  // Check required fields exist and no extra fields
  const hasAllRequired = allowedProps.every((p) => req.body[p]);
  const hasExtra = Object.keys(req.body).some((p) => !allowedProps.includes(p));

  if (!hasAllRequired || hasExtra) {
    return res.status(400).send();
  }

  const email = model.create(req.body, 'sent');
  res.status(201).send(email);
}

// PUT is Chat-GPT Generated
// /**
//  *
//  * @param req
//  * @param res
//  */
// export async function put(req, res) {
//   const {id} = req.params;
//   const {mailbox: targetMailbox} = req.query;

//   if (!targetMailbox) return
//  res.status(400).json({error: 'Mailbox required'});

//   // Find the email
//   const email = model.retrieveEmailByID(id);
//   if (!email) return res.status(404).send();

//   // Conflict rule for sent
//   const isInSent = model.retrieveMailbox('sent')?.some((e) => e.id === id);
//   if (targetMailbox === 'sent' && !isInSent) return res.status(409).send();

//   // Remove email from its current mailbox
//   for (const name of Object.keys(model.mailboxes || {})) {
//     const mailbox = model.mailboxes[name];
//     if (!mailbox) continue;

//     const index = mailbox.findIndex((e) => e.id === id);
//     if (index !== -1) {
//       mailbox.splice(index, 1); // remove from source
//       break;
//     }
//   }

//   // Add to target mailbox safely
//   if (!model.mailboxes[targetMailbox]) model.mailboxes[targetMailbox] = [];
//   model.mailboxes[targetMailbox].push(email);

//   return res.status(204).send();
// }
