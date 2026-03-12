import {clickOn} from './setup';

export const login = async (page, email, password) => {
  await page.waitForSelector('[aria-label="email-box"]');
  await clickOn(page, '[aria-label="email-box"]');
  await page.type('[aria-label="email-box"]', email);

  await page.waitForSelector('[aria-label="password-box"]');
  await clickOn(page, '[aria-label="password-box"]');
  await page.type('[aria-label="password-box"]', password);

  await clickOn(page, '[aria-label="login-button"]');
};
