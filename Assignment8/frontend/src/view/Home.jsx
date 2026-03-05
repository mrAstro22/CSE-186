import {Component} from 'react';
import Header from '../view/Header';
import SideBar from '../view/Drawer';

/**
 * @returns {Component} HomePage
 */
function Home() {
  return (
    <div>
      <Header /> {/* Render Header inside Home */}
      <SideBar/>
      <p>Welcome to your homepage!</p>
    </div>
  );
}

export default Home;
