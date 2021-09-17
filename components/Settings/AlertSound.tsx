import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap'
import styles from '../../styles/Settings/Settings.module.css';

const AlertSound = () => {
  return (
    <div>
      <Form.Group>
        <Form.Label>Alert Sound</Form.Label>
        <Form.Select>
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