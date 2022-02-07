import React, { useState, useContext, useEffect } from 'react';
import Background from './Background';
import Navbar from './Navbar';
import { BackgroundProvider } from './BackgroundContext';
import { StylesContext } from './StylesContext';
import { SettingsContext } from './SettingsContext';
import { BrightnessDiv } from '../styles/Global/global.style';
import YouTubePlayer from './YouTube';
import styles from '../styles/Navbar/Navbar.module.css';
import getHandler from '../pages/api/weather';
import Login from './Settings/Login';
import moment from 'moment';

const Layout: React.FC = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const { brightness } = useContext(StylesContext);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const {
    selectedMusic,
    setMusic,
    music,
    currentWeather,
    setCurrentWeather,
    zip
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

  const getWeather = () => {
    setLastUpdated(moment().calendar());
    getHandler(zip)
      .then(res => {
        const weatherData = {
          city: res.location.name,
          tempC: res.current.temp_c,
          tempF: res.current.temp_f,
          weather: res.current.condition.text,
          icon: res.current.condition.icon,
        }
        setCurrentWeather(weatherData);
      })
  }

  useEffect(() => {
    if (initialLoad && zip.length === 5) {
      getWeather();
      setInterval(() => {
        getWeather();
      }, 360000)
      setInitialLoad(false);
    }
  }, [zip])

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
          {currentWeather.city ? <div className={styles.weatherContainer}>
            <div className={styles.weatherLeft} onClick={() => window.open(`https://weather.com/weather/today/l/${zip}`)}>
              <img src={currentWeather.icon} alt="weather icon" className={styles.weatherIcon} />
            </div>
            <div className={styles.weatherRight} onClick={() => window.open(`https://weather.com/weather/today/l/${zip}`)}>
              <div>{currentWeather.city}</div>
              <div>{currentWeather.tempC}° C | {currentWeather.tempF}° F</div>
              <div>{currentWeather.weather}</div>
              <div className={styles.lastUpdated}>Last updated: {lastUpdated}</div>
            </div>
            <div className={styles.refresh} onClick={getWeather}>
              <img className={styles.refreshIcon} src='/images/refresh.png' alt='refresh icon' />
            </div>
          </div> : null}
          <div className={styles.offScreen}><Login /></div>
        </BackgroundProvider>
      </div>
    </BrightnessDiv>
  );
};

export default Layout;