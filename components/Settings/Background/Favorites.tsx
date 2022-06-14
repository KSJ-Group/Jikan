import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/Settings/Background/Favorites/Favorites.module.css';
import { BackgroundContext } from '../../BackgroundContext';

const Favorites = () => {
  const { changeBackground, favorites, setFavorites } = useContext(BackgroundContext);

  const selectVideo = (id: string) => {
    changeBackground(id);
  }

  const selectImage = (src: string) => {
    changeBackground(src);
  }

  const deleteFromFavorites = (each: any) => {
    let temp = favorites.slice();
    if (each.type === 'video') {
      temp = temp.filter((favorite: any) => favorite.id !== each.id)
    } else {
      temp = temp.filter((favorite: any) => favorite.src !== each.src);
    }
    setFavorites(temp);
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Favorites</div>
      {favorites.length ?
        <div className={styles.favoritesWrapper}>
          {favorites.map((each: any) => {
            if (each.type === 'video') {
              return (
                <div className={styles.videoResult} key={each.id + 'favorite'}>
                  <div className={styles.imgWrapper}>
                    {each.live === 'live' && <span className={styles.liveIndicator}>◉ LIVE</span>}
                    <img className={styles.closeBtn} src="http://cdn.onlinewebfonts.com/svg/img_267727.png" onClick={() => deleteFromFavorites(each)} />
                    <img className={styles.thumbnail} src={each.thumbnail} onClick={() => selectVideo(each.id)} />
                    <div className={styles.typeOverlay}>
                      <span className={styles.text}>Video</span>
                    </div>
                  </div>
                </div>
              )
            } else {
              console.log(each);
              return (
                <div className={styles.imageResult} key={each.src}>
                  <div className={styles.imgWrapper}>
                    <img className={styles.thumbnail} src={each.src} onClick={() => selectImage(each.src.original)} />
                    <img className={styles.closeBtn} src="http://cdn.onlinewebfonts.com/svg/img_267727.png" onClick={() => deleteFromFavorites(each)} />
                    <div className={styles.typeOverlay}>
                      <span className={styles.text}>Image</span>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </div>
        : <span>You have no favorited background</span>
      }
    </div>
  );
};

export default Favorites;