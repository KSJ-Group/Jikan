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

interface Props {
  color: string;
  opacity: number;
}

const StyledFont = styled.span<Font>`
    font-family: ${(props) => props.font}, monospace;
`

const WeatherContainer = styled.div<Props>`
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  position: absolute;
  display: block;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  color: white;
  background-color: ${props => `rgb(${props.color}, ${props.opacity / 100})` || 'rgb(0, 0, 0, 0.4)'};
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.1s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.534);
  }
  @media screen and (max-width: 740px) {
    top: 90px;
    height: 0;
    right: -15px;
    background-color: none;
    padding: 0;
    text-align: right;
  }
  `

const Layout: React.FC = ({ children }) => {
  const { brightness, selectedFont, opacity, color } = useContext(StylesContext);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const {
    currentWeather,
    setCurrentWeather,
    zip
  } = useContext(SettingsContext);

  const toggleFullscreen = (): void => {
    if (document.fullscreenElement !== null) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  const getWeather = (): void => {
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
            <div className='fsText'><StyledFont font={selectedFont}>Fullscreen</StyledFont></div>
          </div>
          <Background />
          {children}
          {currentWeather.city ? <WeatherContainer opacity={opacity} color={color}>
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
          </WeatherContainer> : null}
          <div className={styles.offScreen}><Login /></div>
        </BackgroundProvider>
      </div>
    </BrightnessDiv>
  );
};

export default Layout;
