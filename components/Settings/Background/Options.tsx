import React from "react";
import styles from "../../../styles/Settings/Background/BackgroundIcons/BackgroundIcons.module.css";
import styles2 from "../../../styles/Settings/Background/Search/Search.module.css";

interface OptionsProps {
  changeDisplay: (option: string) => void;
}

const Options = ({ changeDisplay }: OptionsProps) => {
  return (
    <div className={styles.bgContainer}>
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
            changeDisplay("youtube");
          }}
        >
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={
                "https://fdn.gsmarena.com/imgroot/news/20/10/yt-music-casting-support-free-tier/-1220x526/gsmarena_001.jpg"
              }
            ></img>
          </div>
          YouTube
        </div>
      </div>
    </div>
  );
};

export default Options;
