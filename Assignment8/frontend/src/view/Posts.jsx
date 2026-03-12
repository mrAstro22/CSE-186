// Context
import {useState, useEffect, useContext} from 'react';
import {LayoutContext} from '../App';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// MUI Clipped Drawer
// https://mui.com/material-ui/react-drawer/#ClippedDrawer.js


/**
 * @param {number} drawerWidth -
 * @returns {object} Mailbox List
 */
function Posts({drawerWidth, groupID}) {
  const [posts, setPosts] = useState([]);
  const {isMobile} = useContext(LayoutContext);
  const token = localStorage.getItem('accessToken'); // JWT
  const location = useLocation();
  const navigate = useNavigate();

  // All Posts if No Group Selected
  // Curr Group if Group Seleceted
  useEffect(() => {
    if (!token) return;

    const getPosts = async () => {
      let res;
      if (groupID) {
        res = await fetch(`http://localhost:3010/api/v0/group/${groupID}/post`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (location.pathname === '/post/mine') {
        res = await fetch('http://localhost:3010/api/v0/post/mine', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        res = await fetch('http://localhost:3010/api/v0/post', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (!res.ok) {
        if (groupID) navigate('/home');
        return;
      }

      // Extract Posts from Array
      const data = await res.json();
      // console.log(data);
      setPosts(groupID ? data[0].posts : data);
    };

    getPosts();
  }, [groupID, location.pathname, token]);

  return (
    <TableContainer
    //   key = {currMailbox}
      sx={{
        maxHeight: 'calc(100vh - 64px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
        ml: isMobile ? 0 : `${drawerWidth}px`,
      }}
    >
      <Toolbar />
      <Table
        aria-label='list of posts'
        sx={{tableLayout: 'fixed', width: '100%'}}
      >
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.postID}
            >
              <TableCell sx={{
                width: '20%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: isMobile ? 'normal' : 'nowrap',
              }}>
                <Box>
                  <Box sx={{fontWeight: 'bold'}}>
                    {post.username}
                  </Box>
                  <Box
                    sx={{
                      mt: 0.5,
                      lineHeight: 1.4,
                      wordBreak: 'break-word',
                      overflowWrap: 'anywhere',
                      whiteSpace: 'normal',
                    }}
                  >
                    {post.content}
                  </Box>
                </Box>
              </TableCell>

              <TableCell sx={{
                width: '20%',
                whiteSpace: 'nowrap',
                textAlign: 'right',
              }}>
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

  const time = emailDate.toLocaleTimeString(
      undefined,
      {hour: '2-digit', minute: '2-digit', hour12: false});

  if (isToday) {
    // show time only
    return time;
  } else if (isYesterday) {
    return `Yesterday @ ${time}`;
  } else if (emailDate > oneYearAgo) {
    const month = emailDate.toLocaleString('default', {month: 'short'});
    const day = String(emailDate.getDate()).padStart(2, '0'); // pad w 0
    return `${month} ${day} @ ${time}`;
  } else {
    // more than a year ago: show year
    return `${emailDate.getFullYear()}`;
  }
}

export default Posts;

Posts.propTypes = {
  drawerWidth: PropTypes.number.isRequired,
  groupID: PropTypes.string,
};
