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
import http from 'http';

import * as db from './db.js';
import app from '../src/app.js';

let server;
let request;

beforeAll(() => {
  server = http.createServer(app);
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
####################
#     GET Mail     #
####################
*/
describe('Get All Mail', () => {
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

  it('Each mailbox has name property', async () => {
    const res = await request.get('/api/v0/mail');
    const mailbox = res.body[0];
    expect(mailbox).toHaveProperty('name');
  });

  it('Each mailbox has mail property', async () => {
    const res = await request.get('/api/v0/mail');
    const mailbox = res.body[0];
    expect(mailbox).toHaveProperty('mail');
  });

  it('Emails do not contain content property', async () => {
    const res = await request.get('/api/v0/mail');
    const mailbox = res.body[0];
    if (mailbox.mail.length > 0) {
      expect(mailbox.mail[0]).not.toHaveProperty('content');
    }
  });

  it('GET all emails returns 200', async () => {
    await request.get('/api/v0/mail')
        .expect(200);
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
####################
#      GET ID      #
####################
*/
describe('Get ID', () => {
  it('should return 200 OK', async () => {
    const response = await request.get('/api/v0/mail');
    const thirdMail = response.body[0].mail[2]; // Get third email
    const validId = thirdMail.id;

    // Now test with that valid ID
    await request.get(`/api/v0/mail/${validId}`)
        .expect(200);
  });

  it('should return JSON Content', async () => {
    const response = await request.get('/api/v0/mail');
    const thirdMail = response.body[0].mail[2]; // Get third email
    const validId = thirdMail.id;

    // Now test with that valid ID
    await request.get(`/api/v0/mail/${validId}`)
        .expect('Content-Type', /json/);
  });

  it('ID should Match Inputted ID', async () => {
    const response = await request.get('/api/v0/mail');
    const thirdMail = response.body[0].mail[2]; // Get third email
    const validId = thirdMail.id;

    // Now test with that valid ID
    await request.get(`/api/v0/mail/${validId}`)
        .then((res) => {
          expect(res.body.id).toBe(`${validId}`);
        });
  });

  it('Expected Subject Should Pass', async () => {
    const response = await request.get('/api/v0/mail');
    const thirdMail = response.body[0].mail[2]; // Get third email
    const validId = thirdMail.id;

    // Now test with that valid ID
    await request.get(`/api/v0/mail/${validId}`)
        .then((res) => {
          expect(res.body.subject).toBe(`Diverse zero defect alliance`);
        });
  });

  it('Return 404 on unknown ID', async () => {
    await request.get('/api/v0/mail/b50fb70c-3c56-4044-8b8d-f0170b29bd6d')
        .expect(404);
  });
});
// it('Debug: Check mailbox structure', async () => {
//   const response = await request.get('/api/v0/mail');

//   // Log all mailboxes
//   response.body.forEach((mailbox, i) => {
//     console.log(`\nMailbox [${i}]: ${mailbox.name}`);
//     mailbox.mail.forEach((email, j) => {
//       console.log(`  [${j}]: ${email.subject}`);
//     });
//   });

//   // Now check what's at [2][2]
//   console.log('\nresponse.body[2].mail[2]:');
//   console.log(response.body[2].mail[2].subject);
// });

/*
####################
#       POST       #
####################
*/
describe('POST', () => {
  const newEmail = {
    'to': {
      'name': 'John-Pork',
      'email': 'johnpork@ucsc.edu',
    },
    'subject': 'Hello World',
    'content': 'This is a test email',
  };

  const badnewEmail = {
    'to': {
      'name': 'John-Pork',
      'email': 'johnpork@ucsc.edu',
    },
    'from': {
      'name': 'CSE186 Student',
      'email': 'cse186student@ucsc.edu',
    },
    'subject': 'Hello World',
    'content': 'This is a test email',
  };

  it('201 Success', async () => {
    await request.post('/api/v0/mail')
        .send(newEmail)
        .expect(201);
  });

  it('Sees Generated UUID', async () => {
    await request.post('/api/v0/mail')
        .send(newEmail)
        .then((res) => {
          expect(res.body).toHaveProperty('id');
        });
  });

  it('returns json', async () => {
    await request.post('/api/v0/mail')
        .send(newEmail)
        .expect('Content-Type', /json/);
  });

  it('accept email and returns correct from name', async () => {
    const res = await request.post('/api/v0/mail')
        .send(newEmail);

    expect(res.body.from.name)
        .toBe('CSE186 Student');
  });

  it('accept email and returns correct from email', async () => {
    const res = await request.post('/api/v0/mail')
        .send(newEmail);

    expect(res.body.from.email)
        .toBe('CSEstudent@ucsc.edu');
  });

  it('return 400, unexpected properties', async () => {
    await request.post('/api/v0/mail')
        .send(badnewEmail)
        .expect(400);
  });
});

/*
####################
#       PUT       #
####################
*/
describe('PUT', () => {
  it('should return 204', async () => {
    const response = await request.get('/api/v0/mail');
    const thirdMail = response.body[0].mail[2]; // Get third email
    const validId = thirdMail.id;

    // Now test with that valid ID
    await request.put(`/api/v0/mail/${validId}?mailbox=trash`)
        .expect(204);
  });

  it('Invalid ID: 404', async () => {
    await request.put(
        `/api/v0/mail/c714d184-cb24-43ce-8e2f-d60b37b86d56?mailbox=trash`)
        .expect(404);
  });

  it('should return 204 Created', async () => {
    const response = await request.get('/api/v0/mail');
    const thirdMail = response.body[0].mail[2]; // Get third email
    const validId = thirdMail.id;

    // Now test with that valid ID
    await request.put(`/api/v0/mail/${validId}?mailbox=newBox`)
        .expect(204);
  });

  it('newMailbox: 204', async () => {
    const response = await request.get('/api/v0/mail');
    const thirdMail = response.body[0].mail[2]; // Get third email
    const validId = thirdMail.id;

    // Now test with that valid ID
    await request.put(`/api/v0/mail/${validId}?mailbox=trash`)
        .expect(204);
  });

  it('Succesful Transfer', async () => {
    const response = await request.get('/api/v0/mail');
    const thirdMail = response.body[0].mail[2]; // Get third email
    const validId = thirdMail.id;

    // Now test with that valid ID
    await request.put(`/api/v0/mail/${validId}?mailbox=trash`)
        .expect(204);
  });

  it('New Mailbox Created and Filled', async () => {
    const response = await request.get('/api/v0/mail');
    const thirdMail = response.body[0].mail[2];
    const validId = thirdMail.id;
    await request.put(`/api/v0/mail/${validId}?mailbox=newBox`);

    const res = await request.get('/api/v0/mail?mailbox=newBox');
    expect(res.body[0].mail.length).toBeGreaterThan(0);
  });

  it('Putting In Sent Not Allowed', async () => {
    const response = await request.get('/api/v0/mail');
    const thirdMail = response.body[0].mail[2];
    const validId = thirdMail.id;
    await request.put(`/api/v0/mail/${validId}?mailbox=sent`)
        .expect(409);
  });

  it('Putting In Sent Allowed if in Sent Already', async () => {
    const response = await request.get('/api/v0/mail');
    const thirdMail = response.body[0].mail[1];
    const validId = thirdMail.id;

    await request.put(`/api/v0/mail/${validId}?mailbox=sent`)
        .expect(204);
  });
});
