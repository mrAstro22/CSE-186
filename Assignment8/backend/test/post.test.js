import {it, beforeAll,
  beforeEach, afterAll, describe, expect} from 'vitest';
import supertest from 'supertest';
// import {pool} from '../src/model/pool.js';
// import * as postModel from '../src/model/posts.js';

import * as db from './db.js';
import server from '../src/app.js';

let request;
beforeAll(() => {
//   server = http.createServer(app);
  server.listen();
  request = supertest(server);
  return db.reset();
});

afterAll(async () => {
  db.close();
  await server.close();
});

/*
#####################
#        Posts      #
#####################
*/
describe('Post API', () => {
  let token;
  let response;

  beforeAll(async () => {
    request = supertest(server);

    // Log in and store the JWT
    const res = await request
        .post('/api/v0/login')
        .send({
          email: 'molly@books.com',
          password: 'mollymember',
        });

    token = res.body.accessToken; // store token for later
  });

  beforeEach(async () => {
    response = await request.get('/api/v0/post')
        .set('Authorization', `Bearer ${token}`);
  });

  it('Bad Token: Forbidden', async () => {
    await request.get('/api/v0/post')
        .set('Authorization', `Bearer 123`)
        .expect(403);
  });

  it('401 Invalid Credentials', async () => {
    await request.get('/api/v0/post')
        .expect(401);
  });

  it('200 Success', () => {
    expect(response.status).toBe(200);
  });

  it('Expect Post Array', async () => {
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Expect Post Body', async () => {
    expect(response.body.length).toBeGreaterThan(0); // there is at least 1 post
  });

  it('Expect Post ID', async () => {
    expect(response.body[0]).toHaveProperty('postID');
  });

  it('Expect Post Content', async () => {
    expect(response.body[0]).toHaveProperty('content');
  });
});

// describe('retrievePosts', () => {
//   let mockQuery;

//   afterEach(() => {
//     // Restore after each test so no pollution
//     mockQuery?.mockRestore();
//   });

//   it('returns null when no posts exist', async () => {
//     mockQuery = vi.spyOn(pool, 'query').mockResolvedValue({rows: []});

//     const posts = await postModel.retrievePosts();

//     expect(posts).toBeNull();
//   });

//   it('returns rows when posts exist', async () => {
//     const fakeRows =
//     [{postID: '1', content: 'Hello world', username: 'Aye Astro'}];
//     mockQuery = vi.spyOn(pool, 'query').mockResolvedValue({rows: fakeRows});

//     const posts = await postModel.retrievePosts();

//     expect(posts).toEqual(fakeRows);
//   });
// });
