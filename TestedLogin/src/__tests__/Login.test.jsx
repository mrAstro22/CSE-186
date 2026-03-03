/*
 * Copyright (C) 2022-2026 David C. Harrison. All right reserved.
 *
 * You may not use, distribute, publish, or modify this code without
 * the express written permission of the copyright holder.
 */
import {it, beforeAll, afterAll, afterEach, expect} from 'vitest';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';

import Login from '../Login';

const URL = 'http://localhost:3010/api/v0/login';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/**
 *
 */
function mollyLoginHandler() {
  server.use(
      http.post(URL, async () => {
        return HttpResponse.json(
            {name: 'Molly Member', accessToken: 'someToken'}, {status: 200});
      }),
  );
}

/**
 *
 */
async function loginAsMolly() {
  render(<Login />);
  const email = screen.getByPlaceholderText('EMail');
  await userEvent.type(email, 'foo@bar.com');
  const passwd = screen.getByPlaceholderText('Password');
  await userEvent.type(passwd, 'secret');
  fireEvent.click(screen.getByText('Login'));
}

/**
 *
 */
it('Accepts Good Credentials', async () => {
  mollyLoginHandler();
  await loginAsMolly();
  await screen.findByText('Molly Member');
});

/**
 *
 */
it('Rejects Bad Credentials', async () => {
  server.use(
      http.post(URL, async () => {
        return HttpResponse.status(401);
      }),
  );
  let alertCalled = false;
  window.alert = () => alertCalled = true;
  await loginAsMolly();
  await waitFor(() => {
    expect(alertCalled).toBe(true);
  });
});

/**
 *
 */
it('Handles Logout', async () => {
  mollyLoginHandler();
  await loginAsMolly();
  await screen.findByText('Molly Member');
  fireEvent.click(screen.getByText('Logout'));
  await screen.findByText('Logged out');
});
