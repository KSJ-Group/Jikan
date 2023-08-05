import React, { useContext } from 'react';
import { Form } from "react-bootstrap";
import globalStyles from '../../styles/Settings/Settings.module.css';
import styles from '../../styles/Settings/Weather/Weather.module.css';
import getHandler from '../../../pages/api/weather';
import { SettingsContext } from '../../contexts/SettingsContext';

interface Props {
  zip: string;
  setZip: Function;
  setCurrentWeather: Function;
}

const Weather: React.FC<Props> = ({ zip, setZip, setCurrentWeather }) => {
  const {
    setShowSettings,
  } = useContext(SettingsContext);

  const changeHandler = (e: any): void => {
    e.preventDefault();
    setZip(e.target.value);
  };

  const sendRequest = (e: any): void => {
    e.preventDefault();
    const reg = /^\d+$/;
    if (zip.length === 5 && reg.test(zip)) {
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
        .then(() => {
          setShowSettings(false);
        })
    } else {
      console.log('Invalid');
    }
  };

  const clearRequest = (): void => {
    setCurrentWeather({
      city: '',
      tempC: '',
      tempF: '',
      weather: '',
      icon: '',
    })
    const inputField: any = document.querySelector('#weather-input');
    inputField!.value = "";
    setZip('');
  };

  return (
    <div className={globalStyles.settingModuleContainer}>
      <form onSubmit={(e: any) => sendRequest(e)}>
        <Form.Group className={globalStyles.font}>
          <Form.Label>Weather</Form.Label>
          <div className={styles.weatherRow}>
            <Form.Control id='weather-input' className={styles.zipInput} defaultValue={zip} placeholder="Zipcode" maxLength={5} onChange={(e: any) => changeHandler(e)} />
            <input type="button" value="Update" className={styles.updateBtn} onClick={(e: any) => sendRequest(e)} />
            <input type="button" value="Clear" className={styles.updateBtn} onClick={clearRequest} />
          </div>
        </Form.Group>
      </form>
    </div>
  );
};

export default Weather;