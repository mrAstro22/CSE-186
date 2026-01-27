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
import {expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from '../App';
import Tree from '../view/Tree';
import data from '../model/data';
import userEvent from '@testing-library/user-event';

it('Shows JSON Tree', async () => {
  render(<App />);
  render(<Tree data={data} />);
  const user = userEvent.setup();
  const button = screen.getByText('JSON');
  await user.click(button); // Simulates click

  const JSONtree = screen.getByLabelText('JSON Tree');

  expect(JSONtree).toBeInTheDocument();
});

it('Clear Works', async () => {
  render(<App />);
  render(<Tree data={data} />);
  const user = userEvent.setup();
  const Jsonbutton = screen.getByText('JSON');
  const Clearbutton = screen.getByText('Clear');

  await user.click(Jsonbutton); // Simulates click
  await user.click(Clearbutton); // Simulates click

  const JSONtree = screen.getByLabelText('JSON Tree');
  const JSONtext = JSONtree.textContent;
  expect(JSONtext).toBe('');
});
