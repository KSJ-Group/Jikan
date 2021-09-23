import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap'
import styles from '../../styles/Settings/Settings.module.css';
import { minutesAndSecondsToMillis, millisToMinutesAndSeconds } from '../../helper/convertTime';

interface Props {
  pomodoroTime: number,
  shortBreakTime: number,
  longBreakTime: number,
  setPomodoroTime: Function,
  setShortBreakTime: Function,
  setLongBreakTime: Function,
  setShowSettings: Function
}

const Timers: React.FC<Props> = ({ pomodoroTime, shortBreakTime, longBreakTime, setPomodoroTime, setShortBreakTime, setLongBreakTime, setShowSettings }) => {
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

  const resetTimer = (e: any) => {
    setPomodoroTime(1500000);
    setPomStr('25');
    setShortBreakTime(300000);
    setShortStr('5');
    setLongBreakTime(900000);
    setLongStr('15');
    setShowSettings(false);
  }

  return (
    <div className={styles.timers}>
      <Form.Group controlId="formBasicEmail" className={styles.pomodoro}>
        <Form.Label className={styles.timerLabel}>Pomodoro</Form.Label>
        <Form.Control type="number" min="1" defaultValue={parseInt(pomStr)} onChange={(e) => pomChange(e)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className={styles.shortbreak}>
        <Form.Label className={styles.timerLabel}>Short Break</Form.Label>
        <Form.Control type="number" min="1" defaultValue={parseInt(shortStr)} onChange={(e) => shortChange(e)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className={styles.longbreak}>
        <Form.Label className={styles.timerLabel}>Long Break</Form.Label>
        <Form.Control type="number" min="1" defaultValue={parseInt(longStr)} onChange={(e) => longChange(e)} />
      </Form.Group>

      <button onClick={resetTimer} className={styles.resetBtn}>Reset</button>
    </div>
  );
};

export default Timers;