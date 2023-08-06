import { useContext, useState, useEffect } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { signInWithGoogle, signOutWithGoogle } from "../../firebase";
import styles from '../../styles/Settings/Login/Login.module.css';

const Login = () => {
  const [greeting, setGreeting] = useState<string>("Hello");
  const {
    user
  } = useContext(SettingsContext);

  const signout = () => {
    signOutWithGoogle();
    localStorage.clear();
    location.reload();
  }

  useEffect(() => {
    const d = new Date();
    const time = d.getHours();
    if (time > 6 && time < 12) {
      setGreeting("Good morning, ");
    } else if (time > 12 && time < 18) {
      setGreeting("Good afternoon, ");
    } else if (time >= 18 && time <= 21) {
      setGreeting("Good evening, ");
    } else {
      setGreeting("Hello, ");
    }
  }, [])


  return (
    <div className={styles.login}>
      {!user ? (
        <div className={styles.loggedOutWrapper}>
          <button className={styles.loginBtn} onClick={signInWithGoogle}>
            <i className={`fab fa-google ${styles.googleLogo}`}></i>
            Sign in for Personalized Settings
          </button>
        </div>
      ) : (
        <div className={styles.loggedInWrapper}>
          <span className={styles.greeting}>{greeting}{user['displayName'].split(" ")[0]}!</span>
          <button className={styles.logoutBtn} onClick={signout}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;