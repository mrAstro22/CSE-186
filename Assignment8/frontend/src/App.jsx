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

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  // Link
} from 'react-router-dom';

import {createContext, useState} from 'react';
import Login from './view/Login';

export const loginContext = createContext();


/**
 * Simple component with no state.
 * @returns {object} JSX
 */
function App() {
  const [login, setLogin] = useState(false);

  return (
    <loginContext.Provider value={{login, setLogin}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path= "/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </loginContext.Provider>
  );
}

export default App;
