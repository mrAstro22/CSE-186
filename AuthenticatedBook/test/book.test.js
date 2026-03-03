/*
#######################################################################
#
# Copyright (C) 2020-2025 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

import {test, describe, beforeAll, afterAll, expect} from 'vitest';
import supertest from 'supertest';
import http from 'http';

import 'dotenv/config';
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

const molly = {
  email: 'molly@books.com',
  password: 'mollymember',
};

const anna = {
  email: 'anna@books.com',
  password: 'annaadmin',
};

const login = async (user) => {
  let token;
  await request.post('/api/v0/login')
    .send(user)
    .then((res) => {
      token= res.body.accessToken;
    });
  return token;
};

describe('GET', () => { 

  test('GET Invalid URL', async () => {
    await request.get('/api/v0/bookie-wookie/')
      .expect(404);
  });

  test('GET /book Return Code - No Auth Token', async () => {
    await request.get('/api/v0/book')
      .expect(401);
  });

  test('GET /book Return Code OK - Molly', async () => {
    const token = await login(molly);
    await request.get('/api/v0/book')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  test('GET /book Return Code Forbidden - Bad Auth Token', async () => {
    await request.get('/api/v0/book')
      .set('Authorization', 'Bearer so-not-an-auth-token')
      .expect(403);
  });

  test('GET /book/:isbn Known Return Code OK - Molly', async () => {
    const token = await login(molly);
    await request.get('/api/v0/book/1413775306')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  test('GET /book/:isbn Unknown Return Code Not Found - Molly', async () => {
    const token = await login(molly);
    await request.get('/api/v0/book/1413775307')
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });
});

describe('POST', () => { 

  const existingBook = {
    isbn: '1371953716',
    author: '',
    title: '',
    publisher: '',
  };

  const newBook = {
    isbn: '1371953717',
    author: 'Bob Dylan',
    title: 'Mumble Mumble',
    publisher: 'McDermit Smith Wilson',
  };

  test('POST /book Return Code OK - Anna', async () => {
    const token = await login(anna);
    await request.post('/api/v0/book')
      .send(newBook)
      .set('Authorization', `Bearer ${token}`)
      .expect(201);
  });

  test('POST /book Return Code Duplicate - Anna', async () => {
    const token = await login(anna);
    await request.post('/api/v0/book')
      .send(existingBook)
      .set('Authorization', `Bearer ${token}`)
      .expect(409);
  });

  test('POST /book Return Code Forbidden - Molly', async () => {
    const token = await login(molly);
    await request.post('/api/v0/book')
      .send(newBook)
      .set('Authorization', `Bearer ${token}`)
      .expect(403);
  });
});
