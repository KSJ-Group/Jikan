import React from 'react';
import styles from "../../../styles/Settings/Background/BackgroundIcons/BackgroundIcons.module.css";

interface Props {
  changeDisplay: Function;
  src: string;
  display: string;
  title: string;
}
const Option = ({ changeDisplay, src, display, title }: Props) => {
  return (
    <div
      className={styles.imageOption}
      onClick={() => {
        changeDisplay(display);
      }}
    >
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={src}
        ></img>
      </div>
      <span className={styles.title}>{title}</span>
    </div>
  );
};

export default Option;