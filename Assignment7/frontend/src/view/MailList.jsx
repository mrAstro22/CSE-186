// Context
import {useContext} from 'react';
import {mailboxContext, mailContext} from '../App';
import PropTypes from 'prop-types';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

// MUI Clipped Drawer
// https://mui.com/material-ui/react-drawer/#ClippedDrawer.js

/**
 * @param {(id: string) => void} moveToTrash - PUT into Trash Mailbox
 * @returns {object} Mailbox List
 */
function MailList({moveToTrash}) {
  const {currMailbox} = useContext(mailboxContext);
  const {mail} = useContext(mailContext);

  // SortedMail was generated from ChatGPT
  const mailboxData = mail?.find((box) => box.name === currMailbox);
  const sortedMail = mailboxData?.mail?.slice()
      .sort((a, b) => new Date(b.received) - new Date(a.received)) || [];


  return (
    <TableContainer
      key = {currMailbox}
      sx={{
        maxHeight: 'calc(100vh - 64px)',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Table
        aria-label='list of mail'
      >
        <TableBody>
          {sortedMail.map((email) => (
            <TableRow
              key={email.id}
            >
              <TableCell>
                {currMailbox !== 'trash' && (
                  <IconButton
                    aria-label={
                    currMailbox === 'inbox' ?
                   `Delete mail from ${email.from.name}` +
                  ` received ${formatEmailDate(email.received)}` :
                  currMailbox === 'sent' ?
                   `Delete mail to ${email.to.name}` +
                  ` sent ${formatEmailDate(email.received)}` :
                  ''
                    }
                    onClick={async () => {
                      // Handle Delete Email
                      // console.log(`Delete email with id: ${email.id}`);
                      moveToTrash(email.id);
                    }}
                  >
                    <DeleteIcon
                      sx={{cursor: 'pointer'}}
                    />
                  </IconButton>)}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Courier New, Courier',
                  fontWeight: 'Bold',
                }}>
                {currMailbox === 'inbox' ? email.from.name :
                currMailbox === 'sent' ? email.to.name :
                currMailbox === 'trash' ?
                    `${email.from.name} to ${email.to.name}`:
                    null}
              </TableCell>
              <TableCell
                sx={{fontFamily: 'Courier New, Courier'}}
              >
                {email.subject.trim()}</TableCell>
              <TableCell
                sx={{fontFamily: 'Courier New, Courier'}}
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
    const month = emailDate.toLocaleString('default', {month: 'short'});
    const day = String(emailDate.getDate()).padStart(2, '0'); // pad w 0
    return `${month} ${day}`;
  } else {
    // more than a year ago: show year
    return emailDate.getFullYear();
  }
}

export default MailList;

MailList.propTypes = {
  moveToTrash: PropTypes.func.isRequired,
};
