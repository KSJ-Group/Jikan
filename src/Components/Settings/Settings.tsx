import React, { useContext } from "react";
import { Offcanvas } from "react-bootstrap";
import { SettingsContext } from "../../contexts/SettingsContext";
import { StylesContext } from "../../contexts/StylesContext";
import styles from "../../styles/Settings/Settings.module.css";
import Timers from "./Timers";
import AlertSound from "./AlertSound";
import Brightness from "./Brightness";
import Font from "./Font";
import ShowSeconds from "./ShowSeconds";
import TimeFormat from "./TimeFormat";
import ChangeBackground from "./Background/ChangeBackground";
import AboutModal from "../AboutModal";
import Weather from "./Weather";
import Reset from "./Reset";

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
    size,
    setSize,
    opacity,
    setOpacity
  } = useContext(StylesContext);

  const {
    isClock,
    pomodoroTime,
    setPomodoroTime,
    shortBreakTime,
    setShortBreakTime,
    showSeconds,
    setShowSeconds,
    is24Hour,
    setIs24Hour,
    selectedAlert,
    setSelectedAlert,
    alertVolume,
    setAlertVolume,
    zip,
    setZip,
    setCurrentWeather
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
          <div className={styles.subBody} id="settings-body">
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
                  size={size}
                  setSize={setSize}
                />
                <Weather zip={zip} setZip={setZip} setCurrentWeather={setCurrentWeather} />
                <Brightness
                  brightness={brightness}
                  setBrightness={setBrightness}
                  opacity={opacity}
                  setOpacity={setOpacity}
                />
                <ChangeBackground />
                <Reset />
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
                  setShowSettings={setShowSettings}
                />
                <Font
                  selectedFont={selectedFont}
                  setSelectedFont={setSelectedFont}
                  size={size}
                  setSize={setSize}
                />
                <AlertSound
                  selectedAlert={selectedAlert}
                  setSelectedAlert={setSelectedAlert}
                  alertVolume={alertVolume}
                  setAlertVolume={setAlertVolume}
                />
                <Weather zip={zip} setZip={setZip} setCurrentWeather={setCurrentWeather} />
                <Brightness
                  brightness={brightness}
                  setBrightness={setBrightness}
                  opacity={opacity}
                  setOpacity={setOpacity}
                />
                <ChangeBackground />
                <Reset />
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
