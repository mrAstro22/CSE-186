/*
#######################################################################
#
# Copyright (C) 2020-2025  David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

import {it, beforeAll, afterAll, afterEach} from 'vitest';
import {http, HttpResponse} from 'msw';
import {ws} from 'msw';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {setupServer} from 'msw/node';

import App from '../App';

const URL = 'http://localhost:3010/api/v0';
const API = ws.link('ws://localhost:3010');

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const knownBook = {
  isbn: '7747252757',
  title: 'Some Title',
  author: 'Some Author',
  publisher: 'Some Publisher',
};

it('Adds new book', async () => {
  let wsc;
  server.use(
      API.addEventListener('connection', ({client}) => {
        wsc = client;
      }),
      http.get(URL +'/book', async () => {
        return HttpResponse.json([knownBook]);
      }),
      http.post(URL +'/book', async ({request}) => {
        const book = await request.clone().json();
        wsc.send(JSON.stringify(book));
        return new HttpResponse(null, {
          status: 200,
          statusText: 'OK',
        });
      }),
  );
  // Nasty, but this is a simple App so arguably justified
  // to render the entire thing.
  render(
      <App />,
  );
  const newBook = {...knownBook};
  newBook.isbn = '5093430409';
  newBook.title = 'New Title';
  for (const key in newBook) {
    if (Object.hasOwnProperty.call(newBook, key)) {
      const element = screen.getByPlaceholderText((key));
      await userEvent.type(element, newBook[key]);
    }
  }
  screen.findByText(knownBook.isbn);
  fireEvent.click(screen.getByText('Add Book'));
  await screen.findByText(newBook.isbn);
  wsc.close();
}, 10000);
