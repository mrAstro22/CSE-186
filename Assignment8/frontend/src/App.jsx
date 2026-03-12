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
export const LayoutContext = createContext();
const drawerWidth = 240;

// MUI Elements
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * Simple component with no state.
 * @returns {object} JSX
 */
function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // My Posts or Other
  const [view, setView] = useState('all');

  // Chat Generated
  // Determines whether we are in Mobile or Not
  const theme = useTheme();
  const isMobile =
  useMediaQuery(theme.breakpoints.down('md')); // true for mobile

  return (
    <LayoutContext.Provider value = {{
      drawerOpen,
      setDrawerOpen,
      isMobile,
      view,
      setView,
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path= "/login" element={<Login/>}/>
          <Route path="/home" element={
            <Home drawerWidth={drawerWidth}/>
          }/>
          <Route path="/post/mine" element={
            <Home drawerWidth={drawerWidth}/>
          }/>
          <Route path= {`/group/:groupID`}
            element={<Home drawerWidth={drawerWidth}/>}/>
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </LayoutContext.Provider>
  );
}

export default App;
