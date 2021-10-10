import React, { useEffect, useState, useContext } from "react";
import { Form } from "react-bootstrap";
import styles from "../../styles/Settings/Settings.module.css";
import { SettingsContext } from "../SettingsContext";

interface Props {
  selectedAlert: string;
  setSelectedAlert: Function;
}

const { Howl } = require("howler");
var alert: any;

const AlertSound: React.FC<Props> = ({ selectedAlert, setSelectedAlert }) => {
  const [availAlerts, setAlerts] = useState<string[]>([]);
  const { allAlarms } = useContext(SettingsContext);

  useEffect(() => {
    alert = new Howl({
      src: "/Alarm Tones/" + selectedAlert,
      volume: 0.5,
    });
  }, [selectedAlert]);

  useEffect(() => {
    if (allAlarms) {
      setAlerts(allAlarms);
      console.log(allAlarms);
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

  return (
    <div className={styles.alertContainer}>
      <Form.Group className={styles.alert}>
        <Form.Label>Alert Sound</Form.Label>
        <Form.Select value={selectedAlert} onChange={(e) => changeAlert(e)}>
          {availAlerts.map((alert) => (
            <option key={alert} value={alert}>
              {alert.slice(0, alert.indexOf("."))}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <div>
        <button onClick={previewAlert} className={styles.previewBtn}>
          Preview
        </button>
      </div>
    </div>
  );
};

export default AlertSound;
