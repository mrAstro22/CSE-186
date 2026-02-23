
import {useContext} from 'react';
import {mailboxNamesContext, mailboxContext} from '../App';

// MUI Elements
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MailIcon from '@mui/icons-material/Mail';

// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;

// Drawer: https://mui.com/material-ui/react-drawer/
/**
 * @returns {object} Returns Drawer Component
 */
function SideBar() {
  // Mailbox Names
  const {mailboxes} = useContext(mailboxNamesContext);
  const {currMailbox, setMailbox} = useContext(mailboxContext);

  const DrawerList = (
    <Box sx={{width: drawerWidth,
    }}>
      {/* Spacer to push below AppBar */}
      <Toolbar/>

      <List>
        {mailboxes.map((name) => (
          <ListItem key={name} disablePadding>
            <ListItemButton
              className='mailIcons'
              onClick={() => {
                setMailbox(name);
              }}
              aria-label={name} // Aria-Label for Mailbox Type
            >
              <ListItemIcon>
                {name === currMailbox ? <MailOutlineIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        'display': {sm: 'block'},
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
