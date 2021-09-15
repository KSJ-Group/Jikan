import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Navbar.module.css'
import Head from 'next/head';
import Settings from './Settings';

const Navbar: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [clockIsActive, setClockIsActive] = useState<boolean>(true);
  const [pomodoroIsActive, setPomodoroIsActive] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const openFullscreen = (): void => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
    setIsFullscreen(true);
  }

  const closeFullscreen = (): void => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  }

  const clickLink = (): void => {
    setClockIsActive(!clockIsActive);
    setPomodoroIsActive(!pomodoroIsActive);
  }


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
          {isFullscreen ? <div onClick={() => closeFullscreen()} className={styles.line}>[  ]</div> :
            <div onClick={() => openFullscreen()} className={styles.line}>[  ]</div>}
          <div onClick={() => setShowSettings(true)}>
            Settings
            <Settings showSettings={showSettings} setShowSettings={setShowSettings} />
          </div>
        </div>

      </nav>
    </>
  );
};

export default Navbar;