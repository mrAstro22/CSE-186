// Context Hooks
import {useState, useContext} from 'react';
import {mailboxContext} from '../App';

// CSS
import './Mail.css';
import './Drawer.css';

// MUI Elements
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


// Drawer: https://mui.com/material-ui/react-drawer/
/**
 * @returns {object} Returns Drawer Component
 */
function Header() {
  // State: Menu Open/Close
  const [open, setOpen] = useState(false);
  const {mailbox, setMailbox} = useContext(mailboxContext);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      className = 'drawer'
      role="presentation"
      onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Important', 'Trash'].map((text, index) => (
          <ListItem key={text} disablePadding>

            <ListItemButton
              className='mailIcons'
              onClick={() => setMailbox(text)}

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

  return (
    <Box
      className = "header"
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        border: '1px solid black',
        bgcolor: 'cyan',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <IconButton
        color="inherit"
        aria-label= {open ? 'hide mailboxes' : 'show mailboxes'}
        onClick={toggleDrawer(true)}
        edge="start"
      >
        <MenuIcon className='menu-icon'/>
      </IconButton>

      <h2>
        CSE186 Mail - {mailbox}
      </h2>

      <Drawer
        className = "app-drawer"
        open={open}
        onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

    </Box>
  );
}
export default Header;
