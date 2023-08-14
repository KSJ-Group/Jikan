import React from 'react';
import styles from '../../styles/Settings/Brightness/Brightness.module.css';
import globalStyles from '../../styles/Settings/Settings.module.css';
import Blur from './Blur';

interface Props {
  brightness: number,
  setBrightness: Function
  opacity: number,
  setOpacity: Function
}

const Brightness: React.FC<Props> = ({ brightness, setBrightness, opacity, setOpacity }) => {
  const opacityChange = (e: any): void => {
    e.preventDefault();
    setOpacity(parseInt(e.target.value));
  }

  const brightnesschange = (e: any): void => {
    e.preventDefault();
    setBrightness(parseInt(e.target.value));
  }

  return (
    <div className={globalStyles.settingModuleContainer}>
      <div className={styles.container}>
        <div id='brightness' className={styles.brightnessContainer}>
          Opacity
          <div id='sliderdiv' className={globalStyles.sliderDiv}>
            <input id="slider" className={globalStyles.slider} defaultValue={opacity} onChange={opacityChange} type="range" name="opacity"
              min="0" max="60" />
            <div>{opacity}%</div>
          </div>
        </div>
        <div id='brightness' className={styles.brightnessContainer}>
          Brightness
          <div id='sliderdiv' className={globalStyles.sliderDiv}>
            <input id="slider" className={globalStyles.slider} defaultValue={brightness} onChange={brightnesschange} type="range" name="brightness"
              min="5" max="100" />
            <div>{brightness}%</div>
          </div>
        </div>
        <Blur />
      </div>
    </div >
  );
};

export default Brightness;