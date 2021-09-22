import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import styles from '../../styles/Settings/Settings.module.css';
import { minutesAndSecondsToMillis, millisToMinutesAndSeconds } from '../../helper/convertTime';

interface Props {
  pomodoroTime: number,
  shortBreakTime: number,
  longBreakTime: number,
  setPomodoroTime: Function,
  setShortBreakTime: Function,
  setLongBreakTime: Function
}

const Timers: React.FC<Props> = ({ pomodoroTime, shortBreakTime, longBreakTime, setPomodoroTime, setShortBreakTime, setLongBreakTime }) => {
  const [pomStr, setPomStr] = useState<string>(millisToMinutesAndSeconds(pomodoroTime));
  const [shortStr, setShortStr] = useState<string>(millisToMinutesAndSeconds(shortBreakTime));
  const [longStr, setLongStr] = useState<string>(millisToMinutesAndSeconds(longBreakTime));

  const pomChange = (e: any): void => {
    e.preventDefault();
    let toMs = minutesAndSecondsToMillis(e.target.value);
    setPomodoroTime(toMs);
  }

  const shortChange = (e: any): void => {
    e.preventDefault();
    let toMs = minutesAndSecondsToMillis(e.target.value);
    setShortBreakTime(toMs);
  }

  const longChange = (e: any): void => {
    e.preventDefault();
    let toMs = minutesAndSecondsToMillis(e.target.value);
    setLongBreakTime(toMs);
  }

  return (
    <div className={styles.timers}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Pomodoro</Form.Label>
        <Form.Control type="number" min="1" defaultValue={parseInt(pomStr)} onChange={(e) => pomChange(e)} className={styles.pomodoro} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Short Break</Form.Label>
        <Form.Control type="number" min="1" defaultValue={parseInt(shortStr)} onChange={(e) => shortChange(e)} className={styles.shortbreak} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Long Break</Form.Label>
        <Form.Control type="number" min="1" defaultValue={parseInt(longStr)} onChange={(e) => longChange(e)} className={styles.longbreak} />
      </Form.Group>
    </div>
  );
};

export default Timers;