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
import AboutModal from "../AboutModal";
import Weather from "./Weather";
import Spotify from "./Spotify/Spotify";

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
    setMusic,
    music,
    musicVolume,
    setMusicVolume,
    alertVolume,
    setAlertVolume,
    zip,
    setZip,
    setCurrentWeather,
  } = useContext(SettingsContext);

  const [el, setEl] = useState<HTMLElement>();

  useEffect(() => {
    setEl(document.getElementById('settings-element')!);
  });

  return (
    <div className={styles.settingsDiv}>
      <Offcanvas
        show={showSettings}
        onHide={() => setShowSettings(false)}
        placement="end"
        className={styles.settings}
      >
        <Offcanvas.Body className={styles.body}>
          <div className={styles.subBody} id="settings-element">
            {/* <Login /> */}
            {isClock ? (
              // Clock settings
              <div>
                <div className={styles.settingsTop}>
                  <div className={styles.settingsTitle}>Clock Settings</div>
                  <button
                    className={styles.x}
                    onClick={() => setShowSettings(false)}
                  >
                    Close
                  </button>
                </div>
                <div className={styles.toggleRow}>
                  <ShowSeconds
                    showSeconds={showSeconds}
                    setShowSeconds={setShowSeconds}
                  />
                  <TimeFormat is24Hour={is24Hour} setIs24Hour={setIs24Hour} />
                </div>
                <Font
                  selectedFont={selectedFont}
                  setSelectedFont={setSelectedFont}
                />
                <Music selectedMusic={selectedMusic} setMusic={setMusic} music={music} musicVolume={musicVolume} setMusicVolume={setMusicVolume} />
                <Spotify />
                <Weather zip={zip} setZip={setZip} setCurrentWeather={setCurrentWeather} />
                <Brightness
                  brightness={brightness}
                  setBrightness={setBrightness}
                />
                <Blur blur={blur} setBlur={setBlur} />
                <ChangeBackground el={el} />
              </div>
            ) : (
              // Pomodoro settings
              <div>
                <div className={styles.settingsTop}>
                  <div className={styles.settingsTitle}>Pomodoro Settings</div>
                  <button
                    className={styles.x}
                    onClick={() => setShowSettings(false)}
                  >
                    Close
                  </button>
                </div>
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
                <Font
                  selectedFont={selectedFont}
                  setSelectedFont={setSelectedFont}
                />
                <AlertSound
                  selectedAlert={selectedAlert}
                  setSelectedAlert={setSelectedAlert}
                  alertVolume={alertVolume}
                  setAlertVolume={setAlertVolume}
                />
                <Music selectedMusic={selectedMusic} setMusic={setMusic} music={music} musicVolume={musicVolume} setMusicVolume={setMusicVolume} />
                <Spotify />
                <Weather zip={zip} setZip={setZip} setCurrentWeather={setCurrentWeather} />
                <Brightness
                  brightness={brightness}
                  setBrightness={setBrightness}
                />
                <Blur blur={blur} setBlur={setBlur} />
                <ChangeBackground el={el} />
              </div>
            )}
          </div>
        </Offcanvas.Body>
        <AboutModal setShowSettings={setShowSettings} />
      </Offcanvas>
    </div >
  );
};

export default Settings;
