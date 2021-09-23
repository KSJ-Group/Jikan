import React, { useState } from 'react';
import { Form } from 'react-bootstrap'
import styles from '../../styles/Settings/Settings.module.css';

interface Props {
  selectedAlert: string,
  setSelectedAlert: Function
}

const AlertSound: React.FC<Props> = ( { selectedAlert, setSelectedAlert} ) => {

  const changeAlert = (e: any) => {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    setSelectedAlert(target.value);
  }

  const alerts = ['alarm.wav', 'alarm2.mp3', 'alarm3.mp3', 'alarm4.mp3'];
  const [availAlerts, setAlerts] = useState<string[]>(alerts);

  return (
    <div>
      <Form.Group className={styles.alert}>
        <Form.Label>Alert Sound</Form.Label>
        <Form.Select defaultValue={selectedAlert} onChange={(e) => changeAlert(e)}>
          { availAlerts.map(alert => <option key={alert} value={alert}>{alert}</option>) }
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default AlertSound;