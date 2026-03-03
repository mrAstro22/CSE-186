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

import {test, beforeAll, afterAll, expect} from 'vitest';
import supertest from 'supertest';
import http from 'http';
import {jwtDecode} from 'jwt-decode';

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

test('POST /login Return Code OK', async () => {
  await request.post('/api/v0/login')
    .send(molly)
    .expect(200)
});

test('POST /login Returns Access Token', async () => {
  let token;
  await request.post('/api/v0/login')
    .send(molly)
    .then((res) => {
      token = res.body.accessToken;
    });
  expect(token).not.toBeUndefined();
});

test('POST /login Returns JWT', async () => {
  let token;
  await request.post('/api/v0/login')
    .send(molly)
    .then((res) => {
      token = res.body.accessToken;
    });
  jwtDecode(token);
});

test('POST /login Returns User Name', async () => {
  let name;
  await request.post('/api/v0/login')
    .send(molly)
    .then((res) => {
      name = res.body.name;
    });
  expect(name).not.toBeUndefined();
});

test('POST /login Returns Correct User Name', async () => {
  let name;
  await request.post('/api/v0/login')
    .send(molly)
    .then((res) => {
      name = res.body.name;
    });
  expect(name).toEqual('Molly Member');
});

test('POST /login Returns Unauthorized for Wrong Password', async () => {
  await request.post('/api/v0/login')
    .send({email: 'molly@books.com', password: `not molly's password`})
    .expect(401)
});
