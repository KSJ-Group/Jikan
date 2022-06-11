import React, { useContext, useEffect, useState } from "react";
import { HuePicker } from "react-color";
import { StylesContext } from "../../StylesContext";
import styles from "../../../styles/Settings/Background/Color/Color.module.css";
import globalStyles from '../../../styles/Settings/Settings.module.css';

const Color = () => {
  const { color, setColor, hex, setHex } = useContext(StylesContext);

  const extractRGB = (color: any) => {
    const checkbox = document.getElementById('blackBox') as HTMLInputElement;
    checkbox.checked = false;
    setColor(`${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`);
    setHex(color.hex);
  }

  const blackHandler = (e: any) => {
    if (e.target.checked) {
      setColor('0, 0, 0');
      setHex('#000000');
    }
  }

  return (
    <div className={globalStyles.settingModuleContainer}>
      <div className={styles.colorContainer}>
        <div className={styles.colorTitle}>Select Color</div>
        <div className={styles.colorPicker}>
          <HuePicker
            className={styles.huePicker}
            color={hex}
            onChange={(color) => {
              extractRGB(color)
            }}
          />
          <form className={styles.checkboxWrapper} onChange={(e: any) => blackHandler(e)}>
            <input className={styles.checkbox} type="checkbox" id="blackBox" name="filter" value="Black" defaultChecked />
            <label className={styles.checkboxLabel} htmlFor="blackBox">Black</label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Color;
