// Context
import {useState, useEffect, useContext} from 'react';
import {LayoutContext} from '../App';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Toolbar from '@mui/material/Toolbar';

// MUI Clipped Drawer
// https://mui.com/material-ui/react-drawer/#ClippedDrawer.js

/**
 * @returns {object} Mailbox List
 */
function Posts() {
  const [posts, setPosts] = useState([]);
  const {isMobile, drawerWidth} = useContext(LayoutContext);

  const token = localStorage.getItem('accessToken'); // JWT
  console.log(token); // your JWT
  const fetchPosts = async () => {
    const res = await fetch('http://localhost:3010/api/v0/post', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error('Request failed:', res.status);
      return [];
    }

    return res.json();
  };

  // Later it will update based on what group we render
  useEffect(() => {
    if (!token) return;

    const getPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };

    getPosts();
  }, [token]);

  return (
    <TableContainer
    //   key = {currMailbox}
      sx={{
        maxHeight: 'calc(100vh - 64px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        ml: isMobile ? 0 : `${drawerWidth}px`,
      }}
    >
      <Toolbar />
      <Table
        aria-label='list of posts'
      >
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.postID}
            >
              <TableCell>
                {post.username}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Courier New, Courier',
                  fontWeight: 'Bold',
                  wordBreak: 'break-word',
                  whiteSpace: 'normal',
                  maxWidth: 200,
                }}>
                {post.content}
              </TableCell>
              <TableCell>
                {formatEmailDate(post.date)}
              </TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/**
 *
 * @param {object} dateStr Converted to Preferred Format
 * @returns {object} formatted Date
 */
function formatEmailDate(dateStr) {
  const emailDate = new Date(dateStr);
  const now = new Date();

  const isToday =
    emailDate.getFullYear() === now.getFullYear() &&
    emailDate.getMonth() === now.getMonth() &&
    emailDate.getDate() === now.getDate();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    emailDate.getFullYear() === yesterday.getFullYear() &&
    emailDate.getMonth() === yesterday.getMonth() &&
    emailDate.getDate() === yesterday.getDate();

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  if (isToday) {
    // show time only
    return emailDate.toLocaleTimeString(
        undefined,
        {hour: '2-digit', minute: '2-digit', hour12: false});
  } else if (isYesterday) {
    return 'Yesterday';
  } else if (emailDate > oneYearAgo) {
    const month = emailDate.toLocaleString('default', {month: 'short'});
    const day = String(emailDate.getDate()).padStart(2, '0'); // pad w 0
    return `${month} ${day}`;
  } else {
    // more than a year ago: show year
    return emailDate.getFullYear();
  }
}

export default Posts;
