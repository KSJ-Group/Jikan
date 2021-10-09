import React, { useContext } from "react";
import { ChromePicker } from "react-color";
import { BackgroundContext } from "../../BackgroundContext";
import styles from "../../../styles/Color/Color.module.css";

const Color = () => {
  const { background, changeBackground } = useContext(BackgroundContext);

  return (
    <div className={styles.container}>
      <div className={styles.colorTitle}>Color</div>
      <ChromePicker
        className={styles.colorPicker}
        color={background}
        onChange={(color) => {
          changeBackground(color.hex);
        }}
      />
    </div>
  );
};

export default Color;
