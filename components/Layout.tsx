import React, { useState, useEffect, useContext } from 'react';
import Background from './Background';
import Navbar from './Navbar';
import { BackgroundProvider } from './BackgroundContext';
import { StylesContext } from './StylesContext';
import { SettingsContext } from './SettingsContext';
import { BrightnessDiv } from '../styles/Global/global.style';
import YouTube from './YouTube';
import styles from '../styles/Navbar/Navbar.module.css';

const Layout: React.FC = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const { brightness } = useContext(StylesContext);

  const {
    selectedMusic
  } = useContext(SettingsContext);

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

  const handleClick = (): void => {
    if (selectedMusic !== 'None') {
      window.open(selectedMusic, "_blank");
    }
  }

  return (
    <BrightnessDiv brightness={brightness.toString() + '%'}>
      <div id='layout'>
        <BackgroundProvider>
          <Navbar />
          <div onClick={() => toggleFullscreen()} className='fs'>
            <img src='/images/fullscreen.png' alt='fullscreen icon' className={styles.fullscreen} />
            <div className='fsText'>Fullscreen</div>
          </div>
          <Background />
          {children}
          <YouTube />
          <div onClick={handleClick}>
            {selectedMusic !== 'None' ? <img src='/images/record.png' alt='vinyl record' className={styles.record} /> : <img src='/images/record.png' alt='vinyl record' className={styles.record2} />}
          </div>
        </BackgroundProvider>
      </div>
    </BrightnessDiv>
  );
};

export default Layout;