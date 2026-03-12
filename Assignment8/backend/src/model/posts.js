import {pool} from './pool.js';

/**
 * Retrieve posts that are either public or belong to the curr user
 * @param {string} userID - current logged-in user's ID
 * @returns {object} filtered posts
 */
export async function retrievePosts(userID) {
  const postsQuery = `
    SELECT
        p.postid AS "postID",
        u.id AS "userID",
        u.data->'user'->>'name' AS username,
        u.data->'user'->>'email' AS email,
        p.data->>'content' AS "content",
        p.data->>'date-posted' AS "date",
        (p.data->>'ispublic')::boolean AS "isPublic"
    FROM posts p
    JOIN users u ON u.id = p.userid
    WHERE (p.data->>'ispublic')::boolean = true
       OR u.id = $1
    ORDER BY (p.data->>'date-posted')::timestamptz DESC;
  `;

  const {rows} = await pool.query(postsQuery, [userID]);
  return rows;
}

/**
 * Grabs Groups they are in
 * @param {string} userID - Current User UUID
 * @returns {object} User's Groups
 */
export async function retrieveMyPosts(userID) {
  const query = `
    SELECT
        p.postid AS "postID",
        u.id AS "userID",
        u.data->'user'->>'name' AS username,
        u.data->'user'->>'email' AS email,
        p.data->>'content' AS "content",
        p.data->>'date-posted' AS "date",
        (p.data->>'ispublic')::boolean AS "isPublic"
    FROM posts p
    JOIN users u ON u.id = p.userid
    WHERE p.userid = $1
    ORDER BY (p.data->>'date-posted')::timestamptz DESC;
  `;

  const {rows} = await pool.query(query, [userID]);
  return rows;
}

/**
 * Grabs Groups they are in
 * @param {string} userID - User UUID
 * @returns {object} User's Groups
 */
export async function retrieveGroups(userID) {
  const result = await pool.query(`
    SELECT
      g.groupid,
      g.data->>'groupname' AS groupname,
      g.data->>'description' AS description
    FROM groups g
    INNER JOIN grouproles gr ON gr.groupid = g.groupid
    WHERE gr.userid = $1
      AND gr.data->>'role' IN ('member', 'owner');
  `, [userID]);
  return result.rows;
}

/**
 *
 * @param {string} groupID - Group UUID
 * @param {string} userID - User UUID
 * @returns {object} Group Posts
 */
export async function retrieveGroupPosts(groupID, userID) {
  const query = `
    SELECT
      p.postid AS "postID",
      p.userid AS "userID",
      u.data->'user'->>'name' AS "username",
      u.data->'user'->>'email' AS "email",
      p.data->>'content' AS "content",
      p.data->>'date-posted' AS "date",
      (p.data->>'ispublic')::boolean AS "isPublic"
    FROM posts p
    JOIN users u ON p.userid = u.id
    WHERE p.groupid = $1
    AND (
      (p.data->>'ispublic')::boolean = true
      OR p.userid = $2
    )    
    ORDER BY (p.data->>'date-posted')::timestamptz DESC;
  `;

  const result = await pool.query(query, [groupID, userID]);
  return result.rows;
}

/**
 *
 * @param {string} userID - User UUID
 * @param {string} groupID - Group UUID
 * @param {string} content - Post Content
 * @param {boolean} isPublic - Public/Private
 * @returns {object} full Post Data
 */
export async function createPost(userID, groupID = null, content, isPublic) {
  const query = `
    INSERT INTO posts (userid, groupid, data)
    VALUES ($1, $2, json_build_object(
      'content', $3::text,
      'date-posted', NOW()::timestamptz,
      'ispublic', $4::boolean
    ))
    RETURNING postID
  `;

  const values = [userID, groupID || null, content, isPublic];

  const {rows} = await pool.query(query, values);
  const postID = rows[0].postid;

  console.log('First Query Done');
  // Select Newly Created Post and Fill With Info
  const postQuery = `
    SELECT
        p.postid AS "postID",
        u.id AS "userID",
        u.data->'user'->>'name' AS username,
        u.data->'user'->>'email' AS email,
        p.data->>'content' AS "content",
        p.data->>'date-posted' AS "date",
        (p.data->>'ispublic')::boolean AS "isPublic"
    FROM posts p
    JOIN users u ON u.id = p.userid
    WHERE p.postid = $1
    ORDER BY (p.data->>'date-posted')::timestamptz DESC;
  `;
  console.log('Second Query Done');

  const {rows: postRows} = await pool.query(postQuery, [postID]);
  console.log(postRows[0]);
  return postRows[0];
}
