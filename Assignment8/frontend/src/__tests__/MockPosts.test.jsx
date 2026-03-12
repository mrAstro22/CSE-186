import {render, screen, waitFor,
  http, HttpResponse,
  server, URL, mockContext, mockNavigate} from './testHelpers';

import {it, expect, vi} from 'vitest';
import Posts from '../view/Posts';
import {LayoutContext} from '../App';
import {MemoryRouter} from 'react-router-dom';

vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('fake-token');

const postsWrapper = (groupID = undefined) => (
  <MemoryRouter>
    <LayoutContext.Provider value={mockContext}>
      <Posts drawerWidth={240} groupID={groupID} />
    </LayoutContext.Provider>
  </MemoryRouter>
);

const mockPosts = [
  {postID: '1',
    username: 'Aye Astro',
    content: 'Hello World',
    date: '2022-01-01T00:00:00.000Z'},
  {postID: '2',
    username: 'Molly Maze',
    content: 'Electric Guitar',
    date: '2022-01-01T00:00:00.000Z'},
];

// This one was pure formatting
// Claude Generated this specific test
// it('wraps username on mobile', async () => {
//   server.use(
//       http.get(`${URL}/post`, () => HttpResponse.json(mockPosts)),
//   );

//   render(
//       <MemoryRouter>
//         <LayoutContext.Provider value={{...mockContext, isMobile: true}}>
//           <Posts drawerWidth={240} />
//         </LayoutContext.Provider>
//       </MemoryRouter>,
//   );

//   await waitFor(() => {
//     expect(screen.getByText('Aye Astro')).toHaveStyle('white-space: normal');
//   });
// });

it('does not fetch posts when no token', async () => {
  vi.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);

  const fetchSpy = vi.spyOn(window, 'fetch');

  render(postsWrapper());

  await waitFor(() => {
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

it('renders all posts when no group selected', async () => {
  server.use(
      http.get(`${URL}/post`, () => {
        return HttpResponse.json(mockPosts);
      }),
  );

  render(postsWrapper());

  await waitFor(() => {
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});

it('renders group posts when groupID provided', async () => {
  server.use(
      http.get(`${URL}/group/abc-123/post`, () => {
        return HttpResponse.json([{groupID: 'abc-123', posts: mockPosts}]);
      }),
  );

  render(postsWrapper('abc-123'));

  await waitFor(() => {
    expect(screen.getByText('Electric Guitar')).toBeInTheDocument();
  });
});

it('renders nothing when fetch fails', async () => {
  server.use(
      http.get(`${URL}/post`, () => {
        return new HttpResponse(null, {status: 401});
      }),
  );

  render(postsWrapper());

  await waitFor(() => {
    expect(screen.queryByText('Hello World')).not.toBeInTheDocument();
  });
});

it('navigates home on invalid groupID', async () => {
  server.use(
      http.get(`${URL}/group/bad-id/post`, () => {
        return new HttpResponse(null, {status: 404});
      }),
  );

  render(postsWrapper('bad-id'));

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });
});

// Use Known Post Data
const makePost = (date) => ([
  {postID: '1', username: 'Aye Astro', content: 'Test Post', date},
]);

// Render Date
const renderWithDate = async (date) => {
  server.use(
      http.get(`${URL}/post`, () =>
        HttpResponse.json(makePost(date)),
      ),
  );
  render(postsWrapper());
  await waitFor(() => screen.getByText('Test Post'));
};

// Instead of Hardcoding dates
// Make it render time the way our Program does
it('formats today as time', async () => {
  await renderWithDate(new Date().toISOString());
  expect(screen.getByText(/^\d{2}:\d{2}$/)).toBeInTheDocument();
});

// it('formats yesterday as Yesterday', async () => {
//   const d = new Date();
//   d.setDate(d.getDate() - 1);
//   await renderWithDate(d.toISOString());
//   expect(screen.getByText('yesterday')).toBeInTheDocument();
// });

// it('formats recent date as Mon DD', async () => {
//   const d = new Date();
//   d.setMonth(d.getMonth() - 2);
//   await renderWithDate(d.toISOString());
//   expect(screen.getByText(/^[A-Z][a-z]{2} \d{2}$/)).toBeInTheDocument();
// });

it('formats old date as year', async () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 2);
  await renderWithDate(d.toISOString());
  expect(screen.getByText(String(d.getFullYear()))).toBeInTheDocument();
});
