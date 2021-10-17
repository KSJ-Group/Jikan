import React, { useState, useContext, useEffect } from 'react';
import styles from "../styles/Main/Main.module.css";
import { SettingsContext } from './SettingsContext';

const YouTube: React.FC = () => {
  const {
    selectedMusic
  } = useContext(SettingsContext);

  return (
    <div>
      <iframe className={styles.iframe} id='youtubePlayer' width="560" height="315" src={selectedMusic} title="YouTube video player" />
      <div className={styles.controls}>
        ⏯︎
      </div>
    </div>
  );
};

export default YouTube;