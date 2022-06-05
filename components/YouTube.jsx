import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Main/Main.module.css";
import YouTube from "react-youtube";
import { BackgroundContext } from "./BackgroundContext";
let player = null;

const YouTubePlayer = ({ id }) => {
  const { setBackground } = useContext(BackgroundContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const config = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 0,
    },
  };

  const _onReady = (event) => {
    player = event;
  };

  const playPause = () => {
    if (player) {
      if (isPlaying) {
        console.log('Pause video');
        player.target.pauseVideo();
        setIsPlaying(false);
      } else {
        console.log('Play video');
        player.target.playVideo();
        setIsPlaying(true);
      }
    }
  }

  const muteUnmute = () => {
    if (player) {
      if (isMuted) {
        // player.target
        player.target.setVolume(100);
        setIsMuted(false);
      } else {
        player.target.setVolume(0);
        setIsMuted(true);
      }
    } 
  }


  return (
    <div className={styles.youtube}>
        <YouTube
          id="youtube-player"
          videoId={id}
          opts={config}
          onReady={_onReady}
          onError={() => setBackground('https://images.pexels.com/photos/235721/pexels-photo-235721.jpeg')}
        />
        <div className={styles.controls}>
            <button className={styles.controlBtn} onClick={muteUnmute}>{isMuted ? <img className={styles.icon} src='/images/unmute.png'/> : <img className={styles.icon2} src='/images/mute.png'/> }</button>
            <button className={styles.controlBtn} onClick={playPause}>{isPlaying? <img className={styles.icon} src='/images/pause.png' /> : <img className={styles.icon} src='/images/play.png' />}</button>
        </div>
    </div>
  );
};

export default YouTubePlayer;
