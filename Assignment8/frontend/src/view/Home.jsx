import {Component} from 'react';

// Components
import Header from '../view/Header';
import SideBar from '../view/Drawer';
import Posts from '../view/Posts';

// MUI Elements
import Box from '@mui/material/Box';


/**
 * @returns {Component} HomePage
 */
function Home() {
  return (
    <Box>
      <Header /> {/* Render Header inside Home */}
      <SideBar/>
      <Posts/>
    </Box>
  );
}

export default Home;
