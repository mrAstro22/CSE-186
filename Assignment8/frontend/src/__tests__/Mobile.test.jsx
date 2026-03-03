import {expect, it, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

it('renders Username Box', () => {
  render(<App/>);

  const userInput = screen.getByLabelText('user-box');
  expect(userInput).toBeInTheDocument();
});

it('renders Password Box', () => {
  render(<App/>);

  const passInput = screen.getByLabelText('password-box');
  expect(passInput).toBeInTheDocument();
});

it('renders Login Button', () => {
  render(<App/>);

  const button = screen.getByLabelText('login-button');
  expect(button).toBeInTheDocument();
});

it('UserBox Stores Value', async () => {
  const logSpy = vi.spyOn(console, 'log');
  render(<App/>);

  const userInput = screen.getByLabelText('user-box');
  await userEvent.type(userInput, 'hello world');

  const passInput = screen.getByLabelText('password-box');
  await userEvent.type(passInput, 'Password');

  const button = screen.getByLabelText('login-button');
  fireEvent.click(button);

  expect(logSpy).toHaveBeenCalledWith(['hello world', 'Password']);
});

// it('Checkboxes exist', () => {
//   render(<Tree data={data} />);
//   const checkboxes = screen.queryAllByRole('checkbox');
//   expect(checkboxes.length).toBeGreaterThan(0);
// });

// it('File Checkboxes are Clickable', async () => {
//   render(<Tree data={data} />);
//   const user = userEvent.setup();
//   const checkbox = screen.getByLabelText('Uncheck File 14');

//   const isChecked = checkbox.checked;
//   await user.click(checkbox);
//   expect(checkbox.checked).toBe(!isChecked);
// });
