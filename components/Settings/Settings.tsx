import React, { useState, useEffect, useContext } from "react";
import { Offcanvas } from "react-bootstrap";
import { BackgroundContext } from "../BackgroundContext";
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
import Search from "./Background/Search";
import Color from "./Background/Color";
import ChangeBackground from "./Background/ChangeBackground";

interface Props {
  showSettings: boolean;
  setShowSettings: any;
}

const Settings: React.FC<Props> = ({ showSettings, setShowSettings }) => {
  const { loaded } = useContext(BackgroundContext);
  const {
    selectedFont,
    setSelectedFont,
    brightness,
    setBrightness,
    blur,
    setBlur,
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
  } = useContext(SettingsContext);

  return (
    <>
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
                <button
                  className={styles.x}
                  onClick={() => setShowSettings(false)}
                >
                  Close
                </button>
              </div>
              {isLoggedIn ? <div>Profile</div> : <Login />}
              <Brightness
                brightness={brightness}
                setBrightness={setBrightness}
              />
              <ShowSeconds
                showSeconds={showSeconds}
                setShowSeconds={setShowSeconds}
              />
              <TimeFormat is24Hour={is24Hour} setIs24Hour={setIs24Hour} />
              <Blur blur={blur} setBlur={setBlur} />
              <Font
                selectedFont={selectedFont}
                setSelectedFont={setSelectedFont}
              />
              <ChangeBackground />
            </div>
          ) : (
            // Pomodoro settings
            <div>
              <div className={styles.settingsTop}>
                <h2>Pomodoro Settings</h2>
                <button
                  className={styles.x}
                  onClick={() => setShowSettings(false)}
                >
                  Close
                </button>
              </div>
              {isLoggedIn ? <div>Profile</div> : <Login />}
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
              <Blur blur={blur} setBlur={setBlur} />
              <AlertSound
                selectedAlert={selectedAlert}
                setSelectedAlert={setSelectedAlert}
              />
              <Font
                selectedFont={selectedFont}
                setSelectedFont={setSelectedFont}
              />
              <ChangeBackground />
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Settings;
