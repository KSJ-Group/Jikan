import React, { useState, useEffect } from 'react';
import Background from './Background';
import Navbar from './Navbar';
import { BackgroundProvider } from './BackgroundContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExpandAlt, faCompressAlt } from '@fortawesome/free-solid-svg-icons';

library.add(
  faExpandAlt,
  faCompressAlt
);

const Layout: React.FC = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

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
        {isFullscreen ?
        <div onClick={() => toggleFullscreen()} className='fs'><FontAwesomeIcon icon={faCompressAlt} /></div>  : <div onClick={() => toggleFullscreen()} className='fs'><FontAwesomeIcon icon={faExpandAlt} /></div> }
        <Background />
        { children }
      </BackgroundProvider>
    </div>
  );
};

export default Layout;