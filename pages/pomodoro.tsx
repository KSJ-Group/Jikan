import { useEffect, useState, useContext } from "react";
import type { NextPage } from "next";
import styles from "../styles/Pomodoro/Pomodoro.module.css";
import Head from "next/head";
import {
  millisToMinutesAndSeconds,
  minutesAndSecondsToMillis,
} from "../helper/convertTime";
import AreYouSureModal from "../components/AreYouSureModal";
import TimerDoneModal from "../components/TimerModal";
import { SettingsContext } from "../components/SettingsContext";
import { StylesContext } from "../components/StylesContext";
import { ClockFont } from "../styles/Global/global.style";

const { Howl } = require("howler");
var alert: any;

let timer: number;

const pomodoro: NextPage = () => {
  const [pomodoro, setPomodoro] = useState<boolean>(true);
  const [shortBreak, setShortBreak] = useState<boolean>(false);
  const [longBreak, setLongBreak] = useState<boolean>(false);

  const { pomodoroTime, shortBreakTime, longBreakTime } =
    useContext(SettingsContext);

  const [pomodoroTime2, setPomodoroTime] = useState<any>(0);
  const [shortBreakTime2, setShortBreakTime] = useState<any>(0);
  const [longBreakTime2, setLongBreakTime] = useState<any>(0);
  const [currentTime, setCurrentTime] = useState<any>("");

  const [started, setStarted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [targetMode, setTargetMode] = useState<string>("");

  const [timerModal, setShowTimerModal] = useState<boolean>(false);
  const [alarmOn, setAlarmOn] = useState<boolean>(false);
  const [autoStart, setAutoStart] = useState<boolean>(false);

  const { selectedFont } = useContext(StylesContext);
  const { selectedAlert, autoStartBreak } = useContext(SettingsContext);

  const [switchFromModal, setSwitch] = useState<boolean>(false);

  useEffect(() => {
    alert = new Howl({
      src: selectedAlert,
      loop: true,
      volume: 0.5,
    });
  }, [selectedAlert]);

  useEffect(() => {
    setPomodoroTime(millisToMinutesAndSeconds(pomodoroTime));
    setShortBreakTime(millisToMinutesAndSeconds(shortBreakTime));
    setLongBreakTime(millisToMinutesAndSeconds(longBreakTime));
    if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, [pomodoroTime, shortBreakTime, longBreakTime]);

  useEffect(() => {
    setStarted(false);
    if (switchFromModal) {
      setTimeout(() => {
        setStarted(true);
        timer = window.setInterval(startTimer, 1000);
      }, 1000);
      setSwitch(false);
    }
    if (pomodoro) {
      stopTimer();
      setShortBreakTime(millisToMinutesAndSeconds(shortBreakTime));
      setLongBreakTime(millisToMinutesAndSeconds(longBreakTime));
      document.getElementById("link4")?.classList.add("activePomLink");
      document.getElementById("link5")?.classList.remove("activePomLink");
      document.getElementById("link6")?.classList.remove("activePomLink");
    } else if (shortBreak) {
      stopTimer();
      setPomodoroTime(millisToMinutesAndSeconds(pomodoroTime));
      setLongBreakTime(millisToMinutesAndSeconds(longBreakTime));
      document.getElementById("link5")?.classList.add("activePomLink");
      document.getElementById("link4")?.classList.remove("activePomLink");
      document.getElementById("link6")?.classList.remove("activePomLink");
    } else if (longBreak) {
      stopTimer();
      setPomodoroTime(millisToMinutesAndSeconds(pomodoroTime));
      setShortBreakTime(millisToMinutesAndSeconds(shortBreakTime));
      document.getElementById("link6")?.classList.add("activePomLink");
      document.getElementById("link4")?.classList.remove("activePomLink");
      document.getElementById("link5")?.classList.remove("activePomLink");
    }
  }, [pomodoro, shortBreak, longBreak]);

  const showNotification = () => {
    if (autoStartBreak === "Short break") {
      const notification = new Notification("Jikan", {
        body: "Good job! Your pomodoro time is up. Short break auto-starting.",
      });
    } else if (autoStartBreak === "Long break") {
      const notification = new Notification("Jikan", {
        body: "Good job! Your pomodoro time is up. Long break auto-starting.",
      });
    } else if (pomodoro) {
      const notification = new Notification("Jikan", {
        body: "Good job! Your pomodoro time is up.",
      });
    } else if (shortBreak) {
      const notification = new Notification("Jikan", {
        body: "Your short break is over!",
      });
    } else {
      const notification = new Notification("Jikan", {
        body: "Your long break is over!",
      });
    }
  };

  const linkClickHandler = (target: string): void => {
    if (target === "Pomodoro" && !pomodoro) {
      if (started) {
        setShowModal(true);
        setTargetMode("pomodoro");
      } else {
        switchToPom();
      }
    } else if (target === "Short Break" && !shortBreak) {
      if (started) {
        setShowModal(true);
        setTargetMode("short");
      } else {
        switchToShort();
      }
    } else if (target === "Long Break" && !longBreak) {
      if (started) {
        setShowModal(true);
        setTargetMode("long");
      } else {
        switchToLong();
      }
    }
  };

  const handleClose = (): void => {
    setShowModal(false);
  };

  const switchToPom = (): void => {
    setPomodoro(true);
    setShortBreak(false);
    setLongBreak(false);
  };

  const switchToShort = (): void => {
    setShortBreak(true);
    setPomodoro(false);
    setLongBreak(false);
  };

  const switchToLong = (): void => {
    setLongBreak(true);
    setPomodoro(false);
    setShortBreak(false);
  };

  const startClickHandler = (): void => {
    setStarted(true);
    if (pomodoro) {
      if (autoStartBreak === "Short break" || autoStartBreak === "Long break") {
        setAutoStart(true);
      }
    }
    timer = window.setInterval(startTimer, 1000);
  };

  const stopClickHandler = (): void => {
    setStarted(false);
    if (pomodoro) {
      stopTimer();
    } else if (shortBreak) {
      if (autoStartBreak === "Short break" || autoStartBreak === "Long break") {
        setAutoStart(false);
      }
      stopTimer();
    } else if (longBreak) {
      stopTimer();
    }
  };

  const startTimer = (): void => {
    if (pomodoro) {
      setPomodoroTime((prevState: string) => {
        let newTime = millisToMinutesAndSeconds(
          minutesAndSecondsToMillis(prevState) - 1000
        );
        if (newTime === "0:00") {
          timeUpHandler();
        }
        setCurrentTime(newTime);
        return newTime;
      });
    } else if (shortBreak) {
      setShortBreakTime((prevState: string) => {
        let newTime = millisToMinutesAndSeconds(
          minutesAndSecondsToMillis(prevState) - 1000
        );
        if (newTime === "0:00") {
          timeUpHandler();
        }
        setCurrentTime(newTime);
        return newTime;
      });
    } else if (longBreak) {
      setLongBreakTime((prevState: string) => {
        let newTime = millisToMinutesAndSeconds(
          minutesAndSecondsToMillis(prevState) - 1000
        );
        if (newTime === "0:00") {
          timeUpHandler();
        }
        setCurrentTime(newTime);
        return newTime;
      });
    }
  };

  const stopTimer = (): void => {
    clearInterval(timer);
    timer = 0;
  };

  const timeUpHandler = (): void => {
    if (
      pomodoro &&
      (autoStartBreak === "Short break" || autoStartBreak === "Long break")
    ) {
      startBreak();
    } else {
      stopTimer();
      alarmHandler();
      setShowTimerModal(true);
    }
  };

  const alarmHandler = (): void => {
    if (alarmOn) {
      setAlarmOn(false);
      alert.stop();
      setShowTimerModal(false);
      setPomodoroTime(millisToMinutesAndSeconds(pomodoroTime));
      setShortBreakTime(millisToMinutesAndSeconds(shortBreakTime));
      setLongBreakTime(millisToMinutesAndSeconds(longBreakTime));
      setStarted(false);
      if (pomodoro) {
        setCurrentTime(millisToMinutesAndSeconds(pomodoroTime));
      } else if (shortBreak) {
        setCurrentTime(millisToMinutesAndSeconds(shortBreakTime));
      } else if (longBreak) {
        setCurrentTime(millisToMinutesAndSeconds(longBreakTime));
      }
    } else {
      if (Notification.permission === "granted") {
        showNotification();
      }
      setAlarmOn(true);
      alert.play();
      setTimeout(() => {
        alert.stop();
      }, 60000);
    }
  };

  const startBreak = (): void => {
    if (autoStartBreak === "Short break") {
      if (Notification.permission === "granted") {
        showNotification();
      }
      setAlarmOn(true);
      alert.play();
      setTimeout(() => {
        setAlarmOn(false);
        alert.stop();
      }, 5000);
      setPomodoro(false);
      setShortBreak(true);
    } else if (autoStartBreak === "Long break") {
      if (Notification.permission === "granted") {
        showNotification();
      }
      setAlarmOn(true);
      alert.play();
      setTimeout(() => {
        setAlarmOn(false);
        alert.stop();
      }, 5000);
      setPomodoro(false);
      setLongBreak(true);
    }
  };

  const breakFromModal = (choice: string): void => {
    if (choice === "pomodoro") {
      setSwitch(true);
      switchToPom();
      alert.stop();
    } else if (choice === "shortBreak") {
      setSwitch(true);
      switchToShort();
      alert.stop();
    } else if (choice === "longBreak") {
      setSwitch(true);
      switchToLong();
      alert.stop();
    }
  };

  useEffect(() => {
    if (shortBreak && autoStartBreak === "Short break" && autoStart) {
      setTimeout(() => {
        startClickHandler();
      }, 1000);
    } else if (longBreak && autoStartBreak === "Long break" && autoStart) {
      setTimeout(() => {
        startClickHandler();
      }, 1000);
    }
  }, [shortBreak, longBreak]);

  return (
    <div className={styles.pomodoro}>
      <div className={styles.container}>
        <Head>
          {currentTime ? (
            <title>{currentTime} | Jikan</title>
          ) : (
            <title>Jikan | Pomodoro </title>
          )}
          <meta name="description" content="Track time" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.linksDiv}>
          <div
            className={styles.link}
            id="link4"
            onClick={(e: any): void => linkClickHandler(e.target.innerHTML)}
          >
            Pomodoro
          </div>
          <div
            className={styles.link}
            id="link5"
            onClick={(e: any): void => linkClickHandler(e.target.innerHTML)}
          >
            Short Break
          </div>
          <div
            className={styles.link}
            id="link6"
            onClick={(e: any): void => linkClickHandler(e.target.innerHTML)}
          >
            Long Break
          </div>
        </div>
        <div className={styles.timerDiv}>
          <ClockFont font={selectedFont}>
            {pomodoro ? (
              <div className={styles.timer}>{pomodoroTime2}</div>
            ) : null}
            {shortBreak ? (
              <div className={styles.timer} id="shortBreak">
                {shortBreakTime2}
              </div>
            ) : null}
            {longBreak ? (
              <div className={styles.timer}>{longBreakTime2}</div>
            ) : null}
          </ClockFont>
        </div>
        <div className={styles.btnDiv}>
          {!started ? (
            <div
              className={styles.startBtn}
              onClick={() => startClickHandler()}
            >
              START
            </div>
          ) : (
            <div className={styles.startBtn} onClick={() => stopClickHandler()}>
              STOP
            </div>
          )}
        </div>
        {showModal ? (
          <AreYouSureModal
            show={showModal}
            handleClose={handleClose}
            switchToPom={switchToPom}
            switchToShort={switchToShort}
            switchToLong={switchToLong}
            targetMode={targetMode}
          />
        ) : null}
        {timerModal ? (
          <TimerDoneModal
            show={timerModal}
            breakFromModal={breakFromModal}
            handleClose={alarmHandler}
          />
        ) : null}
      </div>
    </div>
  );
};

export default pomodoro;
