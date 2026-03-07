import {render, screen, http,
  HttpResponse, server, URL, userEvent} from './testHelpers';
import {it, expect, vi} from 'vitest';
import {fireEvent} from '@testing-library/react';
import {LayoutContext} from '../App';
import {beforeEach} from 'vitest';
import {MemoryRouter, Routes, Route} from 'react-router-dom';
import Home from '../view/Home';
import {useState} from 'react';

vi.mock('@mui/material/useMediaQuery', () => ({
  default: () => true,
}));

const MobileWrapper = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <MemoryRouter>
      <LayoutContext.Provider value={{
        drawerOpen,
        setDrawerOpen,
        drawerWidth: 240,
        isMobile: true,
      }}>
        <Routes>
          <Route path="/" element={<Home drawerWidth={240} />} />
        </Routes>
      </LayoutContext.Provider>
    </MemoryRouter>
  );
};

beforeEach(() => {
  server.use(
      http.get(`${URL}/group`, () => HttpResponse.json([])),
      http.get(`${URL}/post`, () => HttpResponse.json([])),
  );
});

it('renders Home page directly', () => {
  render(<MobileWrapper />);
  expect(screen.getByText(/MeowlChat/i)).toBeInTheDocument();
});

it('Drawer Initially Closed On Mobile Render', () => {
  render(<MobileWrapper />);
  expect(screen.getByLabelText('show groups')).toBeInTheDocument();
});

it('renders temporary drawer on mobile', async () => {
  render(<MobileWrapper />);
  const drawerButton = screen.getByLabelText('show groups');
  await userEvent.click(drawerButton);
  expect(document.querySelector('.MuiDrawer-modal')).not.toBeNull();
});

it('Open Drawer', async () => {
  render(<MobileWrapper />);
  const drawerButton = screen.getByLabelText('show groups');
  await userEvent.click(drawerButton);
  expect(screen.getByLabelText('hide groups')).toBeInTheDocument();
});

it('Open then Close Drawer', async () => {
  render(<MobileWrapper />);
  const drawerButton = screen.getByLabelText('show groups');
  await userEvent.click(drawerButton);
  const closeButton = screen.getByLabelText('hide groups');
  await userEvent.click(closeButton);
  expect(screen.getByLabelText('show groups')).toBeInTheDocument();
});

it('Close Drawer With Backdrop', async () => {
  render(<MobileWrapper />);
  const drawerButton = screen.getByLabelText('show groups');
  await userEvent.click(drawerButton);
  const backdrop = document.querySelector('.MuiBackdrop-root');
  fireEvent.click(backdrop);
  expect(screen.getByLabelText('show groups')).toBeInTheDocument();
});

it('uses temporary drawer on mobile', async () => {
  render(<MobileWrapper />);
  const openButton = screen.getByLabelText('show groups');
  await userEvent.click(openButton);
  expect(document.querySelector('.MuiDrawer-modal')).not.toBeNull();
});

it('Click Logout on Header', async () => {
  render(<MobileWrapper />);
  const logout = screen.getByLabelText('logout');
  await userEvent.click(logout);
  expect(screen.getByText(/MeowlChat/i)).toBeInTheDocument();
});
