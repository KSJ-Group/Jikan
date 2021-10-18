import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Main/Main.module.css";
import { SettingsContext } from "./SettingsContext";
import YouTube from "react-youtube";

const YouTubePlayer = () => {
  const { selectedMusic } = useContext(SettingsContext);

  // return (
  //   <div>
  //     <iframe className={styles.iframe} id='youtubePlayer' width="560" height="315" src={selectedMusic} title="YouTube video player" />
  //     <div className={styles.controls}>
  //       ⏯︎
  //     </div>
  //   </div>
  // );
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
    },
  };

  const _onReady = (e) => {
    // access to player in all event handlers via event.target
    e.target.pauseVideo();
  };

  return (
    <YouTube className={styles.iframe} videoId={selectedMusic} opts={opts} />
  );
};

export default YouTubePlayer;
