import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar/Navbar.module.css';
import Head from 'next/head';
import Settings from './Settings/Settings';

const Navbar: React.FC = () => {
  const [clockIsActive, setClockIsActive] = useState<boolean>(true);
  const [pomIsActive, setPomIsActive] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const clickLinkClock = (): void => {
    if (!clockIsActive) {
      setClockIsActive(true);
      setPomIsActive(false);
    }
  }

  const clickLinkPom = (): void => {
    if (!pomIsActive) {
      setPomIsActive(true);
      setClockIsActive(false);
    }
  }

  useEffect(() => {
    if (clockIsActive) {
      document.getElementById('clock')?.classList.add('activeLink');
      document.getElementById('timer')?.classList.remove('activeLink');
    } else if (pomIsActive) {
      document.getElementById('timer')?.classList.add('activeLink');
      document.getElementById('clock')?.classList.remove('activeLink');
    }
  }, [clockIsActive, pomIsActive])

  useEffect(() => {
    if (window.location.href.includes('pomodoro')) {
      setClockIsActive(false);
      setPomIsActive(true);
    }
  }, []);

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

        <script src="https://kit.fontawesome.com/5a44324c7d.js" crossOrigin="anonymous"></script>
      </Head>
      <nav className={styles.nav}>
        <div className={styles.mainLinks}>
          <Link href="/"><a className={styles.link} id='clock' onClick={clickLinkClock}>Digital Clock</a></Link>
          <div className={styles.line}>|</div>
          <Link href="/pomodoro"><a className={styles.link} id='timer' onClick={clickLinkPom}>Pomodoro Timer</a></Link>
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