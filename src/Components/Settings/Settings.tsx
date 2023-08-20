import React, { useContext, useEffect, useRef, useState } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { StylesContext } from "../../contexts/StylesContext";
import styles from "../../styles/Settings/Settings.module.css";
import Timers from "./Timers";
import AlertSound from "./AlertSound";
import Brightness from "./BrightnessOpacity";
import Font from "./Font";
import ShowSeconds from "./ShowSeconds";
import TimeFormat from "./TimeFormat";
import ChangeBackground from "./Background/ChangeBackground";
import AboutModal from "../AboutModal";
import Weather from "./Weather";
import Reset from "./Reset";
import Login from "./Login";
import styled from "styled-components";

interface Props {
  showSettings: boolean;
  setShowSettings: any;
}

const Wrapper = styled.div<{ show: boolean, loaded: boolean }>`
  position: absolute;
  top: 60px;
  right: ${props => props.show ? '0' : '-400px'};
  transition: 0.3s ease;
  display: ${props => props.loaded ? 'block' : 'none'};
`

const Settings: React.FC<Props> = ({ showSettings, setShowSettings }) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, [])

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
    breakTime,
    setBreakTime,
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
  const settingsRef: React.RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleOutsideClick = (e) => {
    if (settingsRef.current && !settingsRef.current.contains(e.target) && e.target.innerHTML !== 'Settings' && e.target.alt !== 'menu icon' && e.target.className !== 'Navbar_settings__3oRTC') {
      setShowSettings(false);
    }
  };

  return (
    <Wrapper show={showSettings} ref={settingsRef} loaded={loaded}>
      <div className={styles.body}>
        <Login />
        {isClock ? (
          // Clock settings
          <div className={styles.settings}>
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
              breakTime={breakTime}
              setBreakTime={setBreakTime}
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
      <AboutModal setShowSettings={setShowSettings} />
    </Wrapper>
  );
};

export default Settings;
