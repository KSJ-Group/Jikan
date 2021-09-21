import React, { useState, useEffect } from 'react';
import Background from './Background';
import Navbar from './Navbar';
import { BackgroundProvider } from './BackgroundContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

library.add(
  faExpand
);

const Layout: React.FC = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // useEffect(() => {
  //   window.addEventListener('keydown', (e) => {
  //     if (e.key === 'Escape' && !isFullscreen) {
  //       console.log('Escape!');
  //       setIsFullscreen(false);
  //     }
  //   })
  // }, [])

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
        <div onClick={() => toggleFullscreen()} className='fs'><FontAwesomeIcon icon={faExpand} size='lg'/><div className='fsText'>Fullscreen</div></div>
        <Background />
        { children }
      </BackgroundProvider>
    </div>
  );
};

export default Layout;