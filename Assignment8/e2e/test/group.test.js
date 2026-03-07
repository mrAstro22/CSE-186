import {test, expect} from 'vitest';
import {page, clickOn} from './setup';
import {login} from './helpers';

test('See Group Names', async () => {
  // Login
  await login(page, 'molly@books.com', 'mollymember');

  // Open Drawer
  await clickOn(page, '[aria-label="show groups"]');

  // Check Group Names
  const label = await page.waitForSelector(
      '::-p-text(Movie Names)');
  expect(label).not.toBeNull();
});

test('See Group Post', async () => {
  // Login
  await login(page, 'molly@books.com', 'mollymember');

  // Wait for groups button
  await page.waitForSelector('[aria-label="show groups"]');
  await clickOn(page, '[aria-label="show groups"]');

  // Click group
  await clickOn(page, '[aria-label="group-Movie Names"]');

  // Verify post exists
  const moviePost = await page.waitForSelector(
      '::-p-text(Favorite Movie ATM - Guardians of the Galaxy 2)',
  );

  expect(moviePost).not.toBeNull();
});

test('Group to Group', async () => {
  // Login
  await login(page, 'molly@books.com', 'mollymember');

  // Wait for groups button
  await page.waitForSelector('[aria-label="show groups"]');
  await clickOn(page, '[aria-label="show groups"]');

  // Click group Movie Names
  await clickOn(page, '[aria-label="group-Movie Names"]');

  // Wait for Group To Load
  await page.waitForSelector('::-p-text(Favorite Movie ATM -' +
    ' Guardians of the Galaxy 2)');

  // Wait for groups button
  await page.waitForSelector('[aria-label="show groups"]');
  await clickOn(page, '[aria-label="show groups"]');

  // Click group Guitars
  await clickOn(page, '[aria-label="group-Guitars"]');

  // Verify post exists
  const moviePost = await page.waitForSelector(
      '::-p-text(Private Post in "Guitars": Indian Sitar)',
  );

  expect(moviePost).not.toBeNull();
});

test('Group to Home', async () => {
  // Login
  await login(page, 'molly@books.com', 'mollymember');

  // Wait for groups button
  await page.waitForSelector('[aria-label="show groups"]');
  await clickOn(page, '[aria-label="show groups"]');

  // Click group
  const group = await page.waitForSelector('::-p-text(Movie Names)');
  await group.click();
  group.dispose();

  // Wait for groups button
  await page.waitForSelector('[aria-label="go-home"]');
  await clickOn(page, '[aria-label="go-home"]');

  // Unassociated Post - No Group
  const homePost = await page.waitForSelector(
      '::-p-text(Public Post: Hello World!)',
  );

  expect(homePost).not.toBeNull();
});
