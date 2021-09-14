import type { NextPage } from 'next';
import styles from '../styles/Clock.module.css';
import moment from 'moment';
import { useEffect, useState } from 'react';

const Clock: NextPage = () => {
  const [time, setTime] = useState(moment().format('h:mm A'));

  useEffect(() => {
    setInterval(updateTime, 1000);
  }, [])

  const updateTime = () => {
    setTime(moment().format('h:mm A'));
  }

  return (
    <div className={styles.container}>
      <div className={styles.time}>{time}</div>
    </div>
  );
};

export default Clock;