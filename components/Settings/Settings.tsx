import React, { useState, useEffect, useContext } from 'react';
import { Offcanvas, OffcanvasHeader, OffcanvasTitle, OffcanvasBody } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { BackgroundProvider, BackgroundContext } from '../BackgroundContext';
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
  const [isClock, setIsClock] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [brightness, setBrightness] = useState<number>(50);
  const [pomTime, setPomTime] = useState<number>(1500000);
  const [shortBreakTime, setShortBreakTime] = useState<number>(300000);
  const [longBreakTime, setLongBreakTime] = useState<number>(900000);

  const [autoStartBreak, setAutoStartBreak] = useState<boolean>(false);
  const [blur, setBlur] = useState<boolean>(false);
  const [showSeconds, setShowSeconds] = useState<boolean>(false);
  const [is24Hour, setIs24Hour] = useState<boolean>(false);

  const [selectedAlert, setSelectedAlert] = useState<string>('');
  const [selectedFont, setSelectedFont] = useState<string>('');

  const { loaded } = useContext(BackgroundContext);

  return (
    <>
      <Offcanvas show={showSettings} onHide={() => setShowSettings(false)} placement='end' className={styles.settings}>
        <Offcanvas.Header closeButton className={styles.header}>
          {isClock ? <Offcanvas.Title>Clock Settings</Offcanvas.Title> : <Offcanvas.Title>Pomodoro Settings</Offcanvas.Title>}
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.body}>
          {isClock ?
            // Clock settings
            <div>
              {isLoggedIn ? <div>Profile</div> : <Login />}
              <Brightness brightness={brightness} setBrightness={setBrightness} />
              <ShowSeconds showSeconds={showSeconds} setShowSeconds={setShowSeconds} />
              <Blur blur={blur} setBlur={setBlur} />
              <TimeFormat is24Hour={is24Hour} setIs24Hour={setIs24Hour} />
              <Font setSelectedFont={setSelectedFont} />
              <Search />
            </div> :
            // Pomodoro settings
            <div>
              {isLoggedIn ? <div>Profile</div> : <Login />}
              <Brightness brightness={brightness} setBrightness={setBrightness} />
              <Timers pomTime={pomTime} setPomTime={setPomTime} shortBreakTime={shortBreakTime} setShortBreakTime={setShortBreakTime} longBreakTime={longBreakTime} setLongBreakTime={setLongBreakTime} />
              <AutoStarBreak autoStartBreak={autoStartBreak} setAutoStartBreak={setAutoStartBreak} />
              <Blur blur={blur} setBlur={setBlur} />
              <AlertSound setSelectedAlert={setSelectedAlert} />
              <Font setSelectedFont={setSelectedFont} />
              <Search />
            </div>}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};


export default Settings;

