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
import styled from "styled-components";

interface Font {
  font: any;
  size: string;
  isMobile: boolean;
}

interface TimeFont {
  size: string;
  isMobile: boolean;
}

interface ContainerProps {
  size: string;
  isMobile: boolean;
  opacity: number;
  color: string;
}

const Container = styled.div<ContainerProps>`
  min-width: ${(props) => {
    if (!props.isMobile) {
      if (props.size === "small") {
        return '25vw';
      } else if (props.size === 'medium') {
        return '35vw'
      } else {
        return '45vw';
      }
    } else {
      return '95vw';
    }
  }};
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 3;
  background-color: ${props => `rgb(${props.color}, ${props.opacity / 100})` || 'rgb(0, 0, 0, 0.4)'};
  overflow: hidden;
  border-radius: 20px;

  @media screen and (max-width: 450px) {
    padding: 20px;
    margin-top: ${(props) => {
    if (props.size === "large") {
      return "-150px";
    } else {
      return "-220px";
    }
  }};
  }
`

const OtherFont = styled.span<Font>`
    font-family: ${(props) => props.font}, monospace;
    font-size: ${(props) => {
    if (!props.isMobile) {
      if (props.size === 'small') {
        return '1vw';
      } else if (props.size === 'medium') {
        return '1.25vw';
      } else if (props.size === 'large') {
        return '1.5vw';
      }
    } else {
      if (props.size === 'small') {
        return '3vw';
      } else if (props.size === 'medium') {
        return '4vw';
      } else if (props.size === 'large') {
        return '6vw';
      }
    }
  }};
`

const ClockFont = styled.div<TimeFont>`
  font-size: ${(props) => {
    if (!props.isMobile) {
      if (props.size === 'small') {
        return '6vw';
      } else if (props.size === 'medium') {
        return '10vw';
      } else if (props.size === 'large') {
        return '15vw';
      }
    } else {
      if (props.size === 'small') {
        return '12vw';
      } else if (props.size === 'medium') {
        return '18vw';
      } else if (props.size === 'large') {
        return '25vw';
      }
    }

  }};
  font-weight: bold;
  color: white;
`

const { Howl, Howler } = require("howler");
let alert: any;
let timer: number;

const pomodoro: NextPage = () => {
  const { pomodoroTime, shortBreakTime, selectedAlert, autoStartBreak, alertVolume, isMobile, started, setStarted } =
    useContext(SettingsContext);
  const { selectedFont, size, opacity, color } = useContext(StylesContext);

  const [pomodoro, setPomodoro] = useState<boolean>(true);
  const [shortBreak, setShortBreak] = useState<boolean>(false);
  const [pomodoroTime2, setPomodoroTime] = useState<any>(0);
  const [shortBreakTime2, setShortBreakTime] = useState<any>(0);
  const [currentTime, setCurrentTime] = useState<any>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [targetMode, setTargetMode] = useState<string>("");
  const [timerModal, setShowTimerModal] = useState<boolean>(false);
  const [alarmOn, setAlarmOn] = useState<boolean>(false);
  const [switchFromModal, setSwitch] = useState<boolean>(false);
  const [newVolume, setNewVolume] = useState<number>(0);

  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      if (started) {
        e.preventDefault();
        e.returnValue = true;
      }
    })
  }, [started])

  useEffect(() => {
    alert = new Howl({
      src: selectedAlert,
      loop: true,
      volume: 0.5,
    });
  }, [selectedAlert]);

  useEffect(() => {
    setNewVolume(alertVolume / 100);
  }, [alertVolume]);

  useEffect(() => {
    Howler.volume(newVolume);
  }, [newVolume]);

  useEffect(() => {
    setPomodoroTime(millisToMinutesAndSeconds(pomodoroTime));
    if (!isMobile) {
      if (Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }
  }, [pomodoroTime]);

  useEffect(() => {
    setShortBreakTime(millisToMinutesAndSeconds(shortBreakTime));
  }, [shortBreakTime])

  useEffect(() => {
    setStarted(false);
    if (switchFromModal) {
      setTimeout(() => {
        setStarted(true);
        timer = window.setInterval(startTimer, 1000);
      }, 500);
      setSwitch(false);
    }
    if (pomodoro) {
      stopTimer();
      setShortBreakTime(millisToMinutesAndSeconds(shortBreakTime));
      document.getElementById("link4")?.classList.add("activePomLink");
      document.getElementById("link5")?.classList.remove("activePomLink");
      document.getElementById("link6")?.classList.remove("activePomLink");
    } else if (shortBreak) {
      stopTimer();
      setPomodoroTime(millisToMinutesAndSeconds(pomodoroTime));
      document.getElementById("link5")?.classList.add("activePomLink");
      document.getElementById("link4")?.classList.remove("activePomLink");
      document.getElementById("link6")?.classList.remove("activePomLink");
    }
  }, [pomodoro, shortBreak]);

  const showNotification = () => {
    if (!isMobile) {
      if (autoStartBreak) {
        const notification = new Notification("Jikan", {
          body: "Good job! Your pomodoro time is up. Short break auto-starting.",
        });
      }
      else if (pomodoro) {
        const notification = new Notification("Jikan", {
          body: "Good job! Your pomodoro time is up.",
        });
      } else if (shortBreak) {
        const notification = new Notification("Jikan", {
          body: "Your short break is over!",
        });
      }
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
    }
  };

  const handleClose = (): void => {
    setShowModal(false);
  };

  const switchToPom = (): void => {
    setPomodoro(true);
    setShortBreak(false);
  };

  const switchToShort = (): void => {
    setShortBreak(true);
    setPomodoro(false);
  };

  const startClickHandler = (): void => {
    setStarted(true);
    timer = window.setInterval(startTimer, 1000);
  };

  const stopClickHandler = (): void => {
    setStarted(false);
    if (pomodoro) {
      stopTimer();
    } else if (shortBreak) {
      stopTimer();
    }
  };

  const startTimer = (): void => {
    if (pomodoro) {
      setPomodoroTime((prevState: string) => {
        const milli = minutesAndSecondsToMillis(prevState) - 1000;
        const newTime = millisToMinutesAndSeconds(milli);

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
    }
  };

  const timeUpHandler = (): void => {
    stopTimer();
    alarmHandler();
    if (!autoStartBreak) {
      setShowTimerModal(true);
    } else {
      if (pomodoro) {
        startBreak();
      } else if (shortBreak) {
        startPom();
      }
    }
  };

  const stopTimer = (): void => {
    clearInterval(timer);
    timer = 0;
    setStarted(false);
  };

  const alarmHandler = (): void => {
    if (alarmOn) {
      setAlarmOn(false);
      alert.stop();
      setShowTimerModal(false);
      setPomodoroTime(millisToMinutesAndSeconds(pomodoroTime));
      setShortBreakTime(millisToMinutesAndSeconds(shortBreakTime));
      if (pomodoro) {
        setCurrentTime(millisToMinutesAndSeconds(pomodoroTime));
      } else if (shortBreak) {
        setCurrentTime(millisToMinutesAndSeconds(shortBreakTime));
      }
    } else {
      if (!isMobile) {
        if (Notification.permission === "granted") {
          showNotification();
        }
      }
      setAlarmOn(true);
      alert.play();
      setTimeout(() => {
        alert.stop();
      }, 6000);
    }
  };

  const startBreak = (): void => {
    if (!isMobile) {
      if (Notification.permission === "granted") {
        showNotification();
      }
    }
    setAlarmOn(true);
    alert.play();
    setTimeout(() => {
      setAlarmOn(false);
      alert.stop();
    }, 5000);
    setSwitch(true);
    switchToShort();
  };

  const startPom = (): void => {
    if (!isMobile) {
      if (Notification.permission === "granted") {
        showNotification();
      }
    }
    setAlarmOn(true);
    alert.play();
    setTimeout(() => {
      setAlarmOn(false);
      alert.stop();
    }, 5000);
    setSwitch(true);
    switchToPom();
  }

  const breakFromModal = (choice: string): void => {
    if (choice === "pomodoro") {
      setSwitch(true);
      switchToPom();
      alert.stop();
    } else if (choice === "shortBreak") {
      setSwitch(true);
      switchToShort();
      alert.stop();
    }
  };

  return (
    <div className={styles.pomodoro}>
      <Container size={size} isMobile={isMobile} opacity={opacity} color={color}>
        <Head>
          {currentTime && started ? (
            <title>Jikan | {currentTime}</title>
          ) : (
            <title>Jikan | Pomodoro </title>
          )}
        </Head>
        <div className={styles.linksDiv}>
          <div
            className={styles.link}
            id="link4"
            onClick={(e: any): void => linkClickHandler(e.target.innerHTML)}
          >
            <OtherFont isMobile={isMobile} size={size} font={selectedFont}>Pomodoro</OtherFont>
          </div>
          <div
            className={styles.link}
            id="link5"
            onClick={(e: any): void => linkClickHandler('Short Break')}
          >
            <OtherFont isMobile={isMobile} size={size} font={selectedFont}>Break</OtherFont>
          </div>
        </div>
        <div className={styles.timerDiv}>
          <OtherFont isMobile={isMobile} size={size} font={selectedFont}>
            {pomodoro ? (
              <ClockFont isMobile={isMobile} size={size}>{pomodoroTime2}</ClockFont>
            ) : null}
            {shortBreak ? (
              <ClockFont isMobile={isMobile} size={size} id="shortBreak">
                {shortBreakTime2}
              </ClockFont>
            ) : null}
          </OtherFont>
        </div>
        <div className={styles.btnDiv}>
          {!started ? (
            <div
              className={styles.startBtn}
              onClick={() => startClickHandler()}
            >
              <OtherFont isMobile={isMobile} size={size} font={selectedFont}>Start</OtherFont>
            </div>
          ) : (
            <div className={styles.startBtn} onClick={() => stopClickHandler()}>
              <OtherFont isMobile={isMobile} size={size} font={selectedFont}>Stop</OtherFont>
            </div>
          )}
        </div>
        {
          showModal ? (
            <AreYouSureModal
              show={showModal}
              handleClose={handleClose}
              switchToPom={switchToPom}
              switchToShort={switchToShort}
              targetMode={targetMode}
            />
          ) : null
        }
        {
          timerModal ? (
            <TimerDoneModal
              show={timerModal}
              breakFromModal={breakFromModal}
              handleClose={alarmHandler}
              whichDone={pomodoro ? 'pomodoro' : 'break'}
            />
          ) : null
        }
      </Container >
    </div >
  );
};

export default pomodoro;
