// This will be used when we get into requests for the app
import * as postsModel from '../model/posts.js';

/**
 *
 * @param {string} req - not used
 * @param {string} res - status
 * @returns {object} all Posts
 */
export async function getAll(req, res) {
  const posts = await postsModel.retrievePosts();
  console.log('Raw posts from DB:', posts);
  if (!posts) {
    return res.status(404).json({posts: []});
  }

  // Wrap the array in an object to satisfy OpenAPI
  console.log('Raw posts from DB:', {posts});
  return res.status(200).json({posts});
}
