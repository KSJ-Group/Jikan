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


  const handleClick = (): void => {
    if (selectedMusic !== 'None') {
      window.open(selectedMusic, "_blank");
    }
  }

  const [touchsurface, setTouchsurface] = useState<any>(null);
  useEffect(() => {
    setTouchsurface(document.querySelector('#touchsurface'));
  }, [])

  var startX,
    startY,
    dist,
    threshold = 10, //required min distance traveled to be considered swipe
    allowedTime = 200, // maximum time allowed to travel that distance
    elapsedTime,
    startTime

  function handleswipe(isrightswipe) {
    if (isrightswipe) {
      setShowSettings(false)
      console.log('Swipe right');
    }
  }
  if (touchsurface !== null) {
    touchsurface.addEventListener('touchstart', function (e) {
      touchsurface.innerHTML = ''
      var touchobj = e.changedTouches[0]
      dist = 0
      startX = touchobj.pageX
      startY = touchobj.pageY
      startTime = new Date().getTime() // record time when finger first makes contact with surface
      e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function (e) {
      e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function (e) {
      var touchobj = e.changedTouches[0]
      dist = touchobj.pageX - startX // get total dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime // get time elapsed
      // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
      var swiperightBol = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
      handleswipe(swiperightBol)
      e.preventDefault()
    }, false)
  }


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
                <ShowSeconds
                  showSeconds={showSeconds}
                  setShowSeconds={setShowSeconds}
                />
                <TimeFormat is24Hour={is24Hour} setIs24Hour={setIs24Hour} />
                <Font
                  selectedFont={selectedFont}
                  setSelectedFont={setSelectedFont}
                />
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
