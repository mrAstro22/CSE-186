// CSS
import './Mail.css';

// Context
import {useContext} from 'react';
import {mailboxContext} from '../App';
import {emailContext} from '../App';

// Data
import mail from '../model/mail.json';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

/**
 * @returns {object} Mailbox List
 */
function MailList() {
  const {mailbox} = useContext(mailboxContext);
  const {email, setEmail} = useContext(emailContext);

  // CurrMailbox was generated from ChatGPT
  const currMailbox = mail
      .find((box) => box.name === mailbox)?.mail
      ?.slice()
      .sort((a, b) => new Date(b.received) - new Date(a.received)) || [];

  return (
    <>
      <Table
        className='mail-list'
        aria-label='mail-list'
      >
        <TableBody className='mailbox' >
          {currMailbox.map((email) => (
            <TableRow
              key={email.id}
              className='selected-mail'
              onClick={() => {
                // Render Email Content
                setEmail(email);
              }}
            >
              {/* <td>{box.name}</td> */}
              <TableCell>{email.from.name}</TableCell>
              <TableCell>{email.subject}</TableCell>
              <TableCell>
                {new Date(email.received).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>

      {email && (
        <Table>
          <TableBody>
            <TableRow key={email.id} className='emailElements'>
              <TableCell>
                From: {email.from.name} {email.from.address}</TableCell>
              <TableCell>To: {email.to.name} {email.to.address}</TableCell>
              <TableCell>Recieved:
                {new Date(email.received).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}</TableCell>

              <TableCell>{email.subject}</TableCell>

              <TableCell>{email.content}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </>
  );
}

export default MailList;
