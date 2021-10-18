import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/Settings/Settings.module.css'
import { SettingsContext } from "../SettingsContext";
import GoogleLogin, { GoogleLogout } from 'react-google-login';

const Login = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const {
    isLoggedIn,
    setIsLoggedIn
  } = useContext(SettingsContext)

  const logout = () => {
    setIsLoggedIn(false);
  }

  const responseSuccess = (res) => {
    console.log(res.profileObj);
    setFirstName(res.profileObj.givenName);
    setEmail(res.profileObj.email);
    localStorage.setItem('name', res.profileObj.givenName);
    setIsLoggedIn(true);
  }

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setFirstName(name);
    }
  }, [])

  const responseFailure = (res) => {
    console.log('Login failed:', res)
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