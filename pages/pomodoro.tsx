import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Pomodoro.module.css';
import Head from 'next/head';
import { millisToMinutesAndSeconds, minutesAndSecondsToMillis } from '../helper/convertTime';

// let pomodoroTimer: number;
// let shortBreakTimer: number;
// let longBreakTimer: number;

let timer: number;

const pomodoro: NextPage = () => {
  const [pomodoro, setPomodoro] = useState<boolean>(true);
  const [shortBreak, setShortBreak] = useState<boolean>(false);
  const [longBreak, setLongBreak] = useState<boolean>(false);

  const [pomodoroTime, setPomodoroTime] = useState<any>(1500000);
  const [shortBreakTime, setShortBreakTime] = useState<any>(300000);
  const [longBreakTime, setLongBreakTime] = useState<any>(900000);

  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    setPomodoroTime(millisToMinutesAndSeconds(pomodoroTime))
    setShortBreakTime(millisToMinutesAndSeconds(shortBreakTime))
    setLongBreakTime(millisToMinutesAndSeconds(longBreakTime))
  }, [])

  useEffect(() => {
    setStarted(false);
    if (pomodoro) {
      setShortBreakTime(millisToMinutesAndSeconds(300000));
      setLongBreakTime(millisToMinutesAndSeconds(900000));
    } else if (shortBreak) {
      setPomodoroTime(millisToMinutesAndSeconds(1500000));
      setLongBreakTime(millisToMinutesAndSeconds(900000));
    } else if (longBreak) {
      setPomodoroTime(millisToMinutesAndSeconds(1500000));
      setShortBreakTime(millisToMinutesAndSeconds(300000));
    }
  }, [pomodoro, shortBreak, longBreak])

  const linkClickHandler = (target: string): void => {
    if (target === 'Pomodoro') {
      setPomodoro(true);
      setShortBreak(false);
      setLongBreak(false);
    } else if (target === 'Short Break') {
      setShortBreak(true);
      setPomodoro(false);
      setLongBreak(false);
    } else if (target === 'Long Break') {
      setLongBreak(true);
      setPomodoro(false);
      setShortBreak(false);
    }
  }

  const startClickHandler = (): void => {
    setStarted(true);
    if (pomodoro) {
      timer = window.setInterval(startTimer, 1000);
    } else if (shortBreak) {
      timer = window.setInterval(startTimer, 1000);
    } else if (longBreak) {
      timer = window.setInterval(startTimer, 1000);
    }
  }

  const stopClickHandler = (): void => {
    setStarted(false);
    if (pomodoro) {
      stopTimer();
    } else if (shortBreak) {
      stopTimer();
    } else if (longBreak) {
      stopTimer();
    }
  }

  const startTimer = (): void => {
    if (pomodoro) {
      if (minutesAndSecondsToMillis(pomodoroTime) > 0) {
        setPomodoroTime((prevState: string) => {
          let newTime = millisToMinutesAndSeconds((minutesAndSecondsToMillis(prevState) - 1000));
          if (newTime === '0:00') {
            stopTimer();
            playAlertSound();
          }
          return newTime;
        })
      }
    } else if (shortBreak) {
      setShortBreakTime((prevState: string) => {
        let newTime = millisToMinutesAndSeconds((minutesAndSecondsToMillis(prevState) - 1000));
        if (newTime === '0:00') {
          stopTimer();
          playAlertSound();
        }
        return newTime;
      });
    } else if (longBreak) {
      setLongBreakTime((prevState: string) => {
        let newTime = millisToMinutesAndSeconds((minutesAndSecondsToMillis(prevState) - 1000));
        if (newTime === '0:00') {
          stopTimer();
          playAlertSound();
        }
        return newTime;
      });
    }
  }

  const stopTimer = (): void => {
    clearInterval(timer);
    timer = 0;
  }

  const playAlertSound = (): void => {
    var audio = new Audio('alarm.wav');
    audio.play();
  }

  return (
    <div className={styles.pomodoro}>
      <div className={styles.container}>
        <Head>
          <title>Jikan | Pomodoro </title>
          <meta name="description" content="Track time" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.links}>
          <div className={styles.link} onClick={(e: any): void => linkClickHandler(e.target.innerHTML)}>Pomodoro</div>
          <div className={styles.link} onClick={(e: any): void => linkClickHandler(e.target.innerHTML)}>Short Break</div>
          <div className={styles.link} onClick={(e: any): void => linkClickHandler(e.target.innerHTML)}>Long Break</div>
        </div>
        {pomodoro ? <div className={styles.timer}>{pomodoroTime}</div> : null}
        {shortBreak ? <div className={styles.timer}>{shortBreakTime}</div> : null}
        {longBreak ? <div className={styles.timer}>{longBreakTime}</div> : null}
        {!started ? <div className={styles.startBtn} onClick={() => startClickHandler()}>START</div> : <div className={styles.startBtn} onClick={() => stopClickHandler()}>STOP</div>}
      </div>
    </div>
  );
};

export default pomodoro;