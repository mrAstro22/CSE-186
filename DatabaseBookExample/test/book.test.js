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

import * as db from './db.js';
import app from '../src/app.js';

let server;
let request;

beforeAll(async () => {
  server = http.createServer(app);
  const srv = server.listen();
  request = supertest(server);
  await db.reset();
});

afterAll(async () => {
  db.close();
  await server.close();
});

test('GET Invalid URL', async () => {
  await request.get('/api/v0/so-not-a-valid-url/')
    .expect(404);
});

test('GET All Return Code', async () => {
  await request.get('/api/v0/book')
    .expect(200);
});

test('GET All Content Type', async () => {
  await request.get('/api/v0/book')
    .expect('Content-Type', /json/)
});

test('GET All Length', async () => {
  await request.get('/api/v0/book')
    .then((data) => {
      expect(data.body.length).toEqual(256);
    });
});

test('GET One Return Code', async () => {
  await request.get('/api/v0/book/4987331179')
    .expect(200);
});

test('GET One Content Type', async () => {
  await request.get('/api/v0/book/4987331179')
    .expect('Content-Type', /json/);
});

test('GET One ISBN', async () => {
  await request.get('/api/v0/book/4987331179')
    .then((data) => {
      expect(data.body.isbn).toEqual('4987331179');
    });
});

test('GET One Author', async () => {
  await request.get('/api/v0/book/4987331179')
    .then((data) => {
      expect(data.body.author).toEqual('Zelig Nizet');
    });
});

test('GET One Title', async () => {
  await request.get('/api/v0/book/4987331179')
    .then((data) => {
      expect(data.body.title).toEqual('Across the Bridge');
    });
});

test('GET One Publisher', async () => {
  await request.get('/api/v0/book/4987331179')
    .then((data) => {
      expect(data.body.publisher).toEqual('HarrisMcDermott');
    });
});

test('GET By Author', async () => {
  await request.get('/api/v0/book?author=Oswald%20Rennox')
    .then(res => {
      expect(res.body[0].title).toEqual('Heart Condition');
    })
});

test('GET Missing', async () => {
  await request.get('/api/v0/book/4987331178')
    .expect(404);
});

test('GET Invalid ISBN', async () => {
  await request.get('/api/v0/book/4987331178-1')
    .expect(400);
});

const book = {
  author: 'Bob Dylan',
  title: 'Mumble Mumble',
  publisher: 'McDermit Smith Wilson',
};

test('POST New Return Code', async () => {
  book.isbn = '4987331180',
  await request.post('/api/v0/book/')
    .send(book)
    .expect(201);
});

test('POST New ISBN', async () => {
  book.isbn = '4987331181',
  await request.post('/api/v0/book/')
    .send(book)
    .then((data) => {
      expect(data.body.isbn).toEqual(book.isbn);
    });
});

test('POST New Author', async () => {
  book.isbn = '4987331182',
  await request.post('/api/v0/book/')
    .send(book)
    .then((data) => {
      expect(data.body.author).toEqual(book.author);
    });
});

test('POST New Title', async () => {
  book.isbn = '4987331183',
  await request.post('/api/v0/book/')
    .send(book)
    .then((data) => {
      expect(data.body.title).toEqual(book.title);
    });
});

test('POST New Publisher', async () => {
  book.isbn = '4987331184',
  await request.post('/api/v0/book/')
    .send(book)
    .then((data) => {
      expect(data.body.publisher).toEqual(book.publisher);
    });
});

test('GET After POST ISBN', async () => {
  book.isbn = '4987331185';
  await request.post('/api/v0/book/').send(book)
  await request.get('/api/v0/book/' + book.isbn)
    .then((data) => {
      expect(data.body.isbn).toEqual(book.isbn);
    });
});

test('GET After POST Author', async () => {
  book.isbn = '4987331186';
  await request.post('/api/v0/book/').send(book)
  await request.get('/api/v0/book/' + book.isbn)
    .then((data) => {
      expect(data.body.author).toEqual(book.author);
    });
});

test('GET After POST Title', async () => {
  book.isbn = '4987331187';
  await request.post('/api/v0/book/').send(book)
  await request.get('/api/v0/book/' + book.isbn)
    .then((data) => {
      expect(data.body.title).toEqual(book.title);
    });
});

test('GET After POST Publisher', async () => {
  book.isbn = '4987331188';
  await request.post('/api/v0/book/').send(book)
  await request.get('/api/v0/book/' + book.isbn)
    .then((data) => {
      expect(data.body.publisher).toEqual(book.publisher);
    });
});

test('POST Invalid ISBN', async () => {
  book.isbn = 'some-old-guff';
  await request.post('/api/v0/book/')
    .send(book)
    .expect(400);
});

test('POST Exisiting ISBN', async () => {
  book.isbn = '4987331179';
  await request.post('/api/v0/book/')
    .send(book)
    .expect(409);
});
