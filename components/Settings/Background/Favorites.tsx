import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/Settings/Background/Favorites/Favorites.module.css';
import { BackgroundContext } from '../../BackgroundContext';

const Favorites = () => {
  const { setBackground, favorites, setFavorites, recentlySelected, setRecentlySelected } = useContext(BackgroundContext);

  const selectVideo = (video: any) => {
    setBackground(video.id);

    let obj = {
      'type': 'video',
      'id': video.id,
      'thumbnail': video.thumbnail,
      'live': video.live,
      'title': video.title,
      'favorited': true
    }
    let temp: any = recentlySelected.slice();
    temp = temp.filter((each: any) => each.id !== video.id);
    temp.unshift(obj);
    setRecentlySelected(temp);
  }

  const selectImage = (image: any) => {
    setBackground(image.id);

    let obj = {
      'type': 'image',
      'id': image.id,
      'favorited': true
    }

    let temp: any = recentlySelected.slice();
    temp = temp.filter((each: any) => each.id !== image.id);
    temp.unshift(obj);
    setRecentlySelected(temp);
  }

  const deleteFromFavorites = (each: any) => {
    let temp = favorites.slice();
    if (each.type === 'video') {
      temp = temp.filter((favorite: any) => favorite.id !== each.id)
    } else {
      temp = temp.filter((favorite: any) => favorite.id !== each.id);
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
                    <img className={styles.closeBtn} src="http://cdn.onlinewebfonts.com/svg/img_267727.png" onClick={() => deleteFromFavorites(each)} alt='close' />
                    <img className={styles.thumbnail} src={each.thumbnail} onClick={() => selectVideo(each)} alt='thumbnail' />
                    <div className={styles.typeOverlay}>
                      <span className={styles.text}>Video</span>
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <div className={styles.imageResult} key={each.id}>
                  <div className={styles.imgWrapper}>
                    <img className={styles.thumbnail} src={each.id} onClick={() => selectImage(each)} alt='thumbnail' />
                    <img className={styles.closeBtn} src="http://cdn.onlinewebfonts.com/svg/img_267727.png" onClick={() => deleteFromFavorites(each)} alt='close' />
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