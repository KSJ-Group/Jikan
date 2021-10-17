import React, { useState, useContext, useEffect } from 'react';
import styles from "../styles/Main/Main.module.css";
import { SettingsContext } from './SettingsContext';

const YouTube: React.FC = () => {
  const {
    selectedMusic
  } = useContext(SettingsContext)

  return (
    <div className={styles.iframe}>
      <iframe width="560" height="315" src={selectedMusic} title="YouTube video player"></iframe>
    </div>
  );
};

export default YouTube;