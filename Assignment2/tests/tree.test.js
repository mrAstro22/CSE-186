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

/*
#######################################################################
# DO NOT MODIFY THIS SECTION
#######################################################################
*/

import {launch} from 'puppeteer';
import {
  beforeAll, afterAll, beforeEach, describe, test, it, expect} from 'vitest';

import pti from 'puppeteer-to-istanbul';
import {renameSync} from 'fs';

let browser;
let page;

beforeAll(async () => {
  browser = await launch({
    headless: 'new',
    // headless: false, // Uncomment to see browser, do NOT leave uncommented
    // slowMo: 4,
    args: [
      '--no-sandbox',
    ],
  });
  page = await browser.newPage();
  await Promise.all([
    page.coverage.startJSCoverage({resetOnNavigation: false}),
    page.coverage.startCSSCoverage(),
  ]);
});

afterAll(async () => {
  const [jsCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
  ]);
  const coverage = [];
  for (const result of jsCoverage) {
    if (result.url.endsWith('.js')) {
      coverage.push(result);
    }
  }
  pti.write([...coverage],
      {includeHostname: true, storagePath: './.nyc_output'});
  renameSync('./.nyc_output/out.json', './.nyc_output/tree.json');

  const childProcess = browser.process();
  if (childProcess) {
    await childProcess.kill(9);
  }
});

beforeEach(async () => {
  await page.goto(`file://${__dirname}/../src/tree.html`);
});

/*
#######################################################################
# END DO NOT MODIFY SECTION
#######################################################################
*/

/*
#######################################################################
# Add your tests below here.
# Do not create new page instances, use the one defined at line 24 and
# assigned at line 36.
#######################################################################
*/

describe('basic', () => {
  // Simple tests in both flavors to get you started:
  test('Tree 1 Exists', async () => {
    const element = await page.$('#tree1');
    expect(element).not.toBeNull();
  });
  it('Has an element with id "tree2"', async () => {
    const element = await page.$('#tree2');
    expect(element).not.toBeNull();
  });
});

test('Clicking Expand button shows the first folder\'s children', async () => {
  // Grab the first folder and its children container
  const firstFolder = await page.$('#tree1 .folder');
  const childrenContainer = await firstFolder.$('.children-container');

  // Click the Expand button
  const expandBtn = await page.$('#expand');
  await expandBtn.click();

  // Check if the children container is now visible
  const display = await childrenContainer.evaluate(el => el.style.display);
  expect(display).toBe('block');

  // Check if the folder label has the 'expanded' class
  const hasClass = await firstFolder.$eval('.folder-label', el =>
    el.classList.contains('expanded')
  );
  expect(hasClass).toBe(true);
});

test('Clicking Collapse button hides the first folder\'s children', async () => {
  // Grab the first folder and its children container
  const firstFolder = await page.$('#tree1 .folder');
  const childrenContainer = await firstFolder.$('.children-container');

  // Click the Expand button
  const expandBtn = await page.$('#expand');
  await expandBtn.click();

  // Check if the children container is now visible
  const display = await childrenContainer.evaluate(el => el.style.display);
  expect(display).toBe('block');

  // Check if the folder label has the 'expanded' class
  const hasClass = await firstFolder.$eval('.folder-label', el =>
    el.classList.contains('expanded')
  );
  expect(hasClass).toBe(true);

  const collapseBtn = await page.$('#collapse');
  await collapseBtn.click();

  // Check if the children container is now hidden
  const displayAfterCollapse = await childrenContainer.evaluate(el => el.style.display);
  expect(displayAfterCollapse).toBe('none');

  // Check if the folder label does not have the 'expanded' class
  const hasClassAfterCollapse = await firstFolder.$eval('.folder-label', el =>
    el.classList.contains('expanded')
  );
  expect(hasClassAfterCollapse).toBe(false);
});

test('Clicking on a folder label toggles its children visibility', async () => {
  // Grab the first folder and its children container
  const firstFolder = await page.$('#tree1 .folder');
  const childrenContainer = await firstFolder.$('.children-container');
  const folderLabel = await firstFolder.$('.folder-label'); 

  // Initial state should be hidden
  let display = await childrenContainer.evaluate(el => el.style.display);
  expect(display).toBe('none');

  // Click to expand
  await folderLabel.click();
  display = await childrenContainer.evaluate(el => el.style.display);
  expect(display).toBe('block');

  // Click to collapse
  await folderLabel.click();
  display = await childrenContainer.evaluate(el => el.style.display);
  expect(display).toBe('none');
});

describe('advanced', () => {
  // Your JSON tests go here
});

describe('stretch', () => {
  // Your drag-and-drop tests go here
});
