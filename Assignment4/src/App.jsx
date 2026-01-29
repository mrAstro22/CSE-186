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

import mail from './model/mail.json';

/**
 * Simple component with no state.
 *
 * See the basic-react from lecture for an example of adding and reacting
 * to changes in state.
 * @returns {object} JSX
 */
function App() {
  return (
    <div>
      <h2>Let&apos;s make this look way better with Material-UI, eh?</h2>
      <table>
        <tbody>
          {mail.map((mailbox) => (
            mailbox.mail.map((email) => (
              <tr key={email.id}>
                <td>{mailbox.name}</td>
                <td>{email.from.name}</td>
                <td>{email.subject}</td>
                <td>{email.received}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
