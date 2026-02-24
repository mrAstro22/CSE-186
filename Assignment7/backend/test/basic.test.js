/*
#######################################################################
#
# Copyright (C) 2020-2026 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

import {it, beforeAll, afterAll, expect, describe} from 'vitest';
import supertest from 'supertest';

import * as db from './db.js';
import server from '../src/app.js';

let request;

beforeAll(() => {
//   server = http.createServer(app);
  server.listen();
  request = supertest(server);
  return db.reset();
});

afterAll(async () => {
  db.close();
  await server.close();
});

it('Errors on GET Invalid URL', async () => {
  await request.get('/api/v0/so-not-a-real-end-point')
      .expect(404);
});

/*
#####################
# GET Mailbox Names #
#####################
*/
describe('Get Mailbox Names', () => {
  it('GET 200', async () => {
    await request.get('/api/v0/mailbox')
        .expect(200);
  });

  it('GET all mailbox names', async () => {
    const res = await request.get('/api/v0/mailbox');
    expect(res.body[0]).toBe('inbox');
  });

  it('GET all mailbox names', async () => {
    const res = await request.get('/api/v0/mailbox');
    expect(res.body[1]).toBe('sent');
  });

  it('GET all mailbox names', async () => {
    const res = await request.get('/api/v0/mailbox');
    expect(res.body[2]).toBe('trash');
  });
});

/*
####################
#    GET Mailbox   #
####################
*/
describe('Get Mailbox', () => {
  it('GET all emails in a inbox mailbox', async () => {
    const res = await request.get('/api/v0/mail?mailbox=inbox');

    // res.body is an array with one mailbox
    expect(res.body[0].name).toBe('inbox');
  });

  it('GET all emails in a trash mailbox', async () => {
    const res = await request.get('/api/v0/mail?mailbox=trash');

    // res.body is an array with one mailbox
    expect(res.body[0].name).toBe('trash');
  });

  it('GET all emails in a sent mailbox', async () => {
    const res = await request.get('/api/v0/mail?mailbox=sent');

    // res.body is an array with one mailbox
    expect(res.body[0].name).toBe('sent');
  });

  it('GET return 404, unknown mailbox', async () => {
    await request.get('/api/v0/mail?mailbox=empty')
        .expect(404);
  });
});

/*
#####################
#        PUT        #
#####################
*/

describe('PUT', () => {
  /**
   *
   * @param {string} sourceMailboxName - Inbox
   * @param {number} emailIndex - Grab Email
   * @param {string} targetMailbox - Sent to Mailbox
   * @param {number} expectedStatus - Status Code
   */
  async function moveEmailAndExpect(
      sourceMailboxName, emailIndex, targetMailbox, expectedStatus,
  ) {
    const response = await request.get('/api/v0/mail');
    const sourceMailbox = response.body.find(
        (box) => box.name === sourceMailboxName,
    );
    const validId = sourceMailbox.mail[emailIndex].id;
    await request.put(`/api/v0/mail/${validId}?mailbox=${targetMailbox}`)
        .expect(expectedStatus);
  }

  it('should return 204', async () => {
    await moveEmailAndExpect('inbox', 0, 'trash', 204);
  });

  it('Invalid ID: 404', async () => {
    await request.put(
        `/api/v0/mail/00000000-0000-0000-0000-000000000000?mailbox=trash`)
        .expect(404);
  });

  it('204: Moved to Trash', async () => {
    const response = await request.get('/api/v0/mail');
    const sourceMailbox = response.body.find(
        (box) => box.name !== 'sent' && box.name !== 'trash' &&
      box.mail.length > 0,
    );
    const validId = sourceMailbox.mail[0].id;

    // Now test with that valid ID
    await request.put(`/api/v0/mail/${validId}?mailbox=trash`)
        .expect(204);
  });

  it('Successful Transfer', async () => {
    const response = await request.get('/api/v0/mail');
    const mailboxWithMail = response.body.find(
        (box) => box.mail.length > 0,
    );
    const validId = mailboxWithMail.mail[0].id;

    // Now test with that valid ID
    await request.put(`/api/v0/mail/${validId}?mailbox=inbox`)
        .expect(204);
  });

  it('404 Error: Nonexistent Mailbox', async () => {
    const response = await request.get('/api/v0/mail');
    const sourceMailbox = response.body.find(
        (box) => box.name !== 'sent' && box.mail.length > 0,
    );

    const validId = sourceMailbox.mail[0].id;
    await request.put(`/api/v0/mail/${validId}?mailbox=random`)
        .expect(404);
  });

  it('403 Error: Putting In Sent Not Allowed', async () => {
    await moveEmailAndExpect('inbox', 1, 'sent', 403);
  });

  it('returns 500 for unexpected errors', async () => {
    const response = await request.get('/api/v0/mail');
    const mailboxWithMail = response.body.find((box) => box.mail.length > 0);
    const validId = mailboxWithMail.mail[0].id;

    await request.put(`/api/v0/mail/${validId}?mailbox=trigger500`)
        .expect(500);
  });

  it('Moved email appears in target mailbox', async () => {
    const sourceRes = await request.get('/api/v0/mail?mailbox=inbox');
    const sourceM = sourceRes.body[0]; // first email
    const valid = sourceM.id;

    // Move the email to Trash
    await request.put(`/api/v0/mail/${valid}?mailbox=trash`);

    // Check the Trash mailbox directly
    const trashResponse = await request.get('/api/v0/mail?mailbox=trash');
    const movedEmail = trashResponse.body.find((mail) => mail.id === valid);

    expect(movedEmail).toBeDefined();
  });
});
