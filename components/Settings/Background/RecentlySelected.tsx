import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/Settings/Background/RecentlySelected/RecentlySelected.module.css';
import { BackgroundContext } from '../../BackgroundContext';

const RecentlySelected = () => {
  const { setBackground, recentlySelected, setRecentlySelected, favorites, setFavorites } = useContext(BackgroundContext);

  const selectVideo = (video: any) => {
    setBackground(video.id);
    let obj = {
      'type': 'video',
      'id': video.id,
      'thumbnail': video.thumbnail,
      'live': video.live,
      'title': video.title,
      'favorited': video.favorited || false
    }
    let temp: any = recentlySelected.slice(0, 20);
    temp = temp.filter(each => each.id !== video.id);
    temp.unshift(obj);
    setRecentlySelected(temp);
  }

  const selectImage = (image: any) => {
    if (image.id) {
      setBackground(image.id);
      let obj = {
        'type': 'image',
        'id': image.id,
        'favorited': image.favorited || false
      }
      let temp: any = recentlySelected.slice(0, 20);
      temp = temp.filter(each => each.id !== image.id)
      temp.unshift(obj);
      setRecentlySelected(temp);
    }
  }

  const deleteFromRecent = (item: any) => {
    let temp: any = recentlySelected;
    if (item.type === 'video') {
      temp = temp.filter(each => each.id !== item.id)
      setRecentlySelected(temp);
    } else {
      temp = temp.filter(each => each.id !== item.id);
      setRecentlySelected(temp);
    }
  }

  const deleteAllRecent = (e: any) => {
    e.preventDefault();
    setRecentlySelected([]);
  }

  const favorite = (item: any) => {
    let obj: any = {};
    if (item.type === 'image') {
      obj = {
        'type': 'image',
        'id': item.id,
        'favorited': true
      }
    } else {
      obj = {
        'type': 'video',
        'id': item.id,
        'thumbnail': item.thumbnail,
        'live': item.live,
        'title': item.title,
        'favorited': true
      }
    }

    let temp: any = favorites.slice();
    temp.unshift(obj);
    setFavorites(temp);
  }

  const unfavorite = (item: any) => {
    let temp: any = favorites.slice();
    if (item.type === 'image') {
      temp = temp.filter((each: any) => each.id !== item.id);
    } else {
      temp = temp.filter((each: any) => each.id !== item.id);
    }
    setFavorites(temp);
  }

  useEffect(() => {
    let temp: any = recentlySelected.slice();
    temp = temp.map((selected: any) => {
      let exists = false;
      favorites.forEach((favorite: any) => {
        if (selected.type === 'video') {
          if (selected.id === favorite.id) {
            selected.favorited = true;
            exists = true;
          }
        } else if (selected.type === 'image') {
          if (selected.id === favorite.id) {
            selected.favorited = true;
            exists = true;
          }
        }
      })
      if (!exists) {
        selected.favorited = false;
      }
      return selected;
    });

    setRecentlySelected(temp);
  }, [favorites])

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={styles.text}>Recently Selected</span>
        {recentlySelected.length ? <button className={styles.btn} onClick={(e: any) => deleteAllRecent(e)}>Clear All</button> : null}
      </div>
      <div className={styles.recentWrapper}>
        {recentlySelected.length ?
          recentlySelected.map((each: any) => {
            if (each.type === 'video') {
              return (
                <div className={styles.videoResult} key={each.id + 'recent'}>
                  <div className={styles.imgWrapper}>
                    {each.live === 'live' && <span className={styles.liveIndicator}>◉ LIVE</span>}
                    {!each.favorited ? <span className={styles.inactiveStar} onClick={() => favorite(each)}>☆</span> : <span className={styles.activeStar} onClick={() => unfavorite(each)}>★</span>}
                    <img className={styles.closeBtn} src="http://cdn.onlinewebfonts.com/svg/img_267727.png" onClick={() => deleteFromRecent(each)} alt='close' />
                    <img className={styles.thumbnail} src={each.thumbnail} onClick={() => selectVideo(each)} alt='thumbnail' />
                    <div className={styles.typeOverlay}>
                      <span className={styles.text}>Video</span>
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <div className={styles.imageResult} key={each.id || 'source'}>
                  <div className={styles.imgWrapper}>
                    {!each.favorited ?
                      <span className={styles.inactiveStar} onClick={() => favorite(each)}>☆</span>
                      : <span className={styles.activeStar} onClick={() => unfavorite(each)}>★</span>
                    }
                    <img className={styles.thumbnail} src={each.id} onClick={() => selectImage(each)} alt='thumbnail' />
                    <img className={styles.closeBtn} src="http://cdn.onlinewebfonts.com/svg/img_267727.png" onClick={() => deleteFromRecent(each)} alt='close' />
                    <div className={styles.typeOverlay}>
                      <span className={styles.text}>Image</span>
                    </div>
                  </div>
                </div>
              )
            }
          }) : <span>No recently selected background! Choose either Image or YouTube video above.</span>
        }
      </div>
    </div >
  );
};

export default RecentlySelected;