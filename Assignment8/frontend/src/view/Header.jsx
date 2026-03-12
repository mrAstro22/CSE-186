// MUI Elements
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

// React Stuff
import {useNavigate} from 'react-router-dom';

// Context Hooks
import {useContext} from 'react';
import {LayoutContext} from '../App';

/**
 * @returns {object} Returns Header Component
 */
function Header() {
  const {drawerOpen, setDrawerOpen, setView} = useContext(LayoutContext);
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
      <Toolbar sx={{position: 'relative'}}>
        {/* Menu Button: Mobile Only*/}

        {/* Normal Mail View*/}
        <IconButton
          color="inherit"
          aria-label= {drawerOpen ? 'hide groups' : 'show groups'}
          onClick={() => setDrawerOpen((prev) => !prev)}
          edge="start"
          sx={{display: {md: 'none'}}}
        >
          <MenuIcon
            className='menu-icon'
            aria-label = 'menu-icon'
          />
        </IconButton>

        <IconButton
          aria-label= "go-home"
          onClick={() => {
            setView('all');
            navigate('/home');
          }}
          sx={{mr: 2, ml: -1}}>
          <Box
            component="img"
            src="/src/view/meowlAvatar.jpg"
            alt="Avatar"
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
            }}
          />
        </IconButton>

        <Box sx={{flexGrow: 1}}/> {/* Spacer*/}


        <Typography variant="h5" component="div"
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontWeight: 'bold',
            fontStyle: 'italic',
            // textDecoration: 'underline',
          }}>
          {`Welcome to MeowlChat`}
        </Typography>

        {/* LogOut Button */}
        <IconButton
          aria-label = 'logout'
          onClick={() => {
            setView('all');
            navigate('/login');
          }}
          sx={{p: 0.8}}
        >
          <LogoutIcon
            sx={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              ml: 'auto',
            }}/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
