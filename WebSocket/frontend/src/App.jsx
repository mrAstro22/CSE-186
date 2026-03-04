/*
#######################################################################
#
# Copyright (C) 2025-2026 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

import React from 'react';

import List from './view/List.jsx';
import Entry from './view/Entry.jsx';

import './App.css';

/**
 * Simple component with no state.
 * @returns {object} JSX
 */
function App() {
  return (
    <React.Fragment>
      <h2 id='welcome'>CSE186 Web Socket Book Example</h2>
      <Entry />
      <p /> {/* Sloppy layout */}
      <List />
    </React.Fragment>
  );
}

export default App;
