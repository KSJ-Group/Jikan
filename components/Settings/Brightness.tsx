import React, { useState, useEffect } from 'react';
import styles from '../../styles/Settings/Settings.module.css';

interface Props {
  brightness: number,
  setBrightness: Function
}

const Brightness: React.FC<Props> = ({brightness, setBrightness}) => {
  const changeHandler = (e: any): void => {
    e.preventDefault();
    setBrightness(e.target.value);
  }

  return (
    <div className={styles.brightness}>
      Brightness
      <div className={styles.sliderDiv}>
        <input className={styles.brightnessSlider} defaultValue={brightness} onChange={changeHandler} type="range" name="volume"
          min="20" max="100" />
        <div className={styles.indicator}>{brightness}%</div>
      </div>
    </div>
  );
};

export default Brightness;