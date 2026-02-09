import * as model from '../model/mail.js';

/**
 *
 * @param req
 * @param res
 */
export async function getAll(req, res) {
  try {
    const mailboxes = model.retrieveAllMailboxes();
    res.status(200).json(mailboxes);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}
