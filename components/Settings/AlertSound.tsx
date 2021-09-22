import React, { useState, useEffect } from 'react';
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

  return (
    <div>
      <Form.Group className={styles.alert}>
        <Form.Label>Alert Sound</Form.Label>
        <Form.Select defaultValue={selectedAlert} onChange={(e) => changeAlert(e)}>
          <option value='' hidden></option>
          <option value={selectedAlert}>{selectedAlert}</option>
          <option value='Classic beep'>Classic beep</option>
          <option value='Classic Seiji'>Classic Seiji</option>
          <option value='Classic June'>Classic June</option>
          <option value='Classic Katie'>Classic Katie</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default AlertSound;