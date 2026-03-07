import {test, expect} from 'vitest';
import {page} from './setup';

test('Initial View', async () => {
  const label = await page.waitForSelector(
      '::-p-text(MeowlChat)');
  expect(label).not.toBeNull();
  label.dispose();
});

test('Login with Known User', async () => {
  // Email
  await page.type('[aria-label="email-box"]', 'molly@books.com');

  // Password
  await page.type('[aria-label="password-box"]', 'mollymember');

  // Login
  await page.click('[aria-label="login-button"]');

  const label = await page.waitForSelector(
      '::-p-text(Welcome to MeowlChat)');
  expect(label).not.toBeNull();
});
