import { useEffect, useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { signInWithGoogle, signOutWithGoogle } from "../../firebase";
import styles from '../../styles/Settings/Login/Login.module.css';

const Login = () => {
  const {
    user
  } = useContext(SettingsContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className={styles.login}>
      {!user ? (
        <div className={styles.loggedOutWrapper}>
          <button className={styles.loginBtn} onClick={signInWithGoogle}>
            <i className={`fab fa-google ${styles.googleLogo}`}></i>
            Sign in for personalized settings
          </button>
        </div>
      ) : (
        <div className={styles.loggedInWrapper}>
          <span className={styles.greeting}>Hello, {user['displayName'].split(" ")[0]}</span>
          <button className={styles.logoutBtn} onClick={signOutWithGoogle}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;