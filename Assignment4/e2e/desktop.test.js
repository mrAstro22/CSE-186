/*
#######################################################################
#
# Copyright (C) 2025 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/
import {launch} from 'puppeteer';
import {beforeAll, afterAll, beforeEach, it, expect} from 'vitest';

/*
#######################################################################
# DO NOT MODIFY THIS SECTION
#######################################################################
*/

let browser;
let page;

beforeAll(async () => {
  browser = await launch({
    headless: 'new',
    // headless: false,
    // slowMo: 4,
    defaultViewport: null,
    args: [
      '--no-sandbox',
    ],
  });
  page = await browser.newPage();
});

afterAll(async () => {
  const childProcess = browser.process();
  if (childProcess) {
    await childProcess.kill(9);
  }
});

beforeEach(async () => {
  await page.goto('http://localhost:4173');
});

/*
#######################################################################
# END DO NOT MODIFY SECTION
#######################################################################
*/

/*
#######################################################################
# Add your tests (if any) below here.
# Do not create new page instances, use the one defined at line 21 and
# assigned at line 33.
#######################################################################
*/

it('May need a desktop test', async () => {
  expect(true).toBeTruthy();
});
