// Context Hooks
import {useContext} from 'react';
import {layoutContext, mailboxContext} from '../App';

// CSS
// import './Mail.css';
import './Drawer.css';

// MUI Elements
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';

// Drawer: https://mui.com/material-ui/react-drawer/
/**
 * @returns {object} Returns Drawer Component
 */
function SideBar() {
  // State: Menu Open/Close
  const {setMailbox} = useContext(mailboxContext);
  const {drawerOpen, setDrawerOpen, drawerWidth} = useContext(layoutContext);

  const DrawerList = (
    <Box sx={{width: drawerWidth}}>
      {/* Spacer to push below AppBar */}
      <Toolbar />

      <List>
        {['Inbox', 'Important', 'Trash'].map((text, index) => (
          <ListItem key={text} disablePadding>

            <ListItemButton
              className='mailIcons'
              onClick={() => {
                setMailbox(text);
                setDrawerOpen(false); // Close Drawer
              }}
            >
              <ListItemIcon>
                {index === 0 ? <InboxIcon /> :
                index === 1 ? <MailIcon /> :
                index === 2 ? <DeleteIcon /> :
                <InboxIcon />
                }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  {/* https://mui.com/material-ui/react-drawer/#ClippedDrawer.js */}

  return (
    <>
      {/* Mobile Drawer*/}
      <Drawer
        className = "app-drawer"
        variant='temporary'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          'display': {xs: 'block', md: 'none'},
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {DrawerList}
      </Drawer>

      {/* Desktop Drawer*/}
      <Drawer
        variant="permanent"
        open
        sx={{
          'display': {xs: 'none', sm: 'block'},
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
export default SideBar;
