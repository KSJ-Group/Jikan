import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { BackgroundContext } from "./BackgroundContext";
import styles from "../styles/Settings/Background/Background.module.css";
import { BackgroundBlur, BackgroundColor } from "../styles/Global/global.style";
import { StylesContext } from "./StylesContext";
import YouTubePlayer from "./YouTube";

const Background: React.FC = () => {
  const { background, changeLoadStatus, backgroundType } =
    useContext(BackgroundContext);
  const { blur } = useContext(StylesContext);
  const [blurAmount, setBlurAmount] = useState<string>("0");

  useEffect(() => {
    if (blur) {
      setBlurAmount("5px");
    } else {
      setBlurAmount("0");
    }
  }, [blur]);

  return (
    <div>
      {backgroundType === "image" ? (
        <BackgroundBlur blur={blurAmount}>
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
        </BackgroundBlur>
      ) : (
        <YouTubePlayer 
          id={background}
        />
      )}
    </div >
  );
};

export default Background;
