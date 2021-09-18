import React, { useState, useEffect } from 'react';
import { Offcanvas, OffcanvasHeader, OffcanvasTitle, OffcanvasBody } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
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
  const [isClock, setIsClock] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [background, setBackground] = useState<string>('/pexels-photo-5011944.jpeg');

  useEffect((): any => {
    let cachedImage = localStorage.getItem('background')
    if (cachedImage) {
      setBackground(cachedImage)
    }
  }, [])

  const changeBackground = (event: React.MouseEvent, url:string): void => {
    setBackground(url);
    localStorage.setItem('background', url);
  }

  return (
    <>
      <Offcanvas show={showSettings} onHide={() => setShowSettings(false)} placement='end' className={styles.settings}>
        <Offcanvas.Header closeButton className={styles.header}>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.body}>
          {isClock ?
          // Clock settings
          <div>
            <Login />
            {isLoggedIn ? <div>Profile</div> : <div>Sign | Register</div>}
            <Brightness />
            <ShowSeconds />
            <Blur />
            <TimeFormat />
            <Font />
            Change Background Image
            <Search changeBackground={changeBackground} />
          </div> :
          // Pomodoro settings
          <div>
          <Login />
          <Brightness />
          <Form >
            <Timers />
            <AutoStarBreak />
            <AlertSound />
            <Font />
            Change Background Image
            <Search changeBackground={changeBackground} />
          </Form>
        </div> }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}


export default Settings;

