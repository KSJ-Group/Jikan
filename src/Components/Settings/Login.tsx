import { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { signInWithGoogle, signOutWithGoogle } from "../../firebase";
import styles from '../../styles/Settings/Login/Login.module.css';

const Login = () => {
  const {
    user
  } = useContext(SettingsContext);

  const signout = () => {
    signOutWithGoogle();
    localStorage.clear();
    location.reload();
  }

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
          <button className={styles.logoutBtn} onClick={signout}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;