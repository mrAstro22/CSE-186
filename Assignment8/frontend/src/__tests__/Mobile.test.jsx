import {expect, it, describe, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';
import {useState} from 'react';

import App from '../App';
import {LayoutContext} from '../App';
import Header from '../view/Home';
import SideBar from '../view/Drawer';

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

    const userInput = screen.getByLabelText('email-box');
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
});

/*
#####################
#   Drawer/Logout   #
#####################
*/
describe('Drawer/Logout ', () => {
  // Context Wrapper
  const Wrapper = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
      <LayoutContext.Provider value={{
        drawerOpen,
        setDrawerOpen,
        drawerWidth: 240,
        isMobile: true,
      }}>
        <MemoryRouter>
          <Header/>
          <SideBar/>
        </MemoryRouter>
      </LayoutContext.Provider>
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

  it('uses temporary drawer on mobile', async () => {
    render(<Wrapper />);

    const openButton = screen.getByLabelText('show groups');
    await userEvent.click(openButton);

    expect(document.querySelector('.MuiDrawer-modal')).not.toBeNull();
  });

  it('Click Logout on Header', async () => {
    render(<Wrapper />);

    // Open Drawer
    const logout = screen.getByLabelText('logout');
    await userEvent.click(logout);

    expect(screen.getByText(/MeowlChat/i)).toBeInTheDocument();
  });
});
