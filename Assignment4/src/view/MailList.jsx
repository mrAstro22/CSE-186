// CSS
import './Mail.css';

// Context
import {useContext} from 'react';
import {layoutContext, mailboxContext, emailContext} from '../App';

// Data
import mail from '../model/mail.json';
import PropTypes from 'prop-types';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

/**
 * @param {object} props
 * @param props.data
 * @returns {object} Mailbox List
 */
function MailList({data=null}) {
  const {mailbox} = useContext(mailboxContext);
  const {setEmail} = useContext(emailContext);
  const {setMobileMail} = useContext(layoutContext);

  const mailboxData = data || mail;

  // CurrMailbox was generated from ChatGPT
  const currMailbox = mailboxData
      .find((box) => box.name === mailbox)?.mail
      ?.slice()
      .sort((a, b) => new Date(b.received) - new Date(a.received)) || [];

  return (
    <TableContainer
      key = {mailbox}
      sx={{
        maxHeight: 'calc(100vh - 64px)',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Table
        className='mail-list'
        aria-label='mail-list'
      >
        <TableBody>
          {currMailbox.map((email) => (
            <TableRow
              key={email.id}
              className='selected-mail'
              onClick={() => {
              // Render Email Content
                setEmail(email);
                setMobileMail(true);
              }}
            >
              {/* <td>{box.name}</td> */}
              <TableCell
                sx={{fontFamily: 'Courier New, Courier, monospace'}}
              >
                {email.from.name}</TableCell>
              <TableCell
                sx={{fontFamily: 'Courier New, Courier, monospace'}}
              >
                {email.subject}</TableCell>
              <TableCell
                sx={{fontFamily: 'Courier New, Courier, monospace'}}
              >
                {formatEmailDate(email.received)}
              </TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

MailList.propTypes = {
  data: PropTypes.array,
};

/**
 *
 * @param {object} dateStr Converted to Preferred Format
 * @returns {object} formatted Date
 */
function formatEmailDate(dateStr) {
  const emailDate = new Date(dateStr);
  const now = new Date();

  const isToday =
    emailDate.getFullYear() === now.getFullYear() &&
    emailDate.getMonth() === now.getMonth() &&
    emailDate.getDate() === now.getDate();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    emailDate.getFullYear() === yesterday.getFullYear() &&
    emailDate.getMonth() === yesterday.getMonth() &&
    emailDate.getDate() === yesterday.getDate();

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  if (isToday) {
    // show time only
    return emailDate.toLocaleTimeString(
        undefined,
        {hour: '2-digit', minute: '2-digit', hour12: false});
  } else if (isYesterday) {
    return 'Yesterday';
  } else if (emailDate > oneYearAgo) {
    // show Month and Day
    return emailDate.toLocaleDateString(
        undefined,
        {month: 'short', day: 'numeric'});
  } else {
    // more than a year ago: show year
    return emailDate.getFullYear();
  }
}

export default MailList;
