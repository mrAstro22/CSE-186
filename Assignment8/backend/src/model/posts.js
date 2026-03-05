import {pool} from './pool.js';

// SQL is very Powerful
// Easily grab data from Foreign Keys
/**
 * @returns {object} allPosts
 */
export async function retrievePosts() {
  const allPostsQuery = (`
    SELECT
        p.id AS "postID",
        u.id AS "userID",
        u.data->'user'->>'name' AS username,
        u.data->'user'->>'email' AS email,
        p.data->>'content' AS "content",
        p.data->>'date-posted' AS "date"
    FROM posts p
    JOIN users u ON u.id = p.user_id
    ORDER BY (p.data->>'date-posted')::timestamptz DESC;
  `);

  const {rows} = await pool.query(allPostsQuery);
  if (!rows) return null;

  return rows;
}
