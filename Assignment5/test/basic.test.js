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

import {it, beforeAll, afterAll} from 'vitest';
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
      .expect(200)
});

it('Serves API Docs as HTML', async () => {
  await request.get('/api/v0/docs/')
      .expect('Content-Type', /text\/html/);
});


/* Add additional tests below here */
