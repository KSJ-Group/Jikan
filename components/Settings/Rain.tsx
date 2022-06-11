import React, { useContext, useEffect, useState } from 'react';
import ReactRain from 'react-rain-animation';
import "react-rain-animation/lib/style.css";
import { SettingsContext } from '../SettingsContext';
import { StylesContext } from '../StylesContext';
const { Howl } = require("howler");
let sound: any;

const Rain = () => {
  const { currentAmbiance } = useContext(SettingsContext);

  useEffect(() => {
    if (currentAmbiance === 'Rain') {
      sound = new Howl({
        src: "/Audio/Rain.mp3",
        loop: true,
        volume: 0.8,
      });
      sound.play();
    } else {
      if (sound) {
        sound.stop();
      }
    }
  }, [currentAmbiance])

  return (
    <div>
      {currentAmbiance === 'Rain' ?
        <div className='rainContainer' /> : null}
    </div>
  );
};

export default Rain;