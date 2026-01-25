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
/*
#######################################################################
#######               DO NOT MODIFY THIS FILE               ###########
#######################################################################
*/

import fs from 'fs';
import {readdir} from 'node:fs/promises';
import strip from 'strip-comments';

import {it, test, expect} from 'vitest';
import Tree from '../view/Tree';

/**
 * @param {object} component to confirm is a class
 * @returns {boolean} true if component is a class, false otherwise
 */
function isClassComponent(component) {
  let isClass = false;
  try {
    component();
  } catch (e) {
    isClass = e != undefined;
  }
  return isClass;
}

const contains = async (text, trim = false) => {
  let cnt = 0;
  const files = await readdir('src', {recursive: true});
  for (const file of files) {
    if ((!file.startsWith(`__tests__`)) &&
        (!file.startsWith(`model`)) &&
        (!file.startsWith(`main.jsx`)) &&
        ((file.endsWith(`.jsx`) || file.endsWith(`.js`)))) {
      const data = fs.readFileSync(`src/${file}`, {encoding: 'utf8'});
      let src = strip(data).replace(/(\r\n|\n|\r)/gm, '');
      if (trim) {
        src = src.replaceAll(' ', '');
      }
      if (src.includes(text)) {
        cnt++;
      }
    }
  }
  return cnt;
};

const testing = async (text) => {
  let cnt = 0;
  const files = await readdir('src/__tests__', {recursive: true});
  for (const file of files) {
    if (!file.startsWith(`validity.test`)) {
      const data = fs.readFileSync(`src/__tests__/${file}`, {encoding: 'utf8'});
      const src = strip(data).replace(/(\r\n|\n|\r)/gm, '');
      if (src.includes(text)) {
        cnt++;
      }
    }
  }
  return cnt;
};

test('Tree is React.Component Sub Class', async () => {
  expect(isClassComponent(Tree)).toBe(true);
});
test('Tree extends React.Component', async () => {
  expect(await contains('class Tree extends React.Component')).toBe(1);
});

it('Uses this.setState()', async () => {
  expect(await contains('this.setState')).toBeGreaterThan(0);
});
it('Uses this.state', async () => {
  expect(await contains('this.state')).toBeGreaterThan(0);
});
it('Does not use Context Hook', async () => {
  expect(await contains('useContext')).toBe(0);
});
it('Does not use State Hook', async () => {
  expect(await contains('useState')).toBe(0);
});

it('Does not use getElementById', async () => {
  expect(await contains('getElementById')).toBe(0);
});
it('Does not use data-testid', async () => {
  expect(await contains('data-testid')).toBe(0);
});
// If you have a variable like 'valid' you'll get false positives
// so change it to something along the lines of 'ok'
it('Does not use element ids', async () => {
  expect(await contains('id=', true)).toBe(0);
});
// Case sensitive because <Table> is a React component, not an HTML element
it('Does not use table elements', async () => {
  expect(await contains('<table>', true)).toBe(0);
});

it('Tests with ByText', async () => {
  expect(await testing('ByText')).toBeGreaterThan(0);
});
it('Tests with ByLabelText', async () => {
  expect(await testing('ByLabelText')).toBeGreaterThan(0);
});
it('Does not test with ByTestId', async () => {
  expect(await testing('ByTestId')).toBe(0);
});
