import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import styles from '../../styles/Settings/Settings.module.css';
import { minutesAndSecondsToMillis, millisToMinutesAndSeconds } from '../../helper/convertTime';

interface Props {
  pomTime: number,
  shortBreakTime: number,
  longBreakTime: number,
  setPomTime: Function,
  setShortBreakTime: Function,
  setLongBreakTime: Function
}

const Timers: React.FC<Props> = ({pomTime, shortBreakTime, longBreakTime, setPomTime, setShortBreakTime, setLongBreakTime }) => {
  const pomChange = (e: any): void => {
    e.preventDefault();
    setPomTime(minutesAndSecondsToMillis(e.target.value.toString() + ':00'));
    console.log(millisToMinutesAndSeconds(pomTime).slice(0, millisToMinutesAndSeconds(pomTime).indexOf(':')))
  }

  const shortChange = (e: any): void => {
    e.preventDefault();
    setShortBreakTime(minutesAndSecondsToMillis(e.target.value.toString() + ':00'));
  }

  const longChange = (e: any): void => {
    e.preventDefault();
    setLongBreakTime(minutesAndSecondsToMillis(e.target.value.toString() + ':00'));
  }

  return (
    <div className={styles.timers}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Pomodoro</Form.Label>
        <Form.Control type="number" defaultValue={millisToMinutesAndSeconds(pomTime).slice(0, millisToMinutesAndSeconds(pomTime).indexOf(':'))} onChange={(e) => pomChange(e)} className={styles.pomodoro} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Short Break</Form.Label>
        <Form.Control type="number" defaultValue={millisToMinutesAndSeconds(shortBreakTime).slice(0, millisToMinutesAndSeconds(shortBreakTime).indexOf(':'))} onChange={(e) => shortChange(e)} className={styles.shortbreak} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Long Break</Form.Label>
        <Form.Control type="number" defaultValue={millisToMinutesAndSeconds(longBreakTime).slice(0, millisToMinutesAndSeconds(longBreakTime).indexOf(':'))} onChange={(e) => longChange(e)} className={styles.longbreak} />
      </Form.Group>
    </div>
  );
};

export default Timers;