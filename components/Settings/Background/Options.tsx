import React from "react";
import styles from "../../../styles/BackgroundIcons/BackgroundIcons.module.css";
import styles2 from "../../../styles/Search/Search.module.css";

interface OptionsProps {
  changeDisplay: (option: string) => void;
}

const Options = ({ changeDisplay }: OptionsProps) => {
  return (
    <>
      <div className={styles2.searchTitle}>Change Background</div>
      <div className={styles.optionContainer}>
        <div
          className={styles.imageOption}
          onClick={() => {
            changeDisplay("image");
          }}
        >
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={
                "https://images.pexels.com/photos/701816/pexels-photo-701816.jpeg"
              }
            ></img>
          </div>
          Image
        </div>
        <div
          className={styles.imageOption}
          onClick={() => {
            changeDisplay("color");
          }}
        >
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={
                "https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              }
            ></img>
          </div>
          Color
        </div>
      </div>
    </>
  );
};

export default Options;
