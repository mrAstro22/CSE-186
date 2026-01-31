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
import MailList from './view/MailList.jsx';

// Passing Context over components
import {createContext, useState} from 'react';

// Top Level Context
export const mailboxContext = createContext('Inbox');
export const emailContext = createContext();

/**
 * Simple component with no state.
 *
 * See the basic-react from lecture for an example of adding and reacting
 * to changes in state.
 * @returns {object} JSX
 */
function App() {
  // Global State of Mailbox
  // const [deviceType, setDevice] = useState('Mobile');
  // Will change based on size of screen

  // const [currentPage, setPage] = useState('Inbox');
  const [mailbox, setMailbox] = useState('Inbox'); // Header
  const [email, setEmail] = useState(null); // MailList

  return (
    // Component 1: selectedMailbox
    <mailboxContext.Provider value={{mailbox, setMailbox}}>
      <emailContext.Provider value = {{email, setEmail}}>
        <Header/>
        <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
         <Grid
              item
              xs={12}        // full width on mobile
              md={4}         // 4/12 width on desktop
            >
              <MailList />
            </Grid>

            {/* Full email view */}
            <Grid
              item
              xs={12}        // full width on mobile
              md={8}         // 8/12 width on desktop
            >
              {/* Only render full email if one is selected */}
              {email && <MailList showEmail />}
            </Grid>
          </Grid>
        </Box>
      </emailContext.Provider>
    </mailboxContext.Provider>
  );
}

export default App;
