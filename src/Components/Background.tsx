import React, { useContext } from "react";
import Image from "next/image";
import { BackgroundContext } from "../contexts/BackgroundContext";
import styles from "../styles/Settings/Background/Background.module.css";
import { BackgroundWrapper } from "../styles/Global/global.style";
import YouTubePlayer from "./YouTube";

const Background: React.FC = () => {
  const { background, changeLoadStatus } =
    useContext(BackgroundContext);

  return (
    <div>
      {background && background.includes('.') ? (
        <BackgroundWrapper>
          <div className={styles.imageDiv}>
            <Image
              src={background}
              className={styles.image}
              placeholder="blur"
              blurDataURL={background}
              layout="fill"
              onLoadingComplete={() => {
                changeLoadStatus(true);
              }}
            />
          </div>
        </BackgroundWrapper>
      ) : (
        <YouTubePlayer
          id={background}
        />
      )}
    </div >
  );
};

export default Background;
