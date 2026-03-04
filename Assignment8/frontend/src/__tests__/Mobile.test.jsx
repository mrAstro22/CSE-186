import {expect, it, describe, vi, beforeEach} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

beforeEach(() => {
  window.resizeTo(375, 667);
});
/*
#####################
#    Login Page     #
#####################
*/
describe('Login API', () => {
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

  it('UserBox Stores Value', async () => {
    render(<App/>);

    const userInput = screen.getByLabelText('user-box');
    await userEvent.type(userInput, 'ayeastro@gmail.com');

    const passInput = screen.getByLabelText('password-box');
    await userEvent.type(passInput, 'likeaboss');

    const button = screen.getByLabelText('login-button');
    fireEvent.click(button);

    const homeText = await screen.findByText(/MeowlChat/i);
    expect(homeText).toBeInTheDocument();
  });
});

/*
#####################
#      Drawer       #
#####################
*/
// describe('Login ', () => {
//     beforeEach(async () => {
//       render(<App/>);

//       const userInput = screen.getByLabelText('user-box');
//       await userEvent.type(userInput, 'ayeastro@gmail.com');

//       const passInput = screen.getByLabelText('password-box');
//       await userEvent.type(passInput, 'likeaboss');

//       const button = screen.getByLabelText('login-button');
//       fireEvent.click(button);
//     });
//   it('renders ', () => {

//   });
// });
