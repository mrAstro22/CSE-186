// CSS
import './Mail.css';

// Context
import {useContext} from 'react';
import {emailContext} from '../App';

/**
 * @returns {object} Email Content
 */
function EmailHandle() {
  // Current Email
  const {email} = useContext(emailContext);

  // Error Handling
  if (!email) return null;

  return (
    <div>
      <table
        className = "fullEmail"
      >
        <tr key={email.id} className='emailElements'>
          <td>From: {email.from.name} {email.from.address}</td>
          <td>To: {email.to.name} {email.to.address}</td>
          <td>Recieved: {email.received}</td>
          <br></br>
          <td>{email.subject}</td>
          <br></br>
          <td>{email.content}</td>
        </tr>
      </table>
    </div>
  );
}

export default EmailHandle;
