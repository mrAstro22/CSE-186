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

// Components
import Header from './view/Header.jsx';
import MailList from './view/MailList.jsx';
import Email from './view/Email.jsx';

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
  // const [deviceType, setDevice] = useState('Mobile');

  return (
    // Component 1: selectedMailbox
    <mailboxContext.Provider value={{mailbox, setMailbox}}>
      <emailContext.Provider value = {{email, setEmail}}>
        {/* <Header/> */}
        <Grid container spacing={2} sx={{height: '100%'}}>

          {/* Column 1: Mailbox Selection*/}
          <Grid size={{xs: 12, md: 12}}>
            <Header/>
          </Grid>

          {/* Column 2: Email Summary*/}
          <Grid size={{xs: 12, md: 5}}
            sx={{height: '100%'}}
          >
            <MailList />
          </Grid>

          {/* Column 3: Email Content*/}
          <Grid size={{xs: 12, md: 5}}
            sx={{height: '100%', overflowY: 'auto'}}
          >
            <Email/>
          </Grid>
        </Grid>
      </emailContext.Provider>
    </mailboxContext.Provider>
  );
}

export default App;
