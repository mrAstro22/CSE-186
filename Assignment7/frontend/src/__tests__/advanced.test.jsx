// src/App.test.jsx
import {render, screen, fireEvent} from '@testing-library/react';
import {it, beforeAll, afterAll, afterEach, expect} from 'vitest';
import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';

import App from '../App';

const emailsByMailbox = {
  inbox: [
    {
      'id': '36722995-ba07-49ec-865e-7c9bebf45b16',
      'from': {
        'name': 'Skipp Heald',
        'email': 'shealde@networkadvertising.org',
      },
      'to': {
        'name': 'CSE186 Student',
        'email': 'CSE186student@ucsc.edu',
      },
      'subject': 'Switchable bottom-line infrastructure',
      'sent': '2025-10-17T21:31:52Z',
      'received': '2025-11-14T09:11:39Z',
    },
    {
      'id': '5832aba6-a9c4-4e30-ac29-9a6dd034dbfd',
      'from': {
        'name': 'Jillene Haylands',
        'email': 'jhaylandsu@163.com',
      },
      'to': {
        'name': 'CSE186 Student',
        'email': 'CSE186student@ucsc.edu',
      },
      'subject': 'Synergized coherent throughput',
      'sent': '2019-12-27T02:24:00Z',
      'received': '2025-10-09T08:53:24Z',
    },
  ],

  sent: [
    {
      'id': 'e1e04b9a-5589-45bd-a114-8c59f79712fe',
      'from': {
        'name': 'CSE186 Student',
        'email': 'CSE186student@ucsc.edu',
      },
      'to': {
        'name': 'Shandra Rheam',
        'email': 'srheam0@myspace.com',
      },
      'subject': 'Compatible demand-driven definition',
      'sent': '2025-11-14T17:09:17Z',
      'received': '2025-11-17T23:17:19Z',
    },
    {
      'id': '14967c1d-309f-4e45-8739-8041bb05e2e2',
      'from': {
        'name': 'CSE186 Student',
        'email': 'CSE186student@ucsc.edu',
      },
      'to': {
        'name': 'Flor Mudd',
        'email': 'fmudda@aol.com',
      },
      'subject': 'Enhanced responsive secured line',
      'sent': '2025-01-06T04:32:05Z',
      'received': '2025-11-06T07:20:53Z',
    },
  ],

  trash: [
    {
      'id': '5a89b791-6897-492b-bfe0-b2e44f8342b1',
      'from': {
        'name': 'Joel De Hailes',
        'email': 'jdep@github.com',
      },
      'to': {
        'name': 'CSE186 Student',
        'email': 'CSE186student@ucsc.edu',
      },
      'subject': 'Fully-configurable intermediate leverage',
      'sent': '2025-06-24T10:20:20Z',
      'received': '2025-11-15T13:59:47Z',
    },
  ],
};

// Mock Server
const server = setupServer();

// Start server before tests
beforeAll(() => {
  server.listen();
  server.use(
      http.get('http://localhost:3010/api/v0/mailbox', () => {
        return HttpResponse.json(['inbox', 'sent', 'trash'], {status: 200});
      }),
      http.get('http://localhost:3010/api/v0/mail', ({request}) => {
        const mailbox = new URL(request.url).searchParams.get('mailbox');
        return HttpResponse.json(emailsByMailbox[mailbox] || []);
      }),
      http.put('http://localhost:3010/api/v0/mail/:id', async ({request, params}) => {
        const {id} = params;
        const body = await request.json();

        for (const box of ['inbox', 'sent']) {
          emailsByMailbox[box] = emailsByMailbox[box]
              .filter((e) => e.id !== id);
        }

        if (!emailsByMailbox.trash) {
          emailsByMailbox.trash = [];
        }
        emailsByMailbox.trash.push(body);

        return HttpResponse.json({status: 'OK'});
      }),
  );
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


it('Looks for Inbox', async () => {
  render(<App />);
  expect(await screen.findByText('Inbox')).toBeInTheDocument();
});

it('Looks for Sent', async () => {
  render(<App />);
  expect(await screen.findByText('Sent')).toBeInTheDocument();
});

it('Looks for Trash', async () => {
  render(<App />);
  expect(await screen.findByText('Trash')).toBeInTheDocument();
});

it('shows sent', async () => {
  render(<App />);

  // Click the "Sent" mailbox
  const sentButton = await screen.findByText('Sent');
  fireEvent.click(sentButton);

  expect(await screen.findByText('Shandra Rheam')).toBeInTheDocument();
});

// it('shows correct date', async () => {
//   render(<App />);

//   expect(await screen.findByText('Nov 14')).toBeInTheDocument();
// });

it('shows mails when user clicks a mailbox', async () => {
  render(<App />);

  // Click the "Sent" mailbox
  const sentButton = await screen.findByText('Sent');
  fireEvent.click(sentButton);

  // Wait a moment to see if the App fetches emails
  await new Promise((r) => setTimeout(r, 100));
  // console.log(document.body.innerHTML);
});

it('shows mails', async () => {
  render(<App />);

  // Click the "Sent" mailbox
  const trashButton = await screen.findByText('Trash');
  fireEvent.click(trashButton);

  // Wait a moment to see if the App fetches emails
  await new Promise((r) => setTimeout(r, 100));
  // console.log(document.body.innerHTML);
});


// it('shows no mails message when mailbox is empty', async () => {
//   // Render App with a mailbox that will be empty
//   render(<App initialMailbox="trash" />);

//   // Look for the message shown when there are no mails
//   const emptyMessage = await screen.findByText(/no mails/i);

//   expect(emptyMessage).toBeInTheDocument();
// });

// it('Finds Inbox Mail 1', async () => {
//   render(<App />);
//   // Wait for the inbox mail to appear
//   const mail = await screen.findByText('Inbox Mail 1', {}, {timeout: 2000});
//   expect(mail).toBeInTheDocument();
// });

// it('moves email to trash when delete button is clicked', async () => {
//   render(<App />);
//   // Find the Delete button
//   const deleteButton = await screen.findByLabelText(
//       'Delete mail from Skipp Heald received Nov 14');
//   fireEvent.click(deleteButton);

//   // Wait for inbox to update (mail removed)
//   expect(await screen.queryByText(/Skipp Heald/i)).not.toBeInTheDocument();
// });
