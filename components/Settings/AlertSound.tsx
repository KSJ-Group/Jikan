import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap'
import styles from '../../styles/Settings/Settings.module.css';

interface Props {
  setSelectedAlert: Function
}

const AlertSound: React.FC<Props> = ( { setSelectedAlert} ) => {

  const changeAlert = (e: any) => {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    setSelectedAlert(target.value);
  }

  return (
    <div>
      <Form.Group className={styles.alert}>
        <Form.Label>Alert Sound</Form.Label>
        <Form.Select onChange={(e) => changeAlert(e)}>
          <option value='' hidden></option>
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