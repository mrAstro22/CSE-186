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

import {it, beforeAll, afterAll, expect} from 'vitest';
import supertest from 'supertest';
import http from 'http';

import app from '../src/app.js';

let server;
let request;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
});

afterAll(async () => {
  await server.close();
});

it('Errors on invalid URL', async () => {
  await request.get('/api/v0/entirely-invalid-path')
      .expect(404);
});

it('Serves API Docs', async () => {
  await request.get('/api/v0/docs/')
      .expect(200);
});

it('Serves API Docs as HTML', async () => {
  await request.get('/api/v0/docs/')
      .expect('Content-Type', /text\/html/);
});

/*
####################
#     GET Mail     #
####################
*/

it('GET all emails returns 200', async () => {
  await request.get('/api/v0/mail')
      .expect(200);
});

it('GET all emails returns JSON', async () => {
  await request.get('/api/v0/mail')
      .expect('Content-Type', /json/);
});

it('GET all emails returns an array', async () => {
  const res = await request.get('/api/v0/mail');
  expect(Array.isArray(res.body)).toBe(true);
});

it('Each mailbox has name and mail properties', async () => {
  const res = await request.get('/api/v0/mail');
  const mailbox = res.body[0];
  expect(mailbox).toHaveProperty('name');
  expect(mailbox).toHaveProperty('mail');
});

it('Emails do not contain content property', async () => {
  const res = await request.get('/api/v0/mail');
  const mailbox = res.body[0];
  if (mailbox.mail.length > 0) {
    expect(mailbox.mail[0]).not.toHaveProperty('content');
  }
});

/*
####################
#    GET Mailbox   #
####################
*/

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

// REVIEW THIS TEST AGAIN

// it('GET return 404, unknown mailbox', async () => {
//   await request.get('/api/v0/mail?mailbox=inb')
//       .expect(404);
// });

/*
####################
#      GET ID      #
####################
*/

it('should return an email by ID', async () => {
  await request.get('/api/v0/mail/b50fb70c-3c56-4044-8b8d-f0170b29bd6c')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.id).toBe('b50fb70c-3c56-4044-8b8d-f0170b29bd6c');
        expect(res.body.subject).toBe('Posse');
      });
});

it('Return 404 on unknown ID', async () => {
  await request.get('/api/v0/mail/b50fb70c-3c56-4044-8b8d-f0170b29bd6d')
      .expect(404);
});

/*
####################
#       POST       #
####################
*/
const newEmail = {
  'to-name': 'John Pork',
  'to-email': 'johnpork@gmail.com',
  'subject': 'Hello World',
  'content': 'This is a test email',
};

const badnewEmail = {
  'to-name': 'John Pork',
  'to-email': 'johnpork@gmail.com',
  'from-name': 'UCSC Student',
  'from-email': 'ucsc@gmail.com',
  'subject': 'Hello World',
  'content': 'This is a test email',
};

it('should return an email 201', async () => {
  await request.post('/api/v0/mail')
      .send(newEmail)
      .expect(201);
});

it('Should see UUID', async () => {
  await request.post('/api/v0/mail')
      .send(newEmail)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
      });
});

it('should return an email 400, unexpected properties', async () => {
  await request.post('/api/v0/mail')
      .send(badnewEmail);
  expect(400);
});

/*
####################
#       PUT        #
####################
*/

// it('moves an email from sent to inbox', async () => {
//   // Use a valid UUID that exists in your sent mailbox for this test
//   const existingSentId = 'b50fb70c-3c56-4044-8b8d-f0170b29bd6c';

//   await request
//       .put(`/api/v0/mail/${existingSentId}?mailbox=inbox`)
//       .expect(204);
// });

// it('returns 404 for unknown email', async () => {
//   await request
//       .put('/api/v0/mail/00000000-0000-0000-0000-000000000000?mailbox=inbox')
//       .expect(404);
// });

// it('returns 400 if mailbox query is missing', async () => {
//   await request
//       .put('/api/v0/mail/00000000-0000-0000-0000-000000000000')
//       .expect(400);
// });

// it('returns 409 if email is not already in sent', async () => {
//   // Use a valid UUID that is not in 'sent'
//   const fakeId = 'b50fb70c-3c56-4044-8b8d-f0170b29bd6c';
//   await request
//       .put(`/api/v0/mail/${fakeId}?mailbox=sent`)
//       .expect(409);
// });

// it('removes the email from its original mailbox after moving', async () => {
//   const emailId =
// 'b50fb70c-3c56-4044-8b8d-f0170b29bd6c'; // must exist in inbox
//   const originalMailbox = 'inbox';
//   const targetMailbox = 'trash';

//   // Confirm email is in the original mailbox first
//   const before =
//  await request.get(`/api/v0/mail?mailbox=${originalMailbox}`);
//   const foundBefore = before.body[0].mail.some((e) => e.id === emailId);
//   expect(foundBefore).toBe(true);

//   // Move it
//   await request.put(
//       `/api/v0/mail/${emailId}?mailbox=${targetMailbox}`,
//   ).expect(204);

//   // Confirm it is gone from the original mailbox
//   const after = await request.get(`/api/v0/mail?mailbox=${originalMailbox}`);
//   const foundAfter = after.body[0].mail.some((e) => e.id === emailId);
//   expect(foundAfter).toBe(false);
// });
