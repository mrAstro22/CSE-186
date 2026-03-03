import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let data = [
  {
    name: 'inbox',
    mail: [
      {
        id: '1',
        from: { name: 'Alice' },
        to: { name: 'Jacob' },
        subject: 'Hello',
        received: new Date().toISOString(),
      },
    ],
  },
  {
    name: 'sent',
    mail: [],
  },
  {
    name: 'trash',
    mail: [],
  },
];

// GET mailbox names
app.get('/api/v0/mailbox', (req, res) => {
  res.json(data.map((box) => box.name));
});

// GET mail by mailbox
app.get('/api/v0/mail', (req, res) => {
  const { mailbox } = req.query;
  res.json(data);
});

// PUT move mail to trash
app.put('/api/v0/mail/:id', (req, res) => {
  const { id } = req.params;
  const { mailbox } = req.query;

  let email;

  for (const box of data) {
    const index = box.mail.findIndex((m) => m.id === id);
    if (index !== -1) {
      email = box.mail.splice(index, 1)[0];
      break;
    }
  }

  if (!email) return res.sendStatus(404);

  const target = data.find((b) => b.name === mailbox);
  target.mail.push(email);

  res.sendStatus(204);
});

export default app;