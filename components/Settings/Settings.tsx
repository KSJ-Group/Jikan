import React, { useState, useEffect, useContext } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { BackgroundContext } from '../BackgroundContext';
import { SettingsContext } from '../SettingsContext';
import { StylesContext } from '../StylesContext';
import styles from '../../styles/Settings/Settings.module.css';
import Login from './Login';
import Timers from './Timers';
import AlertSound from './AlertSound';
import Brightness from './Brightness';
import AutoStarBreak from './AutoStartBreak';
import Font from './Font';
import ShowSeconds from './ShowSeconds';
import Blur from './Blur';
import TimeFormat from './TimeFormat';
import Search from './Search';

interface Props {
  showSettings: boolean,
  setShowSettings: any
}

const Settings: React.FC<Props> = ({ showSettings, setShowSettings }) => {
  // const [isClock, setIsClock] = useState<boolean>(true);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // const [pomTime, setPomTime] = useState<number>(1500000);
  // const [shortBreakTime, setShortBreakTime] = useState<number>(300000);
  // const [longBreakTime, setLongBreakTime] = useState<number>(900000);
  // const [autoStartBreak, setAutoStartBreak] = useState<boolean>(false);
  // const [showSeconds, setShowSeconds] = useState<boolean>(false);
  // const [is24Hour, setIs24Hour] = useState<boolean>(false);
  // const [selectedAlert, setSelectedAlert] = useState<string>('');

  // const [selectedFont, setSelectedFont] = useState<string>('');
  // const [brightness, setBrightness] = useState<number>(50);
  // const [blur, setBlur] = useState<boolean>(false);

  const { loaded } = useContext(BackgroundContext);
  const { selectedFont, setSelectedFont, brightness, setBrightness, blur, setBlur } = useContext(StylesContext);

  const { isClock, setIsClock, isLoggedIn, setIsLoggedIn, pomTime, setPomTime, shortBreakTime, setShortBreakTime, longBreakTime, setLongBreakTime, autoStartBreak, setAutoStartBreak, showSeconds, setShowSeconds, is24Hour, setIs24Hour, selectedAlert, setSelectedAlert} = useContext(SettingsContext);

  useEffect(() => {
      // console.log(brightness);
  }, [brightness])

  return (
    <>
      <Offcanvas show={showSettings} onHide={() => setShowSettings(false)} placement='end' className={styles.settings}>
        <Offcanvas.Body className={styles.body}>
          {isClock ?
            // Clock settings
            <div>
              <h2>Clock Settings</h2>
              {/* <button onClick={() => setIsClock(false)}>Switch to pomodoro settings</button> */}
              {isLoggedIn ? <div>Profile</div> : <Login />}
              <Brightness brightness={brightness} setBrightness={setBrightness} />
              <ShowSeconds showSeconds={showSeconds} setShowSeconds={setShowSeconds} />
              <Blur blur={blur} setBlur={setBlur} />
              <TimeFormat is24Hour={is24Hour} setIs24Hour={setIs24Hour} />
              <Font selectedFont={selectedFont} setSelectedFont={setSelectedFont} />
              <Search />
            </div> :
            // Pomodoro settings
            <div>
              <h2>Pomodoro Settings</h2>
              {/* <button onClick={() => setIsClock(true)}>Switch to clock settings</button> */}
              {isLoggedIn ? <div>Profile</div> : <Login />}
              <Brightness brightness={brightness} setBrightness={setBrightness} />
              <Timers pomTime={pomTime} setPomTime={setPomTime} shortBreakTime={shortBreakTime} setShortBreakTime={setShortBreakTime} longBreakTime={longBreakTime} setLongBreakTime={setLongBreakTime} />
              <AutoStarBreak autoStartBreak={autoStartBreak} setAutoStartBreak={setAutoStartBreak} />
              <Blur blur={blur} setBlur={setBlur} />
              <AlertSound setSelectedAlert={setSelectedAlert} />
              <Font selectedFont={selectedFont} setSelectedFont={setSelectedFont} />
              <Search />
            </div>}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};


export default Settings;

