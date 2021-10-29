import React, { useState, useEffect } from 'react';
import styles from '../../styles/Settings/Settings.module.css';

interface Props {
  brightness: number,
  setBrightness: Function
}

const Brightness: React.FC<Props> = ({ brightness, setBrightness }) => {
  const changeHandler = (e: any): void => {
    e.preventDefault();
    setBrightness(e.target.value);
  }

  return (
    <div id='brightness' className={styles.brightness}>
      Brightness
      <div id='sliderdiv' className={styles.sliderDiv}>
        <input id="slider" className={styles.brightnessSlider} defaultValue={brightness} onChange={changeHandler} type="range" name="brightness"
          min="5" max="100" />
        <div className={styles.indicator}>{brightness}%</div>
      </div>
    </div>
  );
};

export default Brightness;