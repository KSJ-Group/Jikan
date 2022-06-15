import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Main/YouTube/Youtube.module.css";
import YouTube from "react-youtube";
import { BackgroundContext } from "./BackgroundContext";
import { SettingsContext } from "./SettingsContext";
import { StylesContext } from "./StylesContext";
import styled, { css } from "styled-components";

const Controls = styled.div(
  (props) => css`
    z-index: 20;
    width: 180px;
    height: 80px;
    border-radius: 10px;
    background-color: ${(props) =>
      `rgb(${props.color}, ${props.opacity / 100})` || "rgb(0, 0, 0, 0.4)"};
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: 10px;
    ${props.isMobile &&
    css`
      top: 65px;
      left: 5px;
      margin: 0;
      height: 40px;
      width: 90px;
    `}
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
  `
);

const Icon = styled.img(
  (props) => css`
    width: 50px;
    height: 50px;
    &:hover {
      width: 55px;
      height: 55px;
    }

    ${props.isMobile &&
    css`
      width: 25px;
      height: 25px;

      &:hover {
        width: 25px;
        height: 25px;
      }
    `}
    transition: 0.1s ease-in;
    filter: invert(1);

    cursor: pointer;

    @media screen and (max-width: 740px) {
      width: 25px;
      height: 25px;

      &:hover {
        width: 25px;
        height: 25px;
      }
    }
  `
);

const Icon2 = styled.img(
  (props) => css`
    position: relative;
    left: 2px;
    width: 50px;
    height: 50px;

    &:hover {
      width: 55px;
      height: 55px;
    }
    ${props.isMobile &&
    css`
      width: 25px;
      height: 25px;

      &:hover {
        width: 25px;
        height: 25px;
      }
    `}
    transition: 0.1s ease-in;
    filter: invert(1);

    cursor: pointer;

    @media screen and (max-width: 740px) {
      width: 25px;
      height: 25px;

      &:hover {
        width: 25px;
        height: 25px;
      }
    }
  `
);

const YouTubePlayer = ({ id }) => {
  const { background } = useContext(BackgroundContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { musicVolume, setMusicVolume, isMobile } = useContext(SettingsContext);
  const { opacity, color } = useContext(StylesContext);
  const config = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 0,
    },
  };

  let player;
  useEffect(() => {
    player = null;
  }, []);

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
    if (player) {
      if (player.target.getPlayerState() === 1) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  };

  const showSlider = () => {
    if (!isMobile) {
      const slider = document.getElementById("sliderDiv");
      const innerWidth = window.innerWidth;
      if (innerWidth > 600) {
        slider.style.display = "block";
      }
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
        onError={() => {
          console.log("YouTube player error!");
        }}
      />
      <Controls
        opacity={opacity}
        color={color}
        onMouseLeave={hideSlider}
        isMobile={isMobile}
      >
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
            <Icon
              onMouseEnter={showSlider}
              onClick={muteUnmute}
              src="/images/unmute.png"
              isMobile={isMobile}
            />
          ) : (
            <Icon
              onMouseEnter={showSlider}
              onClick={muteUnmute}
              src="/images/mute.png"
              isMobile={isMobile}
            />
          )}
        </button>
        <button className={styles.controlBtn} onClick={playPause}>
          {isPlaying ? (
            <Icon2 isMobile={isMobile} src="/images/pause.png" />
          ) : (
            <Icon2 isMobile={isMobile} src="/images/play.png" />
          )}
        </button>
      </Controls>
    </div>
  );
};

export default YouTubePlayer;
