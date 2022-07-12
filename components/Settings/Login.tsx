import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/Settings/Login/Login.module.css'
import { SettingsContext } from "../SettingsContext";
import { StylesContext } from "../StylesContext";
import { BackgroundContext } from '../BackgroundContext';
import GoogleLogin, { GoogleLogout } from 'react-google-login';

const {
  // updateUserData,
  getUserData,
  addNewUser,
  postUserSettings,
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
    autoStartBreak,
    showSeconds,
    is24Hour,
    selectedAlert,
    musicVolume,
    alertVolume,
    zip,
    setIsLoggedIn,
    setPomodoroTime,
    setShortBreakTime,
    setAutoStartBreak,
    setShowSeconds,
    setIs24Hour,
    setSelectedAlert,
    setMusicVolume,
    setAlertVolume,
    setZip,
    setShowSettings
  } = useContext(SettingsContext);

  const {
    background,
    setBackground
  } = useContext(BackgroundContext)

  const responseSuccess = (res) => {
    setFirstName(res.profileObj.givenName);
    setEmail(res.profileObj.email);
    localStorage.setItem('name', res.profileObj.givenName);
    localStorage.setItem('email', res.profileObj.email);
    setIsLoggedIn(true);
  }

  const logout = () => {
    setIsLoggedIn(false);
  }

  const responseFailure = (res) => {
    console.log('Login failed:', res)
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
    if (userSettings && isLoggedIn) {
      // console.log(userSettings);
      setSelectedFont(userSettings.selectedFont);
      setBrightness(parseInt(userSettings.brightness));
      setBlur(JSON.parse(userSettings.blur));
      setPomodoroTime(parseInt(userSettings.pomodoroTime));
      setShortBreakTime(parseInt(userSettings.shortBreakTime));
      setAutoStartBreak(JSON.parse(userSettings.autoStartBreak));
      setShowSeconds(JSON.parse(userSettings.showSeconds));
      setIs24Hour(JSON.parse(userSettings.is24Hour));
      setSelectedAlert(userSettings.selectedAlert);
      setMusicVolume(parseInt(userSettings.musicVolume));
      setAlertVolume(parseInt(userSettings.alertVolume));
      setZip(userSettings.zip);
      setBackground(userSettings.background);
      if (!settingsChanged) {
        setSettingsChanged(true);
      }
    }
  }, [userSettings])

  useEffect(() => {
    updateData();
    if (settingsChanged && isLoggedIn) {
      postUserSettings(
        email,
        firstName,
        selectedFont,
        brightness.toString(),
        JSON.stringify(blur),
        pomodoroTime.toString(),
        shortBreakTime.toString(),
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
    autoStartBreak,
    showSeconds,
    is24Hour,
    selectedAlert,
    musicVolume,
    alertVolume,
    zip,
    background
  ])

  const updateData = () => {
    if (email && firstName && isLoggedIn) {
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
  }

  useEffect(() => {
    if (isLoggedIn) {
      updateData();
    }
  }, [isLoggedIn])

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
            render={(renderProps) => (
              <button onClick={renderProps.onClick} className={styles.logoutBtn} disabled={renderProps.disabled}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/240px-Google_%22G%22_Logo.svg.png" alt="google icon" className={styles.googleLogo} /> Logout
              </button>
            )}
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
            render={(renderProps) => (
              <button onClick={renderProps.onClick} className={styles.loginBtn} disabled={renderProps.disabled}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/240px-Google_%22G%22_Logo.svg.png" alt="google icon" className={styles.googleLogo} /> Login
              </button>
            )}
          />
        </div>
      }
    </div>
  );
};

export default Login;