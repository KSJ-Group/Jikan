import React, { useEffect, useState } from 'react';
import styles from '../../styles/Settings/Settings.module.css'
import GoogleLogin from 'react-google-login';
// import { auth } from '../../pages/api/images/index';

const Login = () => {
  // const [clientId, setClient] = useState<any>('');

  // useEffect(() => {
  //   console.log(auth);
  // }, [])

  // useEffect(() => {
  //   if (clientId) {
  //     console.log(clientId);
  //   }
  // }, [clientId])

  const responseGoogle = (res) => {
    console.log(res);
    console.log(res.profileObj);
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginLink}>
        <GoogleLogin
          clientId='969191091168-jfg0qkhlgfbg4bc851q7h0ujhpprvr2k.apps.googleusercontent.com'
          buttonText='Login'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      {/* <div>|</div> */}
      <div className={styles.loginLink}>
        <GoogleLogin
          clientId='969191091168-jfg0qkhlgfbg4bc851q7h0ujhpprvr2k.apps.googleusercontent.com'
          buttonText='Sign up'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  );
};

export default Login;