import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Main/Main.module.css";
import { SettingsContext } from "./SettingsContext";
import YouTube from "react-youtube";
import { Offcanvas } from "react-bootstrap";

const YouTubePlayer = () => {
  const { selectedMusic, musicVolume, setShowSettings } =
    useContext(SettingsContext);
  const [player, setPlayer] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

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
      <div className={styles.sideBtn}>
        {selectedMusic === "None" ? (
          <div className={styles.chooseMusic}>
            <button
              className={styles.settingsBtn}
              onClick={() => setShowSettings(true)}
            >
              Open Settings to choose music
            </button>
            <div>Or click the vinyl record to play random music!</div>
          </div>
        ) : null}
        <YouTube
          id="youtube-player"
          videoId={selectedMusic}
          opts={config}
          onReady={_onReady}
        />
        ♫
      </div>
    </div>
  );
};

export default YouTubePlayer;
