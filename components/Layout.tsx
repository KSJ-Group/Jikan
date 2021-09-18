import React, { useState, useEffect } from 'react';
import Background from './Background';
import Navbar from './Navbar';
import Search from './Settings/Search';
import Settings from './Settings/Settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BackgroundProvider } from './BackgroundContext';

const Layout: React.FC = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [background, setBackground] = useState<string>('/pexels-photo-5011944.jpeg');

  const toggleFullscreen = (): void => {
    if (isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    } else {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
      setIsFullscreen(true);
    }
  }

  return (
    <div id='layout'>
      <BackgroundProvider>
        <Navbar />
        <div onClick={() => toggleFullscreen()} className='fs'>[ ]</div>
        <i className="fas fa-compress"></i>
        <Background />
        { children }
      </BackgroundProvider>
    </div>
  );
};

export default Layout;