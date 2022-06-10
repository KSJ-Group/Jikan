import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Main/Main.module.css";
import YouTube from "react-youtube";
import { BackgroundContext } from "./BackgroundContext";
import { SettingsContext } from "./SettingsContext";
import { StylesContext } from "./StylesContext";
import styled from "styled-components";

let player = null;

const Controls = styled.div`
  z-index: 20;
  width: 180px;
  height: 80px;
  border-radius: 10px;
  background-color: ${(props) =>
    `rgb(0, 0, 0, ${props.opacity / 100})` || "rgb(0, 0, 0, 0.4)"};
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 10px;
  padding: 15px 5px;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  transition: 0.1s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.534);
  }

  @media screen and (max-width: 740px) {
    top: 65px;
    left: 5px;
    margin: 0;
    height: 40px;
    width: 90px;
  } ;
`;

const YouTubePlayer = ({ id }) => {
  const { setBackground, background } = useContext(BackgroundContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { musicVolume, setMusicVolume } = useContext(SettingsContext);
  const { opacity } = useContext(StylesContext);
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
    const innerWidth = window.innerWidth;
    if (innerWidth > 600) {
      slider.style.display = "block";
    }
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
      <Controls opacity={opacity} onMouseLeave={hideSlider}>
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
      </Controls>
    </div>
  );
};

export default YouTubePlayer;
