import * as model from '../model/mail.js';

// Mental Model of how 'model' works
// const allMailboxes = model.retrieveAllMailboxes();
// const email = model.retrieveEmailByID(id);
// const mailboxEmails = model.retrieveMailbox('inbox');

/**
 *
 * @param req
 * @param res
 */
export async function getAll(req, res) {
  try {
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
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}

/**
 *
 * @param req
 * @param res
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
 *
 * @param req
 * @param res
 */
export async function post(req, res) {
  try {
    const newEmail = model.create(req.body, 'sent');
    res.status(201).json(newEmail);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}
