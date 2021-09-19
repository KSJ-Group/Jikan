import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import styles from '../../styles/Settings/Settings.module.css';

const Timers = () => {
  return (
    <div className={styles.timers}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Pomodoro</Form.Label>
        <Form.Control type="pomodoro" placeholder='25:00' className={styles.pomodoro} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Short Break</Form.Label>
        <Form.Control type="shortbreak" placeholder='5:00' className={styles.shortbreak} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Long Break</Form.Label>
        <Form.Control type="longbreak" placeholder='15:00' className={styles.longbreak} />
      </Form.Group>
    </div>
  );
};

export default Timers;