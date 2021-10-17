import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/Settings/Settings.module.css'
import GoogleLogin from 'react-google-login';
import { SettingsContext } from "../SettingsContext";

const Login = () => {

  const {
    isLoggedIn,
    setIsLoggedIn
  } = useContext(SettingsContext)

  const responseGoogle = (res) => {
    console.log(res);
    console.log(res.profileObj);
    setIsLoggedIn(true);
  }

  return (
    <div className={styles.login}>
      <GoogleLogin
        className={styles.loginBtn}
        clientId='969191091168-jfg0qkhlgfbg4bc851q7h0ujhpprvr2k.apps.googleusercontent.com'
        buttonText='Login'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Login;