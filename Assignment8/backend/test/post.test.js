import {it, beforeAll,
  beforeEach, afterAll, describe, expect} from 'vitest';
import {ctx, setup, teardown} from './setup.js';

beforeAll(setup);
afterAll(teardown);

let request;
beforeEach(() => {
  request = ctx.request;
});

/*
#####################
#        Posts      #
#####################
*/
describe('Post API', () => {
  let response;
  let token;

  beforeAll(async () => {
    // Log in and store the JWT
    const res = await ctx.request
        .post('/api/v0/login')
        .send({
          email: 'molly@books.com',
          password: 'mollymember',
        });

    token = res.body.accessToken; // store token for later
  });

  beforeEach(async () => {
    response = await ctx.request.get('/api/v0/post')
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
