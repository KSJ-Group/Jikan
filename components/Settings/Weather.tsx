import React from 'react';
import { Form } from "react-bootstrap";
import styles from '../../styles/Settings/Settings.module.css';
import getHandler from '../../pages/api/images/weather';

interface Props {
  zip: string;
  setZip: Function;
  setCurrentWeather: Function;
}

const Weather: React.FC<Props> = ({ zip, setZip, setCurrentWeather }) => {

  const changeHandler = (e: any): void => {
    e.preventDefault();
    setZip(e.target.value);
  };

  const sendRequest = (): void => {
    if (zip.length === 5) {
      getHandler(zip)
        .then(res => {
          console.log(res);
          const weatherData = {
            city: res.location.name,
            tempC: res.current.temp_c,
            tempF: res.current.temp_f,
            weather: res.current.condition.text,
            icon: res.current.condition.icon
          }
          setCurrentWeather(weatherData);
        })
    } else {
      console.log('Invalid');
    }
  };

  return (
    <div className={styles.weatherSettings}>
      <Form.Group className={styles.font}>
        <Form.Label>Weather</Form.Label>
        <div className={styles.musicDiv}>
          <Form.Control id='weather-input' placeholder="Zipcode" maxLength={5} onChange={(e: any) => changeHandler(e)} />
          <input type="button" value="Update" className={styles.updateBtn} onClick={sendRequest} />
        </div>
      </Form.Group>
    </div>
  );
};

export default Weather;