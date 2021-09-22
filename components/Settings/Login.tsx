import React from 'react';
import styles from '../../styles/Settings/Settings.module.css'

const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles.loginLink}>Login </div>
      <div>|</div>
      <div className={styles.loginLink}> Sign up</div>
    </div>
  );
};

export default Login;