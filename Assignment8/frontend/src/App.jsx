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

// Components
import Login from './view/Login';
import Home from './view/Home';

// Contexts
import {createContext, useState} from 'react';
export const DrawerContext = createContext();
const drawerWidth = 240;


/**
 * Simple component with no state.
 * @returns {object} JSX
 */
function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  console.log('Header render - drawerOpen:', drawerOpen);

  return (
    <DrawerContext.Provider value = {{drawerOpen, setDrawerOpen, drawerWidth}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path= "/login" element={<Login/>}/>
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </DrawerContext.Provider>
  );
}

export default App;
