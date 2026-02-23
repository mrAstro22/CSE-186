// MUI Elements
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Context Hooks
import {useContext} from 'react';
import {mailboxContext} from '../App';

/**
 * @returns {object} Returns Header Component
 */
function Header() {
  const {currMailbox} = useContext(mailboxContext);

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
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          CSE 186 Full Stack Mail - {currMailbox}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

