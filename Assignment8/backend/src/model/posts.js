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
