import React, { useState, useEffect } from 'react';
import styles from '../../styles/Settings/Brightness/Brightness.module.css';
import globalStyles from '../../styles/Settings/Settings.module.css';

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
    <div id='brightness' className={styles.brightnessContainer}>
      Brightness
      <div id='sliderdiv' className={globalStyles.sliderDiv}>
        <input id="slider" className={globalStyles.slider} defaultValue={brightness} onChange={changeHandler} type="range" name="brightness"
          min="5" max="100" />
        <div>{brightness}%</div>
      </div>
    </div>
  );
};

export default Brightness;