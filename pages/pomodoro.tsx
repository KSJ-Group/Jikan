import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Pomodoro/Pomodoro.module.css';
import Head from 'next/head';
import { millisToMinutesAndSeconds, minutesAndSecondsToMillis } from '../helper/convertTime';
import AreYouSureModal from '../components/AreYouSureModal';
import TimerDoneModal from '../components/TimerModal';

const { Howl, Howler } = require('howler');

let timer: number;
var alert = new Howl({
  src: 'alarm.wav',
  loop: true
});

const pomodoro: NextPage = () => {
  const [pomodoro, setPomodoro] = useState<boolean>(true);
  const [shortBreak, setShortBreak] = useState<boolean>(false);
  const [longBreak, setLongBreak] = useState<boolean>(false);

  const [pomodoroTime, setPomodoroTime] = useState<any>(1500000);
  const [shortBreakTime, setShortBreakTime] = useState<any>(300000);
  const [longBreakTime, setLongBreakTime] = useState<any>(900000);
  const [currentTime, setCurrentTime] = useState<any>('');

  const [started, setStarted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [targetMode, setTargetMode] = useState<string>('');

  const [timerModal, setShowTimerModal] = useState<boolean>(false);
  const [alertTone, setAlertTone] = useState<string>('alarm.wav');
  const [alarmOn, setAlarmOn] = useState<boolean>(false);

  useEffect(() => {
    alert.src = alertTone;
    setPomodoroTime(millisToMinutesAndSeconds(pomodoroTime))
    setShortBreakTime(millisToMinutesAndSeconds(shortBreakTime))
    setLongBreakTime(millisToMinutesAndSeconds(longBreakTime))
  }, [])

  useEffect(() => {
    setStarted(false);
    if (pomodoro) {
      stopTimer();
      setShortBreakTime(millisToMinutesAndSeconds(10000));
      setLongBreakTime(millisToMinutesAndSeconds(900000));
      document.getElementById('link4')?.classList.add('activePomLink');
      document.getElementById('link5')?.classList.remove('activePomLink');
      document.getElementById('link6')?.classList.remove('activePomLink');
    } else if (shortBreak) {
      stopTimer();
      setPomodoroTime(millisToMinutesAndSeconds(1500000));
      setLongBreakTime(millisToMinutesAndSeconds(900000));
      document.getElementById('link5')?.classList.add('activePomLink');
      document.getElementById('link4')?.classList.remove('activePomLink');
      document.getElementById('link6')?.classList.remove('activePomLink');
    } else if (longBreak) {
      stopTimer();
      setPomodoroTime(millisToMinutesAndSeconds(1500000));
      setShortBreakTime(millisToMinutesAndSeconds(300000));
      document.getElementById('link6')?.classList.add('activePomLink');
      document.getElementById('link4')?.classList.remove('activePomLink');
      document.getElementById('link5')?.classList.remove('activePomLink');
    }
  }, [pomodoro, shortBreak, longBreak])

  const linkClickHandler = (target: string): void => {
    if (target === 'Pomodoro' && !pomodoro) {
      if (started) {
        setShowModal(true);
        setTargetMode('pomodoro');
      } else {
        switchToPom();
      }
    } else if (target === 'Short Break' && !shortBreak) {
      if (started) {
        setShowModal(true);
        setTargetMode('short');
      } else {
        switchToShort();
      }
    } else if (target === 'Long Break' && !longBreak) {
      if (started) {
        setShowModal(true);
        setTargetMode('long');
      } else {
        switchToLong();
      }
    }
  }

  const handleClose = (): void => {
    setShowModal(false)
  };

  const switchToPom = (): void => {
    setPomodoro(true);
    setShortBreak(false);
    setLongBreak(false);
  }

  const switchToShort = (): void => {
    setShortBreak(true);
    setPomodoro(false);
    setLongBreak(false);
  }

  const switchToLong = (): void => {
    setLongBreak(true);
    setPomodoro(false);
    setShortBreak(false);
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
            timeUpHandler();
          }
          setCurrentTime(newTime);
          return newTime;
        })
      }
    } else if (shortBreak) {
      setShortBreakTime((prevState: string) => {
        let newTime = millisToMinutesAndSeconds((minutesAndSecondsToMillis(prevState) - 1000));
        if (newTime === '0:00') {
          timeUpHandler();
        }
        setCurrentTime(newTime);
        return newTime;
      });
    } else if (longBreak) {
      setLongBreakTime((prevState: string) => {
        let newTime = millisToMinutesAndSeconds((minutesAndSecondsToMillis(prevState) - 1000));
        if (newTime === '0:00') {
          timeUpHandler();
        }
        setCurrentTime(newTime);
        return newTime;
      });
    }
  }

  const stopTimer = (): void => {
    clearInterval(timer);
    timer = 0;
  }

  const timeUpHandler = (): void => {
    stopTimer();
    alarmHandler();
    setShowTimerModal(true);
  }

  const alarmHandler = (): void => {
    if (alarmOn) {
      setAlarmOn(false);
      alert.stop();
      alert.loop = false;
      setShowTimerModal(false);
      setPomodoroTime(millisToMinutesAndSeconds(1500000));
      setShortBreakTime(millisToMinutesAndSeconds(300000));
      setLongBreakTime(millisToMinutesAndSeconds(900000));
      setStarted(false);
    } else {
      window.focus();
      setAlarmOn(true);
      alert.play();
    }
  }

  return (
    <div className={styles.pomodoro}>
      <div className={styles.container}>
        <Head>
          {currentTime ? <title>{currentTime} | Jikan</title> : <title>Jikan | Pomodoro </title>}
          <meta name="description" content="Track time" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.links}>
          <div className={styles.link} id='link4' onClick={(e: any): void => linkClickHandler(e.target.innerHTML)}>Pomodoro</div>
          <div className={styles.link} id='link5' onClick={(e: any): void => linkClickHandler(e.target.innerHTML)}>Short Break</div>
          <div className={styles.link} id='link6' onClick={(e: any): void => linkClickHandler(e.target.innerHTML)}>Long Break</div>
        </div>
        {pomodoro ? <div className={styles.timer}>{pomodoroTime}</div> : null}
        {shortBreak ? <div className={styles.timer}>{shortBreakTime}</div> : null}
        {longBreak ? <div className={styles.timer}>{longBreakTime}</div> : null}
        {!started ? <div className={styles.startBtn} onClick={() => startClickHandler()}>START</div> : <div className={styles.startBtn} onClick={() => stopClickHandler()}>STOP</div>}
        {showModal ? <AreYouSureModal show={showModal} handleClose={handleClose} switchToPom={switchToPom} switchToShort={switchToShort} switchToLong={switchToLong} targetMode={targetMode} /> : null}
        {timerModal ? <TimerDoneModal show={timerModal} handleClose={alarmHandler} /> : null}
      </div>
    </div>
  );
};

export default pomodoro;