/*
#######################################################################
#
# Copyright (C) 2020-2026  David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

import {it, beforeAll, beforeEach} from 'vitest';
import {render} from '@testing-library/react';
import App from '../App';

import loader from '../model/loader';

/**
 * Do not modify this function.
 */
beforeAll(() => {
  loader();
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };
});

/**
 * Sets the browser to the size of an iPhone SE.
 * Do not modify this function, especially not to be cognizant of the
 * way your implementation determines window size.
 * Bottom line? Change your implementation to pass the tests, don't change
 * the tests to match the implementation.
 */
beforeEach(() => {
  window.resizeTo(375, 667);
});

it('Renders', async () => {
  render(<App />);
});
