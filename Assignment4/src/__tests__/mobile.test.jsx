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

import {it, beforeAll, beforeEach, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from '../App';
import loader from '../model/loader';

import {useState} from 'react';
import {layoutContext, mailboxContext, emailContext} from '../App';
import PropTypes from 'prop-types';
import userEvent from '@testing-library/user-event';

const testMail = [
  {
    name: 'Inbox',
    mail: [
      {
        id: '9afb8fdb-efa0-4eb5-92c1-1d9ee1678b78',
        received: '2025-01-31T01:43:14Z',
        subject: 'Come Get Your Sandwich',
        from: {name: 'John Pork', address: 'johnPork@gmail.com'},
        to: {name: 'Mail User', address: 'user@mail.com'},
        content: 'Plz pick up the phone!',
      },
      {
        id: 'e0e632c4-0019-4959-85da-0b3a88f9325f',
        received: '2023-08-22T18:30:44Z',
        subject: 'Update on the World',
        from: {name: 'Ronald McDonald', address: 'dvittore1@buzzfeed.com'},
        to: {name: 'Mail User', address: 'user@mail.com'},
        content: 'Chicken Sandwiches at McDonalds now $1.99',
      },
      {
        id: 'f7c4a8d2-1234-4bca-9876-abc123456789',
        received: '2024-11-15T12:20:00Z',
        subject: 'Sunny Morning Thoughts',
        from: {name: 'Oliver King', address: 'oking@example.com'},
        to: {name: 'Mail User', address: 'user@mail.com'},
        content: 'A quick reminder to lock in.',
      },
    ],
  },
  {
    name: 'Important',
    mail: [
      {
        id: 'a1b2c3d4-0011-22aa-33bb-44cc55dd66ee',
        received: '2025-02-01T08:00:00Z',
        subject: 'Project Deadline Reminder',
        from: {name: 'Manager', address: 'manager@company.com'},
        to: {name: 'Mail User', address: 'user@mail.com'},
        content: 'The project deadline is tomorrow, please submit your report.',
      },
      {
        id: 'b2c3d4e5-0022-33bb-44cc-55dd66ee77ff',
        received: '2025-01-30T14:15:00Z',
        subject: 'Team Meeting Notes',
        from: {name: 'Team Lead', address: 'lead@company.com'},
        to: {name: 'Mail User', address: 'user@mail.com'},
        content: 'Attached are the notes from today’s meeting.',
      },
    ],
  },
  {
    name: 'Trash',
    mail: [
      {
        id: 'c3d4e5f6-0033-44cc-55dd-66ee77ff88gg',
        received: '2024-12-10T10:30:00Z',
        subject: 'Spam Offer',
        from: {name: 'Spammer', address: 'spam@offers.com'},
        to: {name: 'Mail User', address: 'user@mail.com'},
        content: 'You won a free iPhone! Click here to claim it.',
      },
      {
        id: 'd4e5f6g7-0044-55dd-66ee-77ff88gg99hh',
        received: '2024-11-05T09:00:00Z',
        subject: 'Old Newsletter',
        from: {name: 'News Corp', address: 'newsletter@news.com'},
        to: {name: 'Mail User', address: 'user@mail.com'},
        content: 'This is an old newsletter you might want to delete.',
      },
    ],
  },
];


const ContextWrapper = ({testMail}) => {
  const [mailbox, setMailbox] = useState('Inbox'); // Header
  const [email, setEmail] = useState(null); // MailList
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMail, setMobileMail] = useState(false);
  const drawerWidth = 240;
  return (
    <layoutContext.Provider
      value={{
        drawerOpen,
        setDrawerOpen,
        drawerWidth,
        mobileMail,
        setMobileMail,
      }}>
      <mailboxContext.Provider value={{mailbox, setMailbox}}>
        <emailContext.Provider value = {{email, setEmail}}>
          <App initMail = {testMail}/>
        </emailContext.Provider>
      </mailboxContext.Provider>
    </layoutContext.Provider>
  );
};

/**
 * Do not modify this function.
 */
beforeAll(() => {
  loader();
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };
});

/**
 * Sets the browser to the size of an iPhone SE.
 * Do not modify this function, especially not to be cognizant of the
 * way your implementation determines window size.
 * Bottom line? Change your implementation to pass the tests, don't change
 * the tests to match the implementation.
 */

beforeEach(() => {
  window.resizeTo(375, 667);
});

it('Renders', async () => {
  render(<App />);
});

it('Renders with test data', async () => {
  render(<ContextWrapper testMail={testMail} />);
  expect(screen.getByLabelText('list of mail'));
});

/*
####################
#       Title      #
####################
*/
it('Title Renders', async () => {
  render(<ContextWrapper testMail={testMail} />);
  expect(screen.getByLabelText('title'));
});

/*
####################
#       Menu       #
####################
*/

it('Menu Icon Renders', async () => {
  render(<ContextWrapper testMail={testMail} />);
  expect(screen.getByLabelText('menu-icon'));
});

it('Menu Icon Shows Open Drawer on App Render', async () => {
  render(<ContextWrapper testMail={testMail} />);
  expect(screen.getByLabelText('show mailboxes'));
});

it('Menu Icon Shows Close Drawer after clicks', async () => {
  render(<ContextWrapper testMail={testMail} />);
  const user = userEvent.setup();
  const menuIcon = screen.getByLabelText('show mailboxes');
  await user.click(menuIcon);

  expect(screen.getByLabelText('hide mailboxes'));
});

it('Open then Close by Clicking off to side', async () => {
  render(<ContextWrapper testMail={testMail} />);
  const user = userEvent.setup();
  const menuIcon = screen.getByLabelText('show mailboxes');

  await user.click(menuIcon);
  expect(screen.getByLabelText('hide mailboxes'));

  // Click Outside of Drawer
  const overlay = document.querySelector('.MuiBackdrop-root');
  if (overlay) await user.click(overlay);

  expect(screen.getByLabelText('show mailboxes'));
});

/*
####################
#     Mail List    #
####################
*/

it('Mail Summaries Renders', async () => {
  render(<ContextWrapper testMail={testMail} />);
  expect(screen.getByLabelText('list of mail'));
});

it('Check One Inbox Mail', async () => {
  render(<ContextWrapper testMail={testMail} />);
  expect(screen.getByLabelText('list of mail'));
});

it('renders the first email in Inbox', () => {
  render(<ContextWrapper testMail={testMail} />);

  const firstEmailSender = screen.getByText('John Pork');
  const firstEmailSubject = screen.getByText('Come Get Your Sandwich');

  expect(firstEmailSender).toBeInTheDocument();
  expect(firstEmailSubject).toBeInTheDocument();
});

it('renders the second email in Inbox', () => {
  render(<ContextWrapper testMail={testMail} />);

  const secondEmailSender = screen.getByText('Ronald McDonald');
  const secondEmailSubject = screen.getByText('Update on the World');

  expect(secondEmailSender).toBeInTheDocument();
  expect(secondEmailSubject).toBeInTheDocument();
});

/*
####################
#   Mail List 2.0  #
####################
*/

it('Open Drawer, Click Important Mailbox', async () => {
  render(<ContextWrapper testMail={testMail} />);
  const user = userEvent.setup();

  // Open Drawer
  const menuIcon = screen.getByLabelText('show mailboxes');
  await user.click(menuIcon);

  // Click Important
  const impIcon = screen.getAllByLabelText('Important');
  await user.click(impIcon[0]);

  const firstEmailSender = screen.getByText('Manager');
  const firstEmailSubject = screen.getByText('Project Deadline Reminder');

  expect(firstEmailSender).toBeInTheDocument();
  expect(firstEmailSubject).toBeInTheDocument();
});

it('Open Drawer, Click Trash Mailbox', async () => {
  render(<ContextWrapper testMail={testMail} />);
  const user = userEvent.setup();

  // Open Drawer
  const menuIcon = screen.getByLabelText('show mailboxes');
  await user.click(menuIcon);

  // Click Important
  const trashIcon = screen.getAllByLabelText('Trash');
  await user.click(trashIcon[0]);

  const firstEmailSender = screen.getByText('Spammer');
  const firstEmailSubject = screen.getByText('Spam Offer');

  expect(firstEmailSender).toBeInTheDocument();
  expect(firstEmailSubject).toBeInTheDocument();
});

/*
####################
#   Mail List 3.0  #
####################
*/

it('Renders First Email Content', async () => {
  render(<ContextWrapper testMail={testMail} />);
  const user = userEvent.setup();

  const firstEmailSender = screen.getByText('John Pork');
  const firstEmailSubject = screen.getByText('Come Get Your Sandwich');

  expect(firstEmailSender).toBeInTheDocument();
  expect(firstEmailSubject).toBeInTheDocument();

  // Click Email
  await user.click(firstEmailSender);

  // Looks Specifically for content
  const emailContent = screen.getByText('Plz pick up the phone!');
  expect(emailContent).toBeInTheDocument();
});

it('Renders Important Content', async () => {
  render(<ContextWrapper testMail={testMail} />);
  const user = userEvent.setup();

  // Open Drawer
  const menuIcon = screen.getByLabelText('show mailboxes');
  await user.click(menuIcon);

  // Click Important
  const impIcon = screen.getAllByLabelText('Important');
  await user.click(impIcon[0]);

  const firstEmailSender = screen.getByText('Manager');

  await user.click(firstEmailSender);
  const emailContent = screen.getByText(
      'The project deadline is tomorrow, please submit your report.',
  );
  expect(emailContent).toBeInTheDocument();
});

it('Renders Trash Content', async () => {
  render(<ContextWrapper testMail={testMail} />);
  const user = userEvent.setup();

  // Open Drawer
  const menuIcon = screen.getByLabelText('show mailboxes');
  await user.click(menuIcon);

  // Click Important
  const trashIcon = screen.getAllByLabelText('Trash');
  await user.click(trashIcon[0]);

  const firstEmailSender = screen.getByText('Spammer');

  await user.click(firstEmailSender);
  const emailContent = screen.getByText(
      'You won a free iPhone! Click here to claim it.',
  );
  expect(emailContent).toBeInTheDocument();
});

it('renders nothing if mailbox does not exist', () => {
  render(<ContextWrapper testMail={[]} />);

  // Or, check that the table does not contain any known email subjects
  expect(screen.queryByText('Come Get Your Sandwich')).not.toBeInTheDocument();
  expect(screen.queryByText('Sunny Morning Thoughts')).not.toBeInTheDocument();
});

/*
####################
#    Close Icon    #
####################
*/
it('Look for Close Icon', async () => {
  render(<ContextWrapper testMail={testMail} />);
  const user = userEvent.setup();

  const firstEmailSender = screen.getByText('John Pork');

  // Click Email
  await user.click(firstEmailSender);

  // Look for Close Icon
  expect(screen.getByLabelText('close mail reader'));
});

it('Click Close Icon', async () => {
  render(<ContextWrapper testMail={testMail} />);
  const user = userEvent.setup();

  const firstEmailSender = screen.getByText('John Pork');

  // Click Email
  await user.click(firstEmailSender);

  // Look for Close Icon
  const closeIcon = screen.getByLabelText('close mail reader');
  await user.click(closeIcon);

  // Expect Mail to Be Back
  expect(firstEmailSender).toBeInTheDocument();
});

ContextWrapper.propTypes = {
  testMail: PropTypes.array,
};
