import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Main/Main.module.css";
import { SettingsContext } from "./SettingsContext";
import YouTube from "react-youtube";

const YouTubePlayer = () => {
  const { selectedMusic } = useContext(SettingsContext);

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
    },
  };

  return (
    <YouTube className={styles.iframe} videoId={selectedMusic} opts={opts} />
  );
};

export default YouTubePlayer;
