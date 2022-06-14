import React, { useState, useEffect } from 'react';
// import Color from './Color';
import Search from './Search';
import Options from './Options';
import globalStyles from "../../../styles/Settings/Settings.module.css";
import styles from "../../../styles/Settings/Background/Search/Search.module.css";
import YouTubeSearch from './YouTubeSearch';
import RecentlySelected from './RecentlySelected';
import Favorites from './Favorites';

const ChangeBackground: React.FC = () => {
  const [display, setDisplay] = useState<string>('');

  const changeDisplay = (option: string) => {
    setDisplay(option);
  };

  const openDisplay = () => {
    if (display === 'image') {
      return <Search />
    } else if (display === 'youtube') {
      return <YouTubeSearch />
    } else if (display === 'recent') {
      return <RecentlySelected />
    } else if (display === 'favorites') {
      return <Favorites />
    } else return null;
  };

  return (
    <div className={globalStyles.settingModuleContainer}>
      <div className={styles.changeBG}>
        <Options changeDisplay={changeDisplay} />
        {openDisplay()}
      </div>
    </div>

  );
};

export default ChangeBackground;