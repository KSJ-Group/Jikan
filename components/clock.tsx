import { useEffect, useState, useContext } from 'react';
import styles from '../styles/Clock/Clock.module.css';
import moment from 'moment';
import { SettingsContext } from './SettingsContext';

let interval: number;

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>(moment().format('h:mm A'));

  const [is24andSeconds, a] = useState<boolean>();
  const [is24, b] = useState<boolean>();
  const [is12andSeconds, c] = useState<boolean>();
  const [is12, d] = useState<boolean>();

  const { showSeconds, is24Hour } = useContext(SettingsContext);

  useEffect(() => {
    clearInterval(interval);
    interval = 0;
    interval = window.setInterval(updateTime, 1000);
    if (is24Hour) {
      if (showSeconds) {
        a(true);
        b(false);
        c(false);
        d(false);
      } else {
        a(false);
        b(true);
        c(false);
        d(false);
      }
    } else {
      if (showSeconds) {
        a(false);
        b(false);
        c(true);
        d(false);
      } else {
        a(false);
        b(false);
        c(false);
        d(true);
      }
    }
  }, [showSeconds, is24Hour])

  const updateTime = (): void => {
    if (is24Hour) {
      if (showSeconds) {
        setTime(moment().format('H:mm:ss'));
        a(true);
        b(false);
        c(false);
        d(false);
      } else {
        setTime(moment().format('H:mm'));
        a(false);
        b(true);
        c(false);
        d(false);
      }
    } else {
      if (showSeconds) {
        setTime(moment().format('h:mm:ss A'));
        a(false);
        b(false);
        c(true);
        d(false);
      } else {
        setTime(moment().format('h:mm A'));
        a(false);
        b(false);
        c(false);
        d(true);
      }
    }
  }

  return (
    <div className={styles.container}>
      {is24andSeconds ? <div className={styles.timeA}>{time}</div> : null}
      {is24 ? <div className={styles.timeB}>{time}</div> : null}
      {is12andSeconds ? <div className={styles.timeC}>{time}</div> : null}
      {is12 ? <div className={styles.timeD}>{time}</div> : null}
    </div>
  );
};

export default Clock;