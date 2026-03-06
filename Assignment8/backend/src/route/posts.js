// This will be used when we get into requests for the app
import * as postsModel from '../model/posts.js';

/**
 *
 * @param {string} req - not used
 * @param {string} res - status
 * @returns {object} all Posts
 */
export async function getAll(req, res) {
  const user = await req.user; // from check middleware
  const posts = await postsModel.retrievePosts(user.id);
  return res.status(200).json(posts);
}

/**
 *
 * @param {string} req - userID
 * @param {string} res - Status Code
 * @returns {string} - currUserPosts
 */
export async function getMyPosts(req, res) {
  const userID =
  (await req.user).id; // req.user is retrieved from middleware
  const posts = await postsModel.retrievePosts(userID);

  return res.status(200).json(posts);
}

/**
 *
 * @param {string} req - no used
 * @param {string} res - Status Code
 * @returns {string} - All Group Names, ID, Desc
 */
export async function getGroups(req, res) {
  const groups = await postsModel.retrieveGroups();

  return res.status(200).json(groups);
}

/**
 *
 * @param {string} req - Group UUID
 * @param {string} res - Status Code
 * @returns {object} - All Posts from Named Group
 */
export async function getGroupPosts(req, res) {
  const {groupID} = req.params;
  const posts = await postsModel.retrieveGroupPosts(groupID);

  console.log(posts);

  return res.status(200).json([{
    groupID,
    posts
  }]);
}
