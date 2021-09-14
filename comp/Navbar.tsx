import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Navbar.module.css'

const Navbar: NextPage = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.mainLinks}>
        <Link href="/"><a className={styles.link}>Digital Clock</a></Link>
        <div className={styles.line}>|</div>
        <Link href="/pomodoro"><a className={styles.link}>Pomodoro Timer</a></Link>
      </div>
    </nav>
  );
};

export default Navbar;