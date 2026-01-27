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
import userEvent from '@testing-library/user-event';
// import {waitFor} from '@testing-library/react';

it('renders tree data', () => {
  render(<Tree data={data} />);
  screen.getByText(/Folder 1/);
});

it('click to highlight', async () => {
  render(<Tree data={data} />);
  const user = userEvent.setup();
  const label = screen.getByText('Folder 1');

  await user.click(label);
  expect(label).toHaveClass('folder-title highlight');
});

it('unhighlight node', async () => {
  render(<Tree data={data} />);
  const user = userEvent.setup();
  const label = screen.getByText('Folder 1');

  await user.click(label);
  await user.click(label);

  expect(label).not.toHaveClass('folder-title highlight');
});

it('shift click to highlight multiple', async () => {
  render(<Tree data={data} />);
  const user = userEvent.setup();
  const label1 = screen.getByText('Folder 1');
  const label2 = screen.getByText('Folder 3');

  await user.keyboard('{Shift>}');
  await user.click(label1);
  await user.click(label2);

  expect(label1).toHaveClass('folder-title highlight');
  expect(label2).toHaveClass('folder-title highlight');
});

it('shift click multiple then unhighlight', async () => {
  render(<Tree data={data} />);
  const user = userEvent.setup();
  const label1 = screen.getByText('Folder 1');
  const label2 = screen.getByText('Folder 3');

  await user.keyboard('{Shift>}'); // Hold Shift
  await user.click(label1);
  await user.click(label2);

  await user.keyboard('{/Shift}'); // Release Shift
  await user.click(label1);

  expect(label1).not.toHaveClass('folder-title highlight');
  expect(label2).not.toHaveClass('folder-title highlight');
});

it('shift click multiple then unhighlight PT 2', async () => {
  render(<Tree data={data} />);
  const user = userEvent.setup();
  const label1 = screen.getByText('Folder 1');

  await user.keyboard('{Shift>}'); // Hold Shift
  await user.click(label1);
  await user.click(label1);

  expect(label1).not.toHaveClass('folder-title highlight');
});

it('delete multiple nodes with Delete', async () => {
  render(<Tree data={data} />);
  const user = userEvent.setup();
  const label1 = screen.getByText('Folder 1');
  const label2 = screen.getByText('Folder 3');

  await user.keyboard('{Shift>}'); // Hold Shift
  await user.click(label1);
  await user.click(label2);
  await user.keyboard('{/Shift}'); // Release Shift

  await user.keyboard('{Delete>}'); // Press Delete
  await user.keyboard('{/Delete}');

  expect(label1).not.toBeInTheDocument();
  expect(label2).not.toBeInTheDocument();
});

it('delete multiple nodes with Backspace', async () => {
  render(<Tree data={data} />);
  const user = userEvent.setup();
  const label1 = screen.getByText('Folder 1');
  const label2 = screen.getByText('Folder 3');

  await user.keyboard('{Shift>}'); // Hold Shift
  await user.click(label1);
  await user.click(label2);
  await user.keyboard('{/Shift}'); // Release Shift

  await user.keyboard('{Backspace>}'); // Press Delete
  await user.keyboard('{/Backspace}');

  expect(label1).not.toBeInTheDocument();
  expect(label2).not.toBeInTheDocument();
});

it('delete nested child', async () => {
  render(<Tree data={data} />);
  const user = userEvent.setup();
  const label1 = screen.getByText('File 11');

  await user.keyboard('{Shift>}'); // Hold Shift
  await user.click(label1);
  await user.keyboard('{/Shift}'); // Release Shift

  await user.keyboard('{Backspace>}'); // Press Delete
  await user.keyboard('{/Backspace}');

  expect(label1).not.toBeInTheDocument();
});


it('delete nothing', async () => {
  render(<Tree data={data} />);
  const user = userEvent.setup();
  const label1 = screen.getByText('Folder 1');


  await user.keyboard('{Shift>}'); // Hold Shift
  await user.click(label1);
  await user.keyboard('{/Shift}'); // Release Shift
  await user.click(label1);

  await user.keyboard('{Backspace>}'); // Press Delete
  await user.keyboard('{/Backspace}');

  expect(label1).toBeInTheDocument();
});
