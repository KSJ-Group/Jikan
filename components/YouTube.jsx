import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Main/Main.module.css";
import { SettingsContext } from "./SettingsContext";
import YouTube from "react-youtube";

const YouTubePlayer = () => {
  const { selectedMusic, musicVolume } = useContext(SettingsContext);
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
      player.setVolume(musicVolume);
      player.playVideo();
    }
  }, [player]);

  useEffect(() => {
    if (player) {
      player.setVolume(musicVolume);
    }
  }, [musicVolume]);

  useEffect(() => {
    if (player) {
      player.playVideo();
    }
  }, [selectedMusic]);

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
