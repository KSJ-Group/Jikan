import React, { useState, useEffect } from 'react';
import styles from '../../styles/Settings/Settings.module.css';

const Brightness = () => {
  const [brightness, setBrightness] = useState<number>(50)

  const changeHandler = (e: any): void => {
    e.preventDefault();
    setBrightness(e.target.value);
  }

  return (
    <div className={styles.brightness}>
      Brightness
      <div className={styles.sliderDiv}>
        <input className={styles.brightnessSlider} onChange={changeHandler} type="range" name="volume"
          min="0" max="100" />
        <div className={styles.indicator}>{brightness}%</div>
      </div>
    </div>
  );
};

export default Brightness;