import * as model from '../model/mail.js';

/**
 *
 * @param {object} req - req
 * @param {object} res - res
 * @returns {object} mail
 */
export async function getAll(req, res) {
  // const {mailbox} = req.query;

  // Case 1 - Specific Mailbox Requested
  // if (mailbox) {
  //   const emails = model.retrieveMailbox(mailbox);
  //   if (!emails) {
  //     return res.status(404).send();
  //   }
  //   return res.status(200).json([
  //     {
  //       name: mailbox,
  //       mail: emails,
  //     },
  //   ]);
  // }
  // Case 2 - return all mailboxes
  try {
    const mailboxes = await model.retrieveAllMailboxes();
    console.log('--- TEST RESPONSE BODY ---');
    console.log(res.body);
    console.log('Type:', typeof res.body);
    console.log('Is array?', Array.isArray(res.body));
    console.log('--------------------------');
    res.status(200).json(mailboxes);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'DB query failed', error: err.message});
  }
}
