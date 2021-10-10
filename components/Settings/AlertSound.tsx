import React, { useEffect, useState, useContext } from "react";
import { Form } from "react-bootstrap";
import styles from "../../styles/Settings/Settings.module.css";
import { SettingsContext } from "../SettingsContext";

interface Props {
  selectedAlert: string;
  setSelectedAlert: Function;
}

const AlertSound: React.FC<Props> = ({ selectedAlert, setSelectedAlert }) => {
  const [availAlerts, setAlerts] = useState<string[]>([]);
  const { allAlarms } = useContext(SettingsContext);

  useEffect(() => {
    if (allAlarms) {
      setAlerts(allAlarms);
    }
  }, [allAlarms]);

  useEffect(() => {
    console.log(selectedAlert);
  }, [selectedAlert]);

  const changeAlert = (e: any) => {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    setSelectedAlert(target.value);
  };

  return (
    <div>
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
    </div>
  );
};

export default AlertSound;
