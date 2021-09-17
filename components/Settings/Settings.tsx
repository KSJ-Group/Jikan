import React, { useState, useEffect } from 'react';
import { Offcanvas, OffcanvasHeader, OffcanvasTitle, OffcanvasBody } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import styles from '../../styles/Settings.module.css';
import Login from './Login';
import Timers from './Timers';
import AlertSound from './AlertSound';
import Brightness from './Brightness';
import AutoStarBreak from './AutoStartBreak';
import Font from './Font';

interface Props {
  showSettings: boolean,
  setShowSettings: any
}

const Settings: React.FC<Props> = ({ showSettings, setShowSettings }) => {
  const [isClock, setIsClock] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Offcanvas show={showSettings} onHide={() => setShowSettings(false)} placement='end'>
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {isClock ?
          // Clock settings
          <div>
            <Login />
            {isLoggedIn ? <div>Profile</div> : <div>Sign | Register</div>}
            <Brightness />
            <Form >
              <Timers />
              <AlertSound />
              <AutoStarBreak />
            </Form>
          </div> :
          // Pomodoro settings
          <div>
          <Login />
          <Brightness />
          <Form >
            <Timers />
            <AlertSound />
            <AutoStarBreak />
          </Form>
        </div> }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}


export default Settings;

