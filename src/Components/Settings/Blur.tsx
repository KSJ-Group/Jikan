import React, { useContext, useEffect, useState } from 'react';
import { StylesContext } from '../../contexts/StylesContext';
import styles from '../../styles/Settings/Blur/Blur.module.css'
import globalStyles from '../../styles/Settings/Settings.module.css';
import { BackgroundContext } from '../../contexts/BackgroundContext';

const Blur = () => {
  const { blur, setBlur } = useContext(StylesContext);
  const { background } = useContext(BackgroundContext);

  const changeHandler = (e) => {
    e.preventDefault();
    setBlur(e.target.value);
  }

  return (
    <div>
      <div className={styles.brightnessContainer}>
        Blur
        <div id='sliderdiv' className={globalStyles.sliderDiv}>
          <input id="slider" className={globalStyles.slider} value={blur} onChange={changeHandler} type="range" name="blur"
            min="0" max="10" />
          <div>{blur * 10}%</div>
        </div>
      </div>
    </div>
  );
};

export default Blur;