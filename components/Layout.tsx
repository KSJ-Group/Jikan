import React, { useState, useEffect, useContext } from 'react';
import Background from './Background';
import Navbar from './Navbar';
import { BackgroundProvider } from './BackgroundContext';
import { StylesContext } from './StylesContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { BrightnessDiv } from '../styles/global.style';

library.add(
  faExpand
);

const Layout: React.FC = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const { brightness } = useContext(StylesContext);

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
    <BrightnessDiv brightness={brightness.toString() + '%'}>
      <div id='layout'>
          <BackgroundProvider>
              <Navbar />
              <div onClick={() => toggleFullscreen()} className='fs'><FontAwesomeIcon icon={faExpand} size='lg' /><div className='fsText'>Fullscreen</div></div>
              <Background />
              {children}
          </BackgroundProvider>
      </div>
    </BrightnessDiv>
  );
};

export default Layout;