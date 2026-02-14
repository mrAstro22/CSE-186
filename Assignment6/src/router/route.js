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

    if (!emails) {
      return res.status(404).send();
    }
    return res.status(200).json([emails]);
  }
  // Case 2 - return all mailboxes
  const mailboxes = await model.retrieveAllMailboxes();
  res.status(200).json(mailboxes);

  // catch (err) {
  //   console.error(err);
  //   res.status(500).json({message: 'DB query failed', error: err.message});
  // }
}

/**
 *
 * @param {string} req - UUID
 * @param {string} res - Assists Error Handling
 * @returns {string} - Error Code
 */
export async function getByID(req, res) {
  const {id} = req.params;

  const mail = await model.retrieveMailByID(id);
  if (!mail) {
    return res.status(404).send();
  }
  return res.status(200).json(mail);

  // catch (err) {
  //   console.error(err);
  //   return res.status(500).json(
  //       {message: 'DB query failed', error: err.message},
  //   );
  // }
}

/**
 *
 * @param {object} req - newEmail input
 * @param {string} res - status code
 */
export async function post(req, res) {
  const email = await model.create(req.body, 'sent');
  res.status(201).send(email);
}

/**
 *
 * @param {string} req - id and mailbox input
 * @param {string} res - status code
 * @returns {string} status
 */
export async function put(req, res) {
  const {id} = req.params;
  const {mailbox} = req.query;

  try {
    // Error Handle
    const email = await model.puttingIt(mailbox, id);
    if (!email) {
      return res.sendStatus(404);
    }
    // Success
    return res.sendStatus(204);
  } catch (err) {
    // 409 Conflict
    if (err.message === '409') {
      return res.sendStatus(409);
    }
  }
}
