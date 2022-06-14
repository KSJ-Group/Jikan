import React from "react";
import styles from "../../../styles/Settings/Background/BackgroundIcons/BackgroundIcons.module.css";
import styles2 from "../../../styles/Settings/Background/Search/Search.module.css";
import RecentlySelected from "./RecentlySelected";
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
          src={"https://images.pexels.com/photos/701816/pexels-photo-701816.jpeg"}
          title="Image"
        />
        <Option
          changeDisplay={changeDisplay}
          display={"youtube"}
          src={"https://fdn.gsmarena.com/imgroot/news/20/10/yt-music-casting-support-free-tier/-1220x526/gsmarena_001.jpg"}
          title="YouTube"
        />
        <Option
          changeDisplay={changeDisplay}
          display="recent"
          src="https://i.ytimg.com/vi/XioLScTS_oM/maxresdefault.jpg"
          title="Recent"
        />
        <Option
          changeDisplay={changeDisplay}
          display="favorites"
          src="https://st4.depositphotos.com/16602560/37795/v/950/depositphotos_377950550-stock-illustration-favorites-icon-vector-heart-icon.jpg?forcejpeg=true"
          title="Favorites"
        />
      </div>
    </div>
  );
};

export default Options;
