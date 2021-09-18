import styles from '../styles/Clock/Clock.module.css';
import moment from 'moment';
import { useEffect, useState } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>(moment().format('h:mm A'));

  useEffect(() => {
    setInterval(updateTime, 1000);
  }, [])

  const updateTime = (): void => {
    setTime(moment().format('h:mm A'));
  }

  return (
    <div className={styles.container}>
      <div className={styles.time}>{time}</div>
    </div>
  );
};

export default Clock;