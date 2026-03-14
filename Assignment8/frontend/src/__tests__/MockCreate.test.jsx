import {render, screen, waitFor, http,
  HttpResponse, server, URL, userEvent} from './testHelpers';
import {it, expect, beforeEach} from 'vitest';
import {LayoutContext} from '../App';
import {MemoryRouter, Routes, Route} from 'react-router-dom';
import {mockContext, mockNavigate} from './testHelpers';
import Create from '../view/Create';
import {fireEvent} from '@testing-library/react';

const createWrapper = () => (
  <MemoryRouter>
    <LayoutContext.Provider value={mockContext}>
      <Routes>
        <Route path="*" element={<Create drawerWidth={240} />} />
      </Routes>
    </LayoutContext.Provider>
  </MemoryRouter>
);

beforeEach(() => {
  server.use(
      http.post(`${URL}/post`,
          () => HttpResponse.json({postID: '1'}, {status: 201})),
  );
});

it('renders content field', () => {
  render(createWrapper());
  expect(screen.getByLabelText('contentField')).toBeInTheDocument();
});

it('publicSwitch default false', async () => {
  render(createWrapper());
  const toggle = screen.getByRole('checkbox', {name: 'controlled'});
  expect(toggle).not.toBeChecked();
});

it('toggles public switch', async () => {
  render(createWrapper());
  const toggle = screen.getByRole('checkbox', {name: 'controlled'});
  await userEvent.click(toggle);
  expect(toggle).toBeChecked();
});

it('submits post and navigates home', async () => {
  render(createWrapper());
  await userEvent.type(screen.getByLabelText('contentField'), 'Hello World');
  await userEvent.click(screen.getByRole('button', {name: /create post/i}));
  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });
});

it('submits post with no group', async () => {
  let body;
  server.use(
      http.post(`${URL}/post`, async ({request}) => {
        body = await request.json();
        return HttpResponse.json({postID: '1'}, {status: 201});
      }),
  );

  render(createWrapper());
  await userEvent.type(screen.getByLabelText('contentField'), 'Hello World');
  await userEvent.click(screen.getByRole('button', {name: /create post/i}));

  await waitFor(() => {
    expect(body.groupID).toBeNull();
  });
});

it('types content into field', async () => {
  render(createWrapper());
  const field = screen.getByLabelText('contentField').querySelector('input');
  await userEvent.type(field, 'Hello World');
  expect(field).toHaveValue('Hello World');
});

it('renders group dropdown with groups from context', async () => {
  render(createWrapper());
  fireEvent.mouseDown(screen.getByRole('combobox'));
  expect(screen.getByText('Guitars')).toBeInTheDocument();
});

it('selects a group from dropdown', async () => {
  render(createWrapper());
  fireEvent.mouseDown(screen.getByRole('combobox'));
  await userEvent.click(screen.getByText('Guitars'));
  expect(screen.getByRole('combobox')).toHaveTextContent('Guitars');
});
