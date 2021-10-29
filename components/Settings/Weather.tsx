import React from 'react';
import { Form } from "react-bootstrap";
import styles from '../../styles/Settings/Settings.module.css';
// import handler from '../../pages/api/weather';

interface Props {
  zip: string;
  setZip: Function;
}

const Weather: React.FC<Props> = ({ zip, setZip }) => {

  const changeHandler = (e: any): void => {
    e.preventDefault();
    setZip(e.target.value);
  };

  const sendRequest = (): void => {
    if (zip.length === 5) {
      console.log('Send request to API:', zip);
      // handler(zip);
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