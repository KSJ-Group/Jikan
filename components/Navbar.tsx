import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';
import Head from 'next/head';
import Settings from './Settings';

const Navbar: React.FC = () => {
  const [clockIsActive, setClockIsActive] = useState<boolean>(true);
  const [pomodoroIsActive, setPomodoroIsActive] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const clickLink = (): void => {
    setClockIsActive(!clockIsActive);
    setPomodoroIsActive(!pomodoroIsActive);
  }

  useEffect(() => {
    if (clockIsActive) {
      document.getElementById('link1')?.classList.add('activeLink');
      document.getElementById('link2')?.classList.remove('activeLink');
    } else {
      document.getElementById('link2')?.classList.add('activeLink');
      document.getElementById('link1')?.classList.remove('activeLink');
    }
  }, [clockIsActive])

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous" />
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="true"></script>

        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
          crossOrigin="true"></script>

        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossOrigin="true"></script>

        <script>var Alert = ReactBootstrap.Alert; </script>
      </Head>
      <nav className={styles.nav}>
        <div className={styles.mainLinks}>
          <Link href="/"><a className={styles.link} id='link1' onClick={clickLink}>Digital Clock</a></Link>
          <div className={styles.line}>|</div>
          <Link href="/pomodoro"><a className={styles.link} id='link2' onClick={clickLink}>Pomodoro Timer</a></Link>
        </div>
        <div className={styles.settings} onClick={() => setShowSettings(true)}>
            [Settings]
          </div>
          <Settings showSettings={showSettings} setShowSettings={setShowSettings} />
      </nav>
    </>
  );
};

export default Navbar;