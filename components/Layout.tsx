import React, { useState, useContext, useEffect } from 'react';
import Background from './Background';
import Navbar from './Navbar';
import { BackgroundProvider } from './BackgroundContext';
import { StylesContext } from './StylesContext';
import { SettingsContext } from './SettingsContext';
import { BrightnessDiv } from '../styles/Global/global.style';
import styles from '../styles/Navbar/Navbar.module.css';
import getHandler from '../pages/api/weather';
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

  const {
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

  useEffect(() => {
    if (initialLoad && zip.length === 5) {
      getHandler(zip)
        .then(res => {
          const lastUpdated = res.current.last_updated.slice(5);
          const weatherData = {
            city: res.location.name,
            tempC: res.current.temp_c,
            tempF: res.current.temp_f,
            weather: res.current.condition.text,
            icon: res.current.condition.icon,
          }
          setCurrentWeather(weatherData);
        })
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
            <div className='fsText'><StyledFont font={selectedFont}>Fullscreen</StyledFont></div>
          </div>
          <Background />
          {children}
          {currentWeather.city ? <div className={styles.weatherContainer} onClick={() => window.open(`https://weather.com/weather/today/l/${zip}`)}>
            <div className={styles.weatherLeft}>
              <img src={currentWeather.icon} alt="weather icon" className={styles.weatherIcon} />
            </div>
            <div className={styles.weatherRight}>
              <StyledFont font={selectedFont}>{currentWeather.city}</StyledFont>
              <StyledFont font={selectedFont}>{currentWeather.tempC}° C | {currentWeather.tempF}° F</StyledFont>
              <StyledFont font={selectedFont}>{currentWeather.weather}</StyledFont>
            </div>
          </div> : null}
        </BackgroundProvider>
      </div>
    </BrightnessDiv>
  );
};

export default Layout;