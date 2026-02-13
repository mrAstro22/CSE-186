import * as model from '../model/mail.js';

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
    const emails = await model.retrieveMailbox(mailbox);

    if (!emails || emails.mail.length === 0) {
      return res.status(404).send();
    }
    return res.status(200).json([emails]);
  }
  // Case 2 - return all mailboxes
  try {
    const mailboxes = await model.retrieveAllMailboxes();
    res.status(200).json(mailboxes);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'DB query failed', error: err.message});
  }
}
