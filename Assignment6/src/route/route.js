import * as model from '../model/book.js';

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