import {render, screen, waitFor, http,
  HttpResponse,
  server, URL, userEvent} from './testHelpers';
import {it, expect} from 'vitest';
import SideBar from '../view/Drawer';
import {LayoutContext} from '../App';
import {MemoryRouter, Routes, Route} from 'react-router-dom';
import {mockNavigate, mockContext} from './testHelpers';

// Wrapper Accepts Two Routes
const sideBarWrapper = (initialPath = '/home') => (
  <MemoryRouter initialEntries={[initialPath]}>
    <Routes>
      <Route path="/home" element={
        <LayoutContext.Provider value={mockContext}>
          <SideBar drawerWidth={240} />
        </LayoutContext.Provider>
      }/>
      <Route path="/group/:groupID" element={
        <LayoutContext.Provider value={mockContext}>
          <SideBar drawerWidth={240} />
        </LayoutContext.Provider>
      }/>
    </Routes>
  </MemoryRouter>
);

const requestWrapper = () => (
  http.get(`${URL}/group`, () => {
    return HttpResponse.json([
      {groupid: '1', groupname: 'Guitars'},
      {groupid: '2', groupname: 'Movie Names'},
    ]);
  })
);

const requestWrapper2 = () => (
  http.get(`${URL}/group`, () => {
    return HttpResponse.json([
      {groupid: '1', groupname: 'Guitars'},
    ]);
  })
);

it('renders group names in sidebar', async () => {
  server.use(
      requestWrapper(),
  );

  render(sideBarWrapper());

  await waitFor(() => {
    expect(screen.getByText('Guitars')).toBeInTheDocument();
  });
});

it('renders nothing when group fetch fails', async () => {
  server.use(
      http.get(`${URL}/group`, () => {
        return new HttpResponse(null, {status: 401});
      }),
  );

  render(sideBarWrapper());

  await waitFor(() => {
    expect(screen.queryByRole('button',
        {name: /guitars/i})).not.toBeInTheDocument();
  });
});

it('navigates to group on click', async () => {
  server.use(requestWrapper2());

  render(sideBarWrapper());

  await waitFor(() => screen.getByText('Guitars'));

  const user = userEvent.setup();
  await user.click(screen.getByText('Guitars'));

  expect(mockNavigate).toHaveBeenCalledWith('/group/1');
});

it('shows checkbox for current group', async () => {
  server.use(requestWrapper2());

  render(sideBarWrapper('/group/1'));

  await waitFor(() => {
    expect(screen.getByLabelText('checked')).toBeInTheDocument();
  });
});
