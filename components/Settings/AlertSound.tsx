import React, { useEffect, useState, useContext } from "react";
import { Form } from "react-bootstrap";
import styles from "../../styles/Settings/AlertSound/AlertSound.module.css";
import globalStyles from "../../styles/Settings/Settings.module.css";
import { SettingsContext } from "../SettingsContext";

interface Props {
  selectedAlert: string;
  setSelectedAlert: Function;
  alertVolume: number;
  setAlertVolume: Function;
}

const { Howl } = require("howler");
var alert: any;

const AlertSound: React.FC<Props> = ({ selectedAlert, setSelectedAlert, alertVolume, setAlertVolume }) => {
  const [availAlerts, setAlerts] = useState<string[]>([]);
  const { allAlarms } = useContext(SettingsContext);

  useEffect(() => {
    alert = new Howl({
      src: selectedAlert,
      volume: 0.5,
    });
  }, [selectedAlert]);

  useEffect(() => {
    if (allAlarms.length > 1) {
      setAlerts(allAlarms);
    }
  }, [allAlarms]);

  const changeAlert = (e: any) => {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    setSelectedAlert(target.value);
  };

  const previewAlert = (): void => {
    alert.play();
  };

  const changeHandler = (e: any): void => {
    e.preventDefault();
    setAlertVolume(e.target.value);
  }


  return (
    <div className={styles.alertContainer}>
      <div>
        <Form.Label>Alert Sound</Form.Label>
        <Form.Group className={styles.alert}>
          <Form.Select value={selectedAlert} onChange={(e) => changeAlert(e)}>
            {availAlerts.map((alert) => (
              <option key={alert} value={alert}>
                {alert.slice(0, alert.indexOf("."))}
              </option>
            ))}
          </Form.Select>
          <button onClick={previewAlert} className={styles.previewBtn}>
            Preview
          </button>
        </Form.Group>
      </div>
      <div className={globalStyles.volumeDiv}>
        <label>Alert volume</label>
        <div className={globalStyles.sliderDiv}>
          <input id="slider" className={globalStyles.slider} defaultValue={alertVolume} onChange={changeHandler} type="range" name="volume"
            min="0" max="100" />
          <div>{alertVolume}%</div>
        </div>
      </div>
    </div>
  );
};

export default AlertSound;
