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

// High Level Idea:
// * Hide Certain Components for Mobile App

import mail from './model/mail.json';

// Components
import Header from './view/Header.jsx';
import EmailHandle from './view/Email.jsx';

// import MailSum from './view/MailSum.jsx';

// Passing Context over components
import {createContext, useState} from 'react';

// Top Level Context
export const inboxContext = createContext();
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
  const [mailbox, setMailbox] = useState('Inbox'); // Click
  const [email, setEmail] = useState(null);

  return (
    // Component 1: selectedMailbox
    <inboxContext.Provider value={{mailbox, setMailbox}}>
      <emailContext.Provider value = {{email, setEmail}}>
        <div>
          <Header/>
          <table
            className='mail-list'
            aria-label='mail-list'
          >
            <tbody
              className='mailbox'
            >
              {mail
                  .filter((box) => box.name === mailbox)
                  .map((box) => (
                    box.mail.map((email) => (
                      <tr
                        key={email.id}
                        className='selected-mail'
                        onClick={() => {
                          setEmail(email.id);
                          // console.log('Set Email:', email.id);
                        }}
                      >
                        {/* <td>{box.name}</td> */}
                        <td>{email.from.name}</td>
                        <td>{email.subject}</td>
                        <td>{email.received}</td>
                      </tr>
                    ))
                  ))}
            </tbody>
          </table>
        </div>
      </emailContext.Provider>
    </inboxContext.Provider>
  );
}

export default App;
