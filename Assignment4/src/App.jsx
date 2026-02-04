/*
#######################################################################
#
# Copyright (C) 2020-2026  David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

// MUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// Components
import Header from './view/Header.jsx';
import SideBar from './view/SideBar.jsx';
import MailList from './view/MailList.jsx';
import Email from './view/Email.jsx';

// Passing Context over components
import {createContext, useState} from 'react';

// Data
// import mail from '../model/mail.json';
import PropTypes from 'prop-types';

// Top Level Context
export const layoutContext = createContext();
export const mailboxContext = createContext('Inbox');
export const emailContext = createContext();

const drawerWidth = 240;

/**
 * Simple component with no state.
 *
 * See the basic-react from lecture for an example of adding and reacting
 * to changes in state.
/**
 * @param {object} props - App props
 * @param {Array<object>} props.initMail - Array for Mailbox
 * @returns {object} Mailbox List
 */
function App({initMail=null}) {
  // Global State of Mailbox
  // const [deviceType, setDevice] = useState('Mobile');
  // Will change based on size of screen
  const mailboxData = initMail;
  // const [currentPage, setPage] = useState('Inbox');
  const [mailbox, setMailbox] = useState('Inbox'); // Header
  const [email, setEmail] = useState(null); // MailList
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Mobile Email
  const [mobileMail, setMobileMail] = useState(false);

  return (
    // Component 1: selectedMailbox
    <layoutContext.Provider
      value={{
        drawerOpen,
        setDrawerOpen,
        drawerWidth,
        mobileMail,
        setMobileMail,
      }}>
      <mailboxContext.Provider value={{mailbox, setMailbox}}>
        <emailContext.Provider value = {{email, setEmail}}>
          {/* Fixed Header */}
          <Header/>

          {/* Sidebar Drawer */}
          <SideBar/>

          {/* Mail Content */}
          <Box
            sx={{
              ml: {md: `${drawerWidth}px`}, // offset for desktop drawer
              mt: '64px', // offset for AppBar height
            }}
          >
            <Grid
              container
              spacing={2}
              wrap="nowrap"
              sx={{height: 'calc(100vh - 64px)'}}>

              {/* Email List */}
              <Grid
                size={{
                  xs: 12,
                  md: 5,
                }}
                sx={{
                  display: {
                    xs: mobileMail ? 'none' : 'block',
                    md: 'block',
                  },
                  height: '100%',
                }}
              >
                <MailList initMail={mailboxData}/>
              </Grid>

              {/* Email Content */}
              <Grid
                size={{
                  xs: 12,
                  md: 5,
                }}
                sx={{
                  display: {
                    xs: mobileMail || email ? 'block' : 'none',
                    md: 'block',
                  },
                  height: '100%',
                  overflowY: 'auto',
                }}
              >
                <Email/>
              </Grid>
            </Grid>
          </Box>
        </emailContext.Provider>
      </mailboxContext.Provider>
    </layoutContext.Provider>
  );
}

App.propTypes = {
  initMail: PropTypes.array,
};

export default App;
