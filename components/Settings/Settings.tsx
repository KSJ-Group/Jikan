import React, { useState, useEffect, useContext } from "react";
import { Offcanvas } from "react-bootstrap";
import { SettingsContext } from "../SettingsContext";
import { StylesContext } from "../StylesContext";
import styles from "../../styles/Settings/Settings.module.css";
import Login from "./Login";
import Timers from "./Timers";
import AlertSound from "./AlertSound";
import Brightness from "./Brightness";
import AutoStarBreak from "./AutoStartBreak";
import Font from "./Font";
import ShowSeconds from "./ShowSeconds";
import Blur from "./Blur";
import TimeFormat from "./TimeFormat";
import ChangeBackground from "./Background/ChangeBackground";
import Music from "./Music";
import Image from 'next';

interface Props {
  showSettings: boolean;
  setShowSettings: any;
}

const Settings: React.FC<Props> = ({ showSettings, setShowSettings }) => {
  const {
    selectedFont,
    setSelectedFont,
    brightness,
    setBrightness,
    blur,
    setBlur
  } = useContext(StylesContext);

  const {
    isClock,
    isLoggedIn,
    pomodoroTime,
    setPomodoroTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime,
    autoStartBreak,
    setAutoStartBreak,
    showSeconds,
    setShowSeconds,
    is24Hour,
    setIs24Hour,
    selectedAlert,
    setSelectedAlert,
    selectedMusic,
    setMusic
  } = useContext(SettingsContext);

  return (
    <div className={styles.settingsDiv}>
      <Offcanvas
        show={showSettings}
        onHide={() => setShowSettings(false)}
        placement="end"
        className={styles.settings}
      >
        <Offcanvas.Body className={styles.body}>
          {isClock ? (
            // Clock settings
            <div>
              <div className={styles.settingsTop}>
                <h2>Clock Settings</h2>
                <img src="/images/profile.png" alt='profile icon' className={styles.profileIcon} />
                <button
                  className={styles.x}
                  onClick={() => setShowSettings(false)}
                >
                  Close
                </button>
              </div>
              <Brightness
                brightness={brightness}
                setBrightness={setBrightness}
              />
              <ShowSeconds
                showSeconds={showSeconds}
                setShowSeconds={setShowSeconds}
              />
              <TimeFormat is24Hour={is24Hour} setIs24Hour={setIs24Hour} />
              <Font
                selectedFont={selectedFont}
                setSelectedFont={setSelectedFont}
              />
              <Music selectedMusic={selectedMusic} setMusic={setMusic} />
              <Blur blur={blur} setBlur={setBlur} />
              <ChangeBackground />
            </div>
          ) : (
            // Pomodoro settings
            <div>
              <div className={styles.settingsTop}>
                <h2>Pomodoro Settings</h2>
                <img src="/images/profile.png" alt='profile icon' className={styles.profileIcon2} />
                <button
                  className={styles.x}
                  onClick={() => setShowSettings(false)}
                >
                  Close
                </button>
              </div>
              <Brightness
                brightness={brightness}
                setBrightness={setBrightness}
              />
              <Timers
                pomodoroTime={pomodoroTime}
                setPomodoroTime={setPomodoroTime}
                shortBreakTime={shortBreakTime}
                setShortBreakTime={setShortBreakTime}
                longBreakTime={longBreakTime}
                setLongBreakTime={setLongBreakTime}
                setShowSettings={setShowSettings}
              />
              <AutoStarBreak
                autoStartBreak={autoStartBreak}
                setAutoStartBreak={setAutoStartBreak}
              />
              <AlertSound
                selectedAlert={selectedAlert}
                setSelectedAlert={setSelectedAlert}
              />
              <Font
                selectedFont={selectedFont}
                setSelectedFont={setSelectedFont}
              />
              <Music selectedMusic={selectedMusic} setMusic={setMusic} />
              <Blur blur={blur} setBlur={setBlur} />
              <ChangeBackground />
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Settings;
