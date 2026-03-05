import {expect, it, describe, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';
import {useState} from 'react';

import App from '../App';
import {DrawerContext} from '../App';
import Home from '../view/Home';

// beforeAll(() => {
//   window.resizeTo = function resizeTo(width, height) {
//     Object.assign(this, {
//       innerWidth: width,
//       innerHeight: height,
//       outerWidth: width,
//       outerHeight: height,
//     }).dispatchEvent(new this.Event('resize'));
//   };
// });

// beforeEach(() => {
//   window.resizeTo(375, 667);
// });
vi.mock('@mui/material/useMediaQuery', () => ({
  default: () => true,
}));

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

  // it('UserBox Stores Value', async () => {
  //   const logSpy = vi.spyOn(console, 'log');
  //   render(<App/>);

  //   const userInput = screen.getByLabelText('user-box');
  //   await userEvent.type(userInput, 'hello world');

  //   const passInput = screen.getByLabelText('password-box');
  //   await userEvent.type(passInput, 'Password');

  //   const button = screen.getByLabelText('login-button');
  //   fireEvent.click(button);

  //   expect(logSpy).toHaveBeenCalledWith(['hello world', 'Password']);
  // });
});

/*
#####################
#      Drawer       #
#####################
*/
describe('Drawer ', () => {
  // Context Wrapper
  const Wrapper = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
      <DrawerContext.Provider value={{
        drawerOpen,
        setDrawerOpen,
        drawerWidth: 240,
      }}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </DrawerContext.Provider>
    );
  };

  it('renders Home page directly', () => {
    render(<Wrapper/>);

    // Test that Home content renders
    expect(screen.getByText(/MeowlChat/i)).toBeInTheDocument();
  });

  it('renders temporary drawer on mobile', async () => {
    render(<Wrapper />);

    // Open Drawer
    const drawerButton = screen.getByLabelText('show groups');
    await userEvent.click(drawerButton);

    expect(document.querySelector('.MuiDrawer-modal')).not.toBeNull();
  });

  it('Drawer Initially Closed On Mobile Render', () => {
    render(<Wrapper/>);

    // Check Aria-Label
    expect(screen.getByLabelText('show groups')).toBeInTheDocument();
  });

  it('Open Drawer', async () => {
    render(<Wrapper/>);

    // Open Drawer
    const drawerButton = screen.getByLabelText('show groups');
    await userEvent.click(drawerButton);

    // Test that Home content renders
    expect(screen.getByLabelText('hide groups')).toBeInTheDocument();
  });

  it('Open then Close Drawer', async () => {
    render(<Wrapper/>);

    // Open Drawer
    const drawerButton = screen.getByLabelText('show groups');
    await userEvent.click(drawerButton);

    // Close Drawer
    const closeButton = screen.getByLabelText('hide groups');
    await userEvent.click(closeButton);

    // Test that Home content renders
    expect(screen.getByLabelText('show groups')).toBeInTheDocument();
  });

  it('Close Drawer With Backdrop', async () => {
    render(<Wrapper />);

    // Open Drawer
    const drawerButton = screen.getByLabelText('show groups');
    await userEvent.click(drawerButton);

    // Click the backdrop to trigger onClose
    const backdrop = document.querySelector('.MuiBackdrop-root');
    fireEvent.click(backdrop);

    expect(screen.getByLabelText('show groups')).toBeInTheDocument();
  });
});
