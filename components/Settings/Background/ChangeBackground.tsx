import React, { useState, useEffect, useContext } from 'react';
import Color from './Color';
import Search from './Search';
import Options from './Options';
import globalStyles from "../../../styles/Settings/Settings.module.css";
import styles from "../../../styles/Settings/Background/Search/Search.module.css";

interface Props {
  el: any;
}

const ChangeBackground: React.FC<Props> = ({ el }) => {
  const [display, setDisplay] = useState<string>('');
  const [initial, setInitial] = useState<boolean>(true);

  const changeDisplay = (option: string) => {
    setDisplay(option);
  };

  const openDisplay = () => {
    if (display === 'image') {
      if (el && initial) {
        setTimeout(() => {
          el.scrollTo({
            top: 900,
            behavior: 'smooth'
          });
        }, 200);
        setInitial(false);
      }
      return <Search el={el} />
    } else if (display === 'color') {
      if (el && initial) {
        setTimeout(() => {
          el.scrollTo({
            top: 870,
            behavior: 'smooth'
          });
        }, 200);
        setInitial(false);
      }
      return <Color />
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