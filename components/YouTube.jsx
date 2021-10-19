import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Main/Main.module.css";
import { SettingsContext } from "./SettingsContext";
import YouTube from "react-youtube";

const YouTubePlayer = () => {
  const { selectedMusic } = useContext(SettingsContext);
  const [player, setPlayer] = useState(null);

  const config = {
    height: "0",
    width: "0",
  };

  const _onReady = (event) => {
    setPlayer(event.target);
  };

  useEffect(() => {
    if (player) {
      player.setVolume(20);
      player.playVideo();
    }
  }, [player]);

  return (
    <YouTube
      className={styles.iframe}
      videoId={selectedMusic}
      opts={config}
      onReady={_onReady}
    />
  );
};

export default YouTubePlayer;
