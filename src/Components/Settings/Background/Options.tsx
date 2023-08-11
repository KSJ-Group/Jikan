import React from "react";
import styles from "../../../styles/Settings/Background/BackgroundIcons/BackgroundIcons.module.css";
import styles2 from "../../../styles/Settings/Background/Search/Search.module.css";
import Option from './Option';

interface OptionsProps {
  changeDisplay: (option: string) => void;
}

const Options = ({ changeDisplay }: OptionsProps) => {
  return (
    <div className={styles.bgContainer}>
      <div className={styles2.searchTitle}>Change Background</div>
      <div className={styles.optionContainer}>
        <Option
          changeDisplay={changeDisplay}
          display={"image"}
          src={"/images/images.jpg"}
          title="Image"
        />
        <Option
          changeDisplay={changeDisplay}
          display={"youtube"}
          src={"/images/youtube.jpeg"}
          title="YouTube"
        />
        <Option
          changeDisplay={changeDisplay}
          display="recent"
          src="/images/history.jpeg"
          title="Recent"
        />
        <Option
          changeDisplay={changeDisplay}
          display="favorites"
          src="/images/favorites.jpeg"
          title="Favorites"
        />
      </div>
    </div>
  );
};

export default Options;
