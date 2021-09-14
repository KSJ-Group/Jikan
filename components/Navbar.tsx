import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Navbar.module.css'
import Head from 'next/head';

const Navbar: NextPage = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [clockIsActive, setClockIsActive] = useState<boolean>(true);
  const [pomodoroIsActive, setPomodoroIsActive] = useState<boolean>(false);

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

  // useEffect(() => {
  //   if (clockIsActive) {
  //     document.getElementById('link1')!.classList.add('activeLink');
  //     document.getElementById('link2')!.classList.remove('activeLink');
  //   } else {
  //     document.getElementById('link2')!.classList.add('activeLink');
  //     document.getElementById('link1')!.classList.remove('activeLink');
  //   }
  // }, [clockIsActive])

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />
      </Head>
      <nav className={styles.nav}>
        <div className={styles.mainLinks}>
          <Link href="/"><a className={styles.link} id='link1' onClick={clickLink}>Digital Clock</a></Link>
          <div className={styles.line}>|</div>
          <Link href="/pomodoro"><a className={styles.link} id='link2' onClick={clickLink}>Pomodoro Timer</a></Link>
          {isFullscreen ? <div onClick={() => closeFullscreen()} className={styles.line}>[  ]</div> :
            <div onClick={() => openFullscreen()} className={styles.line}>[  ]</div>}
        </div>
      </nav>
    </>
  );
};

export default Navbar;