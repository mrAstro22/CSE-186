
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import DeleteIcon from '@mui/icons-material/Delete';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

// Context Hooks
import {useContext} from 'react';
import {DrawerContext} from '../App';

/**
 *
 */
function SideBar() {
  const {drawerOpen, setDrawerOpen, drawerWidth} = useContext(DrawerContext);

  // Chat Generated, knows when we are in Mobile or Not
  const theme = useTheme();
  const isMobile =
  useMediaQuery(theme.breakpoints.down('md')); // true for mobile


  // Implementing Groups
  //   const DrawerList = (
  //     <Box sx={{ width: drawerWidth }}>
  //       <Toolbar /> {/* Push content below AppBar */}
  //       <List>
  //         {mailboxes.map((mb) => (
  //           <ListItem key={mb.name} disablePadding>
  //             <ListItemButton
  //               onClick={() => {
  //                 setMailbox(mb.name);
  //                 setDrawerOpen(false);
  //               }}
  //             >
  //               <ListItemIcon>{mb.icon}</ListItemIcon>
  //               <ListItemText primary={mb.name} />
  //             </ListItemButton>
  //           </ListItem>
  //         ))}
  //       </List>
  //     </Box>
  //   );

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
      {/* {DrawerList} */}
    </Drawer>
  );
}

export default SideBar;
