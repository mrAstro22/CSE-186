import {Component} from 'react';

// Components
import Header from '../view/Header';
import SideBar from '../view/Drawer';
import Posts from '../view/Posts';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

// MUI Elements
import Box from '@mui/material/Box';


/**
 * @param {number} drawerWidth -
 * @returns {Component} HomePage
 */
function Home({drawerWidth}) {
  const {groupID} = useParams();
  return (
    <Box>
      <Header /> {/* Render Header inside Home */}
      <SideBar drawerWidth={drawerWidth}/>
      <Posts drawerWidth={drawerWidth} groupID={groupID}/>
    </Box>
  );
}

export default Home;

Home.propTypes = {
  drawerWidth: PropTypes.number.isRequired,
};
