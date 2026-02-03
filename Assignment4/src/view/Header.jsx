// Context Hooks
import {useContext} from 'react';
import {emailContext, layoutContext, mailboxContext} from '../App';

// CSS
// import './Mail.css';
import './Drawer.css';

// MUI Elements
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

/**
 * @returns {object} Returns Drawer Component
 */
function Header() {
  // Context: Set Mailbox Type
  // Context: Set as Open/Close
  const {mailbox} = useContext(mailboxContext);
  const {setEmail} = useContext(emailContext);
  const {drawerOpen, setDrawerOpen, mobileMail, setMobileMail} =
  useContext(layoutContext);


  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'green',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>

        {/* Menu Button: Mobile Only*/}

        {/* Normal Mail View*/}
        <IconButton
          color="inherit"
          aria-label= {drawerOpen ? 'hide mailboxes' : 'show mailboxes'}
          onClick={() => setDrawerOpen((prev) => !prev)}
          edge="start"
          sx={{display: {md: 'none'}}}
        >
          <MenuIcon className='menu-icon'/>
        </IconButton>

        <Typography
          sx={{
            color: 'black',
            ml: '10px',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
        CSE186 Mail - {mailbox}
        </Typography>

        {/* Get X Ready for Exit*/}
        {mobileMail && (
          <IconButton
            color="inherit"
            aria-label = "close"
            onClick={() => {
              setMobileMail(false);
              setEmail(null);
            }}
            sx={{
              display: {md: 'none'},
              ml: 'auto',
            }}
          >
            <CloseIcon className='close-icon'/>
          </IconButton>
        )}
      </Toolbar>

    </AppBar>
  );
}
export default Header;
