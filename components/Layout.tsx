import React, { useState, useContext, useEffect } from 'react';
import Background from './Background';
import Navbar from './Navbar';
import { BackgroundProvider } from './BackgroundContext';
import { StylesContext } from './StylesContext';
import { SettingsContext } from './SettingsContext';
import { BrightnessDiv } from '../styles/Global/global.style';
import styles from '../styles/Navbar/Navbar.module.css';
import getHandler from '../pages/api/weather';
import Login from './Settings/Login';
import moment from 'moment';
import styled from "styled-components";

interface Font {
  font: any;
}

const StyledFont = styled.span<Font>`
    font-family: ${(props) => props.font}, monospace;
`

const Layout: React.FC = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const { brightness, selectedFont } = useContext(StylesContext);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const {
    currentWeather,
    setCurrentWeather,
    zip
  } = useContext(SettingsContext);

  useEffect(() => {
    if (window) {
      window.addEventListener("resize", () => {
        if (!window.screenTop && !window.screenY) {
         setIsFullscreen(false);
        } else {
          setIsFullscreen(true);
        }
      })
    }
  }, [])


  const toggleFullscreen = (): void => {
    if (document) {
      if (isFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      } else {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        }
      }
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
      }, 3600000)
      setInitialLoad(false);
    }
  }, [zip])

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
          {currentWeather.city ? <div className={styles.weatherContainer}>
            <div className={styles.weatherLeft} onClick={() => window.open(`https://weather.com/weather/today/l/${zip}`)}>
              <img src={currentWeather.icon} alt="weather icon" className={styles.weatherIcon} />
            </div>
            <div className={styles.weatherRight} onClick={() => window.open(`https://weather.com/weather/today/l/${zip}`)}>
              <StyledFont font={selectedFont}>{currentWeather.city}</StyledFont>
              <StyledFont font={selectedFont}>{currentWeather.tempC}° C | {currentWeather.tempF}° F</StyledFont>
              <StyledFont font={selectedFont}>{currentWeather.weather}</StyledFont>
              <div className={styles.lastUpdated}><StyledFont font={selectedFont}>Last updated: {lastUpdated}</StyledFont></div>
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
