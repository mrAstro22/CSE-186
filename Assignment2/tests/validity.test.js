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

/*
#######################################################################
# DO NOT MODIFY THIS FILE
#######################################################################
*/

import {it, expect} from 'vitest';

import fs from 'fs';
import {readdir} from 'node:fs/promises';
import strip from 'strip-comments';

const contains = async (text, sensitive = true) => {
  let cnt = 0;
  const files = await readdir('src', {recursive: true});
  for (const file of files) {
    if (file.endsWith(`.js`)) {
      const data = fs.readFileSync(`src/${file}`, {encoding: 'utf8'});
      let src = strip(data).replace(/(\r\n|\n|\r)/gm, '');
      if (!sensitive) {
        src = src.toLowerCase();
        text = text.toLowerCase();
      }
      if (src.includes(text)) {
        cnt++;
      }
    }
  }
  return cnt;
};

/*
 * Should not be setting innerHTML - doing so blows the DOM away and
 * you have to create a new one as all your elements have gone 'poof'
 * and disppeared.
 */
it('Does not set or get innerHTML on DOM elements', async () => {
  expect(await contains('innerHTML')).toBe(0);
});

/*
 * Should not be using JavaScript var - always start with ECMAScript
 * const, changing to let if the data truly needs to be muteable.
 */
it('Does not use JavaScript var', async () => {
  expect(await contains('var ')).toBe(0);
});
