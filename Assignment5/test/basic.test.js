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

it('GET all emails in a specified mailbox', async () => {
  await request.get('/api/v0/mail?mailbox=inbox')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((data) => {
        expect(data.name == 'inbox');
      });
});

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
/* Add additional tests below here */
