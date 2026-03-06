
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import {Component} from 'react';

// Context Hooks
import {useContext, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {LayoutContext} from '../App';

/**
 * @returns {Component} Drawer
 */
function SideBar() {
  const {
    drawerOpen,
    setDrawerOpen,
    drawerWidth,
    isMobile,
  } = useContext(LayoutContext);
  const [groupNames, setGroupNames] = useState([]);
  const token = localStorage.getItem('accessToken'); // JWT
  const navigate = useNavigate();
  const {groupID} = useParams();

  // GET Users Group Names
  useEffect(() => {
    fetch('http://localhost:3010/api/v0/group', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
        .then((res) => {
          if (!res.ok) {
            console.error('Request failed:', res.status);
            return [];
          }
          return res.json();
        })

        .then((data) => setGroupNames(data))
        .catch((err) => console.error(err));
  }, []);

  // useEffect(() => {
  //   console.log(currGroup);
  // }, [currGroup]);
  // Implementing Groups
  const DrawerList = (
    <Box sx={{width: drawerWidth}}>
      <Toolbar /> {/* Push content below AppBar */}
      <List>
        {groupNames.map((group) => (
          <ListItem key={group.groupid} disablePadding>
            <ListItemButton
              onClick={() => {
                setDrawerOpen(false);
                navigate(`/group/${group.groupid}`);
              }}
            >
              {/* Conditional Rendering*/}
              {groupID === group.groupid ? <CheckBoxIcon />:
              <CheckBoxOutlineBlankIcon/>}
              <ListItemText primary={group.groupname} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
}

export default SideBar;
