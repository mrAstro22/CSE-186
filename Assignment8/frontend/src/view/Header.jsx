// MUI Elements
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

// React Stuff
import {useNavigate} from 'react-router-dom';

// Context Hooks
import {useContext} from 'react';
import {drawerContext} from '../App';

/**
 * @returns {object} Returns Header Component
 */
function Header() {
  const {drawerOpen, setDrawerOpen} = useContext(drawerContext);
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'green',
        // Renders drawer under Header
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
          <MenuIcon
            className='menu-icon'
            aria-label = 'menu-icon'
          />
        </IconButton>

        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          {`MeowlChat`}
        </Typography>

        {/* LogOut Button */}
        <IconButton
          aria-label = 'logout'
          onClick={() => navigate('/login')}
          sx={{p: 0.8}}
        >
          <Box component="img"
            src="src/view/meowlAvatar.jpg"
            alt="Avatar"
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              ml: 'auto',
            }}
          />
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}

export default Header;
