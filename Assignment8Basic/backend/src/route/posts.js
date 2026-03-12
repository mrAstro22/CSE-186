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
 * @param {string} req - User UUID
 * @param {string} res - Status Code
 * @returns {string} - Groups they are a part of
 */
export async function getGroups(req, res) {
  const userID = (await req.user).id;
  const groups = await postsModel.retrieveGroups(userID);

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
  const userID = (await req.user).id;
  const posts = await postsModel.retrieveGroupPosts(groupID, userID);

  // console.log(posts);

  return res.status(200).json([{
    groupID,
    posts,
  }]);
}
