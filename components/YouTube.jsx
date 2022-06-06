import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Main/Main.module.css";
import YouTube from "react-youtube";
import { BackgroundContext } from "./BackgroundContext";
import { SettingsContext } from "./SettingsContext";
let player = null;

const YouTubePlayer = ({ id }) => {
  const { setBackground, background } = useContext(BackgroundContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { musicVolume, setMusicVolume } = useContext(SettingsContext);
  const config = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 0,
    },
  };

  useEffect(() => {
    if (background !== "None") {
      setIsPlaying(false);
      setIsMuted(false);
    }
  }, [background]);

  const _onReady = (event) => {
    player = event;
  };

  const playPause = () => {
    if (player) {
      checkVolume();
      if (isPlaying) {
        player.target.pauseVideo();
        setIsPlaying(false);
      } else {
        player.target.playVideo();
        setIsPlaying(true);
      }
    }
  };

  const muteUnmute = () => {
    if (player) {
      if (isMuted) {
        setMusicVolume(100);
        setIsMuted(false);
      } else {
        setMusicVolume(0);
        setIsMuted(true);
      }
    }
  };

  const checkChange = () => {
    if (player.target.getPlayerState() === 1) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const showSlider = () => {
    const slider = document.getElementById("sliderDiv");
    slider.style.display = "block";
  };

  const hideSlider = () => {
    const slider = document.getElementById("sliderDiv");
    slider.style.display = "none";
  };

  const changeHandler = (e) => {
    e.preventDefault();
    setMusicVolume(e.target.value);
  };

  useEffect(() => {
    checkVolume();
  }, [musicVolume]);

  const checkVolume = () => {
    if (musicVolume > 0) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
    if (player) {
      player.target.setVolume(musicVolume);
    }
  };

  return (
    <div className={styles.youtube}>
      <YouTube
        id="youtube-player"
        videoId={id}
        opts={config}
        onReady={_onReady}
        onStateChange={checkChange}
        onError={() =>
          setBackground(
            "https://images.pexels.com/photos/235721/pexels-photo-235721.jpeg"
          )
        }
      />
      <div className={styles.controls} onMouseLeave={hideSlider}>
        <button className={styles.controlBtn}>
          <div id="sliderDiv">
            <input
              id="volumeSlider"
              value={musicVolume}
              onChange={changeHandler}
              type="range"
              name="volume"
              min="0"
              max="100"
            />
          </div>
          {isMuted ? (
            <img
              onMouseEnter={showSlider}
              onClick={muteUnmute}
              className={styles.icon}
              src="/images/unmute.png"
            />
          ) : (
            <img
              onMouseEnter={showSlider}
              onClick={muteUnmute}
              className={styles.icon2}
              src="/images/mute.png"
            />
          )}
        </button>
        <button className={styles.controlBtn} onClick={playPause}>
          {isPlaying ? (
            <img className={styles.icon} src="/images/pause.png" />
          ) : (
            <img className={styles.icon} src="/images/play.png" />
          )}
        </button>
      </div>
    </div>
  );
};

export default YouTubePlayer;
