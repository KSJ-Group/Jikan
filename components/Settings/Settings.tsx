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
import Blacklist from "./Blacklist";

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
    setAlertVolume
  } = useContext(SettingsContext);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  // const [sliderClicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  // useEffect(() => {
  //   if (showSettings) {
  //     swipe();
  //   }
  // }, [showSettings])

  // const swipe = () => {
  //   document.addEventListener('touchstart', handleTouchStart, false);
  //   document.addEventListener('touchmove', handleTouchMove, false);
  //   var xDown = null;
  //   var yDown = null;

  //   function getTouches(evt) {
  //     return evt.touches ||             // browser API
  //       evt.originalEvent.touches; // jQuery
  //   }

  //   function handleTouchStart(evt) {
  //     const firstTouch = getTouches(evt)[0];
  //     xDown = firstTouch.clientX;
  //     yDown = firstTouch.clientY;
  //   };

  //   function handleTouchMove(evt) {
  //     if (!xDown || !yDown) {
  //       return;
  //     }

  //     var xUp = evt.touches[0].clientX;
  //     var yUp = evt.touches[0].clientY;

  //     var xDiff = xDown - xUp;
  //     var yDiff = yDown - yUp;

  //     if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
  //       if (xDiff < 0 && !sliderClicked) {
  //         console.log('right swipe!')
  //         setShowSettings(false);
  //       }
  //     }
  //     /* reset values */
  //     xDown = null;
  //     yDown = null;
  //   };
  // }

  return (
    <div className={styles.settingsDiv} id="touchsurface">
      <Offcanvas
        show={showSettings}
        onHide={() => setShowSettings(false)}
        placement="end"
        className={styles.settings}
      >
        <Offcanvas.Body className={styles.body}>
          <div className={styles.subBody}>
            <Login />
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
                <Brightness
                  brightness={brightness}
                  setBrightness={setBrightness}
                />
                <div id="swipelocation">
                  <ShowSeconds
                    showSeconds={showSeconds}
                    setShowSeconds={setShowSeconds}
                  />
                  <TimeFormat is24Hour={is24Hour} setIs24Hour={setIs24Hour} />
                  <Font
                    selectedFont={selectedFont}
                    setSelectedFont={setSelectedFont}
                  />
                </div>
                <Music selectedMusic={selectedMusic} setMusic={setMusic} music={music} musicVolume={musicVolume} setMusicVolume={setMusicVolume} />
                {/* <Blacklist /> */}
                <Blur blur={blur} setBlur={setBlur} />
                <ChangeBackground />
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
                <Brightness
                  brightness={brightness}
                  setBrightness={setBrightness}
                />
                <div id="swipelocation">
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
                </div>
                <AlertSound
                  selectedAlert={selectedAlert}
                  setSelectedAlert={setSelectedAlert}
                  alertVolume={alertVolume}
                  setAlertVolume={setAlertVolume}
                />
                <Music selectedMusic={selectedMusic} setMusic={setMusic} music={music} musicVolume={musicVolume} setMusicVolume={setMusicVolume} />
                <Blur blur={blur} setBlur={setBlur} />
                <ChangeBackground />
              </div>
            )}
          </div>
        </Offcanvas.Body>
        <AboutModal setShowSettings={setShowSettings} />
      </Offcanvas>
    </div>
  );
};

export default Settings;
