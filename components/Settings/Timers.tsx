import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import styles from '../../styles/Settings/Settings.module.css';

const Timers = () => {
  return (
    <div className={styles.form}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Pomodoro</Form.Label>
        <Form.Control type="pomodoro" className={styles.pomodoro} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Short Break</Form.Label>
        <Form.Control type="shortbreak" className={styles.shortbreak} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Long Break</Form.Label>
        <Form.Control type="longbreak" className={styles.longbreak} />
      </Form.Group>
    </div>
  );
};

export default Timers;