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
  const formatted = capitalize(currMailbox);

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
          {`CSE186 Full Stack Mail - ${formatted}`}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

// Source - https://stackoverflow.com/a/1026087
// Posted by Steve Harrison,
// modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-23, License - CC BY-SA 4.0

/**
 *
 * @param {string} val - currMailbox
 * @returns {string} capitalized Mailbox
 */
function capitalize(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

