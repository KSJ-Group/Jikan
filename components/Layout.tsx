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

  const music = [
    {
      title: 'None',
      url: 'None'
    },
    {
      title: 'Anime Lofi',
      url: '//www.youtube.com/embed/w3LWHIz3bMc?autoplay=1'
    },
    {
      title: 'Calm Piano',
      url: '//www.youtube.com/embed/XULUBg_ZcAU?autoplay=1'
    },
    {
      title: 'Deep Focus',
      url: '//www.youtube.com/embed/8N-eLvmheSE?autoplay=1'
    },
    {
      title: 'Fallout Radio',
      url: '//www.youtube.com/embed/Ya3WXzEBL1E?autoplay=1'
    },
    {
      title: 'Indie / Pop / Rock',
      url: '//www.youtube.com/embed/1itSqkbXIlU?autoplay=1'
    },
    {
      title: 'Lofi Hip Hop',
      url: '//www.youtube.com/embed/5qap5aO4i9A?autoplay=1'
    },
    {
      title: 'Nintendo Radio',
      url: '//www.youtube.com/embed/tOnOutGHcRQ?autoplay=1'
    },
    {
      title: 'Relaxing Sleep',
      url: '//www.youtube.com/embed/n4M8j6ic1Ts?autoplay=1'
    },
    {
      title: 'Soothing Rain',
      url: '//www.youtube.com/embed/ZddHkhVUf2c?autoplay=1'
    },
    {
      title: 'Sounds of Nature',
      url: '//www.youtube.com/embed/gfo2xZ2SMjc?autoplay=1'
    },
    {
      title: 'Spooky Halloween Music',
      url: '//www.youtube.com/embed/qJSLmjzLnAM?autoplay=1'
    },
    {
      title: 'The Good Life',
      url: '//www.youtube.com/embed/36YnV9STBqc?autoplay=1'
    },
    {
      title: 'Weekend Jazz',
      url: '//www.youtube.com/embed/uKTUW9niMYg?autoplay=1'
    },
  ]

  const {
    selectedMusic,
    setMusic
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
          <YouTube />
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