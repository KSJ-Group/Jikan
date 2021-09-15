import { useEffect, useState } from 'react';
import styles from '../styles/Pomodoro.module.css';
import Head from 'next/head';

const pomodoro: React.FC = () => {
  const [pomodoro, setPomodoro] = useState<boolean>(true);
  const [shortBreak, setShortBreak] = useState<boolean>(false);
  const [longBreak, setLongBreak] = useState<boolean>(false);

  const [pomodoroTime, setPomodoroTime] = useState<any>(1500000);
  const [shortBreakTime, setShortBreakTime] = useState<any>(300000);
  const [longBreakTime, setLongBreakTime] = useState<any>(900000);

  const [started, setStarted] = useState<boolean>(false);
  let timer: NodeJS.Timeout;

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

  const millisToMinutesAndSeconds = (millis: number): string => {
    let minutes: number = Math.floor(millis / 60000);
    let seconds: any = ((millis % 60000) / 1000).toFixed(0);
    let time: string = `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
    if (time === '0:00') {
      clearInterval(timer);
      window.alert('Time is up!');
    }
    return time;
  }

  const minutesAndSecondsToMillis = (time: string): number => {
    let timeArr = time.split(':');
    let minutes: number = 0;
    let seconds: number = 0;
    let milliseconds: number = 0;
    if (timeArr[0].length === 1) {
      minutes = parseInt(time.slice(0, 1)) * 60000;
      seconds = parseInt(time.slice(2)) * 1000;
    } else if (timeArr[0].length === 2) {
      minutes = parseInt(time.slice(0, 2)) * 60000;
      seconds = parseInt(time.slice(3)) * 1000;
    }

    milliseconds = minutes + seconds;
    return milliseconds;
  }

  useEffect(() => {
    setPomodoroTime(millisToMinutesAndSeconds(pomodoroTime))
    setShortBreakTime(millisToMinutesAndSeconds(shortBreakTime))
    setLongBreakTime(millisToMinutesAndSeconds(longBreakTime))
  }, [])

  const linkClickHandler = (target: string) => {
    clearInterval(timer);
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
    timer = setInterval(startTimer, 1000);
  }

  const stopClickHandler = (): void => {
    setStarted(false);
    clearInterval(timer);
  }

  const startTimer = (): void => {
    if (pomodoro) {
      if (minutesAndSecondsToMillis(pomodoroTime) > 0) {
        setPomodoroTime((prevState: string) => {
          let newTime = millisToMinutesAndSeconds((minutesAndSecondsToMillis(prevState) - 1000));
          return newTime;
        })
      }
    } else if (shortBreak) {
      setShortBreakTime((prevState: string) => {
        let newTime = millisToMinutesAndSeconds((minutesAndSecondsToMillis(prevState) - 1000));
        return newTime;
      });
    } else if (longBreak) {
      setLongBreakTime((prevState: string) => {
        let newTime = millisToMinutesAndSeconds((minutesAndSecondsToMillis(prevState) - 1000));
        return newTime;
      });
    }
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