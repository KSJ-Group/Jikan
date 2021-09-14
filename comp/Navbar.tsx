import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Navbar.module.css'

const Navbar: NextPage = () => {
  const clickClock = () => {
    document.querySelector('.link1')?.classList.add('activeLink');
    document.querySelector('.link2')?.classList.remove('activeLink');
  }

  const clickTimer = () => {
    document.querySelector('.link1')?.classList.remove('activeLink');
    document.querySelector('.link2')?.classList.add('activeLink');
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.mainLinks}>
        <Link href="/"><a className={styles.link} id='link1' onClick={clickClock}>Digital Clock</a></Link>
        <div className={styles.line}>|</div>
        <Link href="/pomodoro"><a className={styles.link} id='link2' onClick={clickTimer}>Pomodoro Timer</a></Link>
      </div>
    </nav>
  );
};

export default Navbar;