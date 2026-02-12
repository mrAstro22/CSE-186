/*
#######################################################################
#
# Copyright (C) 2025-2026 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/
import {expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import Tree from '../view/Tree';
import data from '../model/data';
import Branch from '../model/Branch';
import userEvent from '@testing-library/user-event';

it('renders tree data', () => {
  render(<Tree data={[new Branch('some-id', 'Test Folder 1')]}/>);
  screen.getByText('Test Folder 1');
});

it('Checkboxes exist', () => {
  render(<Tree data={data} />);
  const checkboxes = screen.queryAllByRole('checkbox');
  expect(checkboxes.length).toBeGreaterThan(0);
});

it('File Checkboxes are Clickable', async () => {
  render(<Tree data={data} />);
  const user = userEvent.setup();
  const checkbox = screen.getByLabelText('Uncheck File 14');

  const isChecked = checkbox.checked;
  await user.click(checkbox);
  expect(checkbox.checked).toBe(!isChecked);
});

it('Folder Checkboxes are Clickable', async () => {
  render(<Tree data={data} />);
  const user = userEvent.setup();
  const checkbox = screen.getByLabelText('Uncheck Folder 3');

  const isChecked = checkbox.checked;
  await user.click(checkbox);
  expect(checkbox.checked).toBe(!isChecked);
});

it('Arrow Icon Exists', () => {
  render(<Tree data={data} />);
  const arrow = screen.getAllByText('\u25BC');
  expect(arrow.length).toBeGreaterThan(0);
});

it('Expandable Branches', async () => {
  render(<Tree data={data} />);
  const user = userEvent.setup();
  const icon = screen.getByLabelText('Expand Folder 1');
  const folder1 = screen.getByText('Folder 1').closest('.folder');

  expect(folder1.classList.contains('expanded')).toBe(false);

  // Expand
  await user.click(icon);
  expect(folder1.classList.contains('expanded')).toBe(true);
});

it('initState recursion runs without render', () => {
  const tree = new Tree();

  // Check that the state is initialized correctly
  expect(tree.state.checked[
      'a47771a1-f101-4443-96bb-4605208c4fd2']).toBe(true);
  expect(tree.state.checked[
      '8007f70d-d20e-42c4-87ad-0b52a9ff7a0b']).toBe(true);
});
