import React, { useState, useContext } from 'react';
import Background from './Background';
import Navbar from './Navbar';
import { BackgroundProvider } from './BackgroundContext';
import { StylesContext } from './StylesContext';
import { SettingsContext } from './SettingsContext';
import { BrightnessDiv } from '../styles/Global/global.style';
import YouTubePlayer from './YouTube';
import styles from '../styles/Navbar/Navbar.module.css';

const Layout: React.FC = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const { brightness } = useContext(StylesContext);

  const {
    selectedMusic,
    setMusic,
    music,
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
      setMusic('None');
    } else {
      let random = Math.floor(Math.random() * (music.length - 1) + 1);
      setMusic(music[random].url);
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
          <YouTubePlayer />
          {selectedMusic !== 'None' ?
            <div className={styles.recordDiv} onClick={handleClick}>
              <img src='/images/record.png' alt='vinyl record' className={styles.record} />
            </div> :
            <div className={styles.recordDiv2} onClick={handleClick}>
              <img src='/images/record.png' alt='vinyl record' className={styles.record2} />
            </div>}
        </BackgroundProvider>
      </div>
    </BrightnessDiv>
  );
};

export default Layout;