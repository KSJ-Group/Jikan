import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/Settings/Settings.module.css'
import { SettingsContext } from "../SettingsContext";
import { StylesContext } from "../StylesContext";
import { BackgroundContext } from '../BackgroundContext';
import GoogleLogin, { GoogleLogout } from 'react-google-login';

const {
  // updateUserData,
  getUserData,
  addNewUser,
  postUserSettings,
  deleteUser,
} = require('../../pages/api/userAuth');

const Login = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>();
  const [userSettings, setUserSettings] = useState<any>();
  const [settingsChanged, setSettingsChanged] = useState<boolean>(false);
  const {
    selectedFont,
    brightness,
    blur,
    setSelectedFont,
    setBrightness,
    setBlur
  } = useContext(StylesContext);

  const {
    isLoggedIn,
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    autoStartBreak,
    showSeconds,
    is24Hour,
    selectedAlert,
    selectedMusic,
    musicVolume,
    alertVolume,
    zip,
    setIsLoggedIn,
    setPomodoroTime,
    setShortBreakTime,
    setLongBreakTime,
    setAutoStartBreak,
    setShowSeconds,
    setIs24Hour,
    setSelectedAlert,
    setMusicVolume,
    setAlertVolume,
    setZip,
  } = useContext(SettingsContext);

  const {
    background,
    changeBackground
  } = useContext(BackgroundContext)

  const responseSuccess = (res) => {
    // console.log(res.profileObj);
    setFirstName(res.profileObj.givenName);
    setEmail(res.profileObj.email);
    localStorage.setItem('name', res.profileObj.givenName);
    localStorage.setItem('email', res.profileObj.email);
    setIsLoggedIn(true);
  }

  useEffect(() => {
    const cachedEmail = localStorage.getItem('email');
    const cachedName = localStorage.getItem('name');
    if (cachedEmail) {
      setEmail(cachedEmail);
    }
    if (cachedName) {
      setFirstName(cachedName);
    }

  }, [])

  useEffect(() => {
    if (userSettings) {
      // console.log(userSettings);

      // apply all settsings pulled from database

      setSelectedFont(userSettings.selectedFont);
      setBrightness(parseInt(userSettings.brightness));
      setBlur(JSON.parse(userSettings.blur));
      setPomodoroTime(parseInt(userSettings.pomodoroTime));
      setShortBreakTime(parseInt(userSettings.shortBreakTime));
      setLongBreakTime(parseInt(userSettings.longBreakTime));
      setAutoStartBreak(JSON.parse(userSettings.autoStartBreak));
      setShowSeconds(JSON.parse(userSettings.showSeconds));
      setIs24Hour(JSON.parse(userSettings.is24Hour));
      setSelectedAlert(userSettings.selectedAlert);
      setMusicVolume(parseInt(userSettings.musicVolume));
      setAlertVolume(parseInt(userSettings.alertVolume));
      setZip(userSettings.zip);
      changeBackground(userSettings.background);
      if (!settingsChanged) {
        setSettingsChanged(true);
      }
    }
  }, [userSettings])

  useEffect(() => {
    if (email && firstName) {
      getUserData(email)
        .then((response) => {
          // If user exists
          if (response) {
            getUserData(email)
              .then((response3) => {
                if (response3) {
                  setUserSettings(response3);
                }
              })
          } else {
            // Add new user!
            addNewUser(
              email,
              firstName,
              selectedFont,
              brightness.toString(),
              JSON.stringify(blur),
              pomodoroTime.toString(),
              shortBreakTime.toString(),
              longBreakTime.toString(),
              JSON.stringify(autoStartBreak),
              JSON.stringify(showSeconds),
              JSON.stringify(is24Hour),
              selectedAlert,
              musicVolume.toString(),
              alertVolume.toString(),
              zip,
              background,
            )
              .then((response4) => {
                setUserSettings(response4);
              })
          }
        });
    }
    if (settingsChanged) {
      postUserSettings(
        email,
        firstName,
        selectedFont,
        brightness.toString(),
        JSON.stringify(blur),
        pomodoroTime.toString(),
        shortBreakTime.toString(),
        longBreakTime.toString(),
        JSON.stringify(autoStartBreak),
        JSON.stringify(showSeconds),
        JSON.stringify(is24Hour),
        selectedAlert,
        musicVolume.toString(),
        alertVolume.toString(),
        zip,
        background,
      )
    }
  }, [
    email,
    selectedFont,
    brightness,
    blur,
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    autoStartBreak,
    showSeconds,
    is24Hour,
    selectedAlert,
    musicVolume,
    alertVolume,
    zip,
    background
  ])

  const responseFailure = (res) => {
    console.log('Login failed:', res)
  }

  const logout = () => {
    setIsLoggedIn(false);
  }

  return (
    <div>
      {isLoggedIn ? (
        <div className={styles.login}>
          <div className={styles.greeting}>Welcome back, {firstName}!</div>
          <GoogleLogout
            clientId="969191091168-jfg0qkhlgfbg4bc851q7h0ujhpprvr2k.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
            className={styles.logoutBtn}
          />
        </div>
      ) :
        <div className={styles.login}>
          <div className={styles.greeting}>Welcome back, Guest!</div>
          <GoogleLogin
            className={styles.loginBtn}
            clientId='969191091168-jfg0qkhlgfbg4bc851q7h0ujhpprvr2k.apps.googleusercontent.com'
            buttonText='Login'
            onSuccess={responseSuccess}
            onFailure={responseFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      }
    </div>
  );
};

export default Login;