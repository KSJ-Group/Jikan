import React, { useState, useEffect } from 'react';
import styles from '../../styles/Settings/Brightness/Brightness.module.css';
import globalStyles from '../../styles/Settings/Settings.module.css';

interface Props {
  opacity: number,
  setOpacity: Function
}

const Opacity: React.FC<Props> = ({ opacity, setOpacity }) => {
  const changeHandler = (e: any): void => {
    e.preventDefault();
    const num = parseInt(e.target.value);
    setOpacity(num);
  }

  return (
    <div className={globalStyles.settingModuleContainer}>
      <div id='brightness' className={styles.brightnessContainer}>
        Opacity
        <div id='sliderdiv' className={globalStyles.sliderDiv}>
          <input id="slider" className={globalStyles.slider} defaultValue={opacity} onChange={changeHandler} type="range" name="opacity"
            min="10" max="50" />
          <div>{opacity}%</div>
        </div>
      </div>
    </div >
  );
};

export default Opacity;