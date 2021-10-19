import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Main/Main.module.css";
import { SettingsContext } from "./SettingsContext";
import YouTube from "react-youtube";
import { Offcanvas } from "react-bootstrap";

const YouTubePlayer = () => {
  const { selectedMusic, musicVolume } = useContext(SettingsContext);
  const [player, setPlayer] = useState(null);
  const [showYoutube, setShowYoutube] = useState(false);

  const config = {
    height: "200px",
    width: "350px",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
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
    <div className={styles.youtube}>
      <div className={styles.sideBtn} onClick={() => setShowYoutube(true)}>
        {selectedMusic === "None" ? (
          <div className={styles.chooseMusic}>
            Choose music in settings or tap the vinyl record to play a random
            one!
          </div>
        ) : (
          <YouTube
            id="youtube-player"
            videoId={selectedMusic}
            opts={config}
            onReady={_onReady}
          />
        )}
        ♫
      </div>
    </div>
  );
};

export default YouTubePlayer;
