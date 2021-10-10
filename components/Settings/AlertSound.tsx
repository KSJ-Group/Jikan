import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import styles from "../../styles/Settings/Settings.module.css";
import axios from "axios";

interface Props {
  selectedAlert: string;
  setSelectedAlert: Function;
}

const AlertSound: React.FC<Props> = ({ selectedAlert, setSelectedAlert }) => {
  const [availAlerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    axios.get("/api/getAlarms").then((data) => {
      if (data.data.length) {
        setAlerts(data.data);
      }
    });
  }, []);

  const changeAlert = (e: any) => {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    setSelectedAlert(target.value);
  };

  return (
    <div>
      <Form.Group className={styles.alert}>
        <Form.Label>Alert Sound</Form.Label>
        <Form.Select
          defaultValue={selectedAlert}
          onChange={(e) => changeAlert(e)}
        >
          {availAlerts.map((alert) => (
            <option key={alert} value={alert}>
              {alert}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default AlertSound;
