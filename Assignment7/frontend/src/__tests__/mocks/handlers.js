// src/mocks/handlers.js
import {rest} from 'msw';

// Initial Mailbox Names
const MAILBOX_NAMES = ['inbox', 'sent', 'trash'];

// Initial Emails
const MAIL_DATA = {
  inbox: [
    {
      id: '1',
      from: {name: 'Alice', email: 'alice@test.com'},
      to: {name: 'You', email: 'you@test.com'},
      subject: 'Inbox Mail 1',
      sent: '2026-02-23T00:00:00Z',
      received: '2026-02-23T00:00:01Z',
    },
    {
      id: '2',
      from: {name: 'Bob', email: 'bob@test.com'},
      to: {name: 'You', email: 'you@test.com'},
      subject: 'Inbox Mail 2',
      sent: '2026-02-23T01:00:00Z',
      received: '2026-02-23T01:00:01Z',
    },
  ],
  sent: [
    {
      id: '3',
      from: {name: 'You', email: 'you@test.com'},
      to: {name: 'Charlie', email: 'charlie@test.com'},
      subject: 'Sent Mail 1',
      sent: '2026-02-23T02:00:00Z',
      received: '2026-02-23T02:00:01Z',
    },
  ],
  trash: [],
};

export const handlers = [
  // GET /mailbox → return mailbox names
  rest.get('http://localhost:3010/api/v0/mailbox', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MAILBOX_NAMES));
  }),

  // GET /mail?mailbox={mailbox} → return emails wrapped in { name, mail }
  rest.get('http://localhost:3010/api/v0/mail', (req, res, ctx) => {
    const mailbox = req.url.searchParams.get('mailbox');
    const mails = MAIL_DATA[mailbox] || [];
    return res(
        ctx.status(200),
        ctx.json([
          {
            name: mailbox,
            mail: mails,
          },
        ]),
    );
  }),

  // PUT /mail/:id?mailbox=trash → move mail
  rest.put('http://localhost:3010/api/v0/mail/:id', (req, res, ctx) => {
    const {id} = req.params;
    const targetMailbox = req.url.searchParams.get('mailbox');

    let sourceMailboxName = null;
    let mailItem = null;

    // Find mail in any mailbox
    for (const [mbName, mails] of Object.entries(MAIL_DATA)) {
      const found = mails.find((m) => m.id === id);
      if (found) {
        sourceMailboxName = mbName;
        mailItem = found;
        break;
      }
    }

    if (!mailItem) {
      return res(ctx.status(404), ctx.json({message: 'Mail not found'}));
    }

    // Remove from source mailbox
    MAIL_DATA[sourceMailboxName] = MAIL_DATA[sourceMailboxName].filter(
        (m) => m.id !== id,
    );

    // Add to target mailbox
    MAIL_DATA[targetMailbox] = MAIL_DATA[targetMailbox] || [];
    MAIL_DATA[targetMailbox].push(mailItem);

    return res(ctx.status(204));
  }),
];
