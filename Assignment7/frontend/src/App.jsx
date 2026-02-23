/*
#######################################################################
#
# Copyright (C) 2020-2025 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

// MUI
import Box from '@mui/material/Box';

// Components
import Header from './view/Header.jsx';
import SideBar from './view/SideBar.jsx';
import MailList from './view/MailList.jsx';

import {createContext, useState, useEffect} from 'react';

export const mailboxContext = createContext();
export const mailboxNamesContext = createContext();
export const mailContext = createContext();

const drawerWidth = 240;

/**
 * Simple component with no state.
 * @returns {object} JSX
 */
function App() {
  // Initialize State as Inbox
  const [currMailbox, setMailbox] = useState();
  const [mailboxes, setMailboxNames] = useState([]);
  const [mail, setMail] = useState();

  // Stores Mailbox Names
  useEffect(() => {
    fetch('http://localhost:3010/api/v0/mailbox')
        .then((res) => res.json())
        .then((data) => {
          // // Upper Case First Letter
          // const formatted = data.map(
          //     (name) => name.charAt(0).toUpperCase() + name.slice(1),
          // );
          setMailboxNames(data);
          setMailbox(data[0]);
        });
  }, []);

  useEffect(() => {
    if (currMailbox) {
      fetch(`http://localhost:3010/api/v0/mail?mailbox=${currMailbox}`)
          .then((res) => res.json())
          .then((data) => setMail(data))
          .catch((err) => console.error(err));
    }
  }, [currMailbox]);

  return (
    <mailboxContext.Provider value={{currMailbox, setMailbox}}>
      <mailboxNamesContext.Provider value={{mailboxes: mailboxes || []}}>
        <mailContext.Provider value={{mail, currMailbox}}>
          <Header />
          <SideBar />

          {/* Mail Content */}
          <Box
            sx={{
              ml: {md: `${drawerWidth}px`}, // offset for desktop drawer
              mt: '64px', // offset for AppBar height
            }}
          >
            <MailList />
          </Box>
        </mailContext.Provider>
      </mailboxNamesContext.Provider>
    </mailboxContext.Provider>
  );
}

export default App;
