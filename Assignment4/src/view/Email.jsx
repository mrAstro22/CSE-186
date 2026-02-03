// import PropTypes from 'prop-types';
import {useContext} from 'react';
import {emailContext} from '../App';

/**
 * @returns {object} Email Content
 */
function Email() {
  const {email} = useContext(emailContext);

  if (!email) {
    return;
  }

  return (
    <div key={email.id} className='emailElements'>
      <p>From: {email.from.name} {email.from.address}</p>
      <p>To: {email.to.name} {email.to.address}</p>
      <p>Recieved: {formatEmail(email.received)}</p>
      <br/>
      <p>{email.subject}</p>
      <br/>
      <p>{email.content}</p>
    </div>
  );
}

// Email.propTypes = {
//   email: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     from: PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       address: PropTypes.string.isRequired,
//     }).isRequired,
//     to: PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       address: PropTypes.string.isRequired,
//     }).isRequired,
//     received: PropTypes.string.isRequired,
//     subject: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//   }).isRequired,
// };

/**
 *
 * @param {object} dateStr Converted to Preferred Format
 * @returns {object} formatted Date
 */
function formatEmail(dateStr) {
  const emailDate = new Date(dateStr);
  return emailDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).replace(',', ' at');
}


export default Email;
