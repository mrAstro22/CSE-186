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

  // GET Mailbox Names
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

  // GET Curr Mailbox List
  useEffect(() => {
    if (currMailbox) {
      fetch(`http://localhost:3010/api/v0/mail?mailbox=${currMailbox}`)
          .then((res) => res.json())
          .then((data) => setMail(data))
          .catch((err) => console.error(err));
    }
  }, [currMailbox]);

  /**
   *
   * @param {string} deleteID - email.id
   */
  const moveToTrash = async (deleteID) => {
    await fetch(`http://localhost:3010/api/v0/mail/${deleteID}?mailbox=trash`, {
      method: 'PUT',
    });
    // Grab CurrMailbox Data
    const res = await fetch(
        `http://localhost:3010/api/v0/mail?mailbox=${currMailbox}`,
    );
    const data = await res.json();
    setMail(data);
  };

  return (
    <mailboxContext.Provider value={{currMailbox, setMailbox}}>
      <mailboxNamesContext.Provider value={{mailboxes: mailboxes || []}}>
        <mailContext.Provider value={{mail, currMailbox, moveToTrash}}>
          <Header />
          <SideBar />

          {/* Mail Content */}
          <Box
            sx={{
              ml: {md: `${drawerWidth}px`}, // offset for desktop drawer
              mt: '64px', // offset for AppBar height
            }}
          >
            <MailList moveToTrash={moveToTrash}/>
          </Box>
        </mailContext.Provider>
      </mailboxNamesContext.Provider>
    </mailboxContext.Provider>
  );
}

export default App;
