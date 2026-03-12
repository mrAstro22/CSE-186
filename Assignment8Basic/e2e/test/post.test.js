import {test, expect} from 'vitest';
import {page} from './setup';
import {login} from './helpers';

test('Login and Private Post', async () => {
  // Login
  await login(page, 'molly@books.com', 'mollymember');

  // Look at First Post
  const label = await page.waitForSelector(
      '::-p-text(Private Post: Just ate Steak Frites #Yummy)');
  expect(label).not.toBeNull();
});

test('Login Scroll to Last Post', async () => {
  // Login
  await login(page, 'molly@books.com', 'mollymember');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Look at First Post
  const label = await page.waitForSelector(
      '::-p-text(Public Post in "Movie Names":' +
      ' Favorite Movie ATM - 21 Jump Street)');
  expect(label).not.toBeNull();
});
