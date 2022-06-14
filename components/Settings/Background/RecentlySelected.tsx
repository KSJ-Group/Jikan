import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/Settings/Background/RecentlySelected/RecentlySelected.module.css';
import { BackgroundContext } from '../../BackgroundContext';

const RecentlySelected = () => {
  const { background, changeBackground, changeLoadStatus, loaded, recentlySelected, setRecentlySelected } = useContext(BackgroundContext);

  useEffect(() => {
    console.log(recentlySelected);
  }, [recentlySelected])

  const selectVideo = (video: any) => {
    changeBackground(video.videoId);
    console.log(video);
    let obj = {
      'type': 'video',
      'id': video.videoId,
      'thumbnail': video.thumbnail,
      'live': video.live,
      'title': video.title
    }
    let temp: any = recentlySelected.slice(0, 20);
    temp = temp.filter(each => each.id !== video.videoId);
    temp.unshift(obj);
    setRecentlySelected(temp);
  }

  const selectImage = (src: string) => {
    changeBackground(src);
    changeLoadStatus(false);
    let obj = {
      'type': 'image',
      'src': src
    }
    let temp: any = recentlySelected.slice(0, 20);
    temp = temp.filter(each => each.src !== src)
    temp.unshift(obj);
    setRecentlySelected(temp);
  }

  const deleteFromRecent = (item: any) => {
    let temp: any = recentlySelected;
    if (item.type === 'video') {
      temp = temp.filter(each => each.id !== item.id)
      setRecentlySelected(temp);
    } else {
      temp = temp.filter(each => each.src !== item.src);
      setRecentlySelected(temp);
    }
  }

  const deleteAllRecent = (e: any) => {
    e.preventDefault();
    setRecentlySelected([]);
  }

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
                <div className={styles.videoResult} key={each.videoId}>
                  <div className={styles.imgWrapper}>
                    {each.live === 'live' && <span className={styles.liveIndicator}>◉ LIVE</span>}
                    <img className={styles.closeBtn} src="http://cdn.onlinewebfonts.com/svg/img_267727.png" onClick={() => deleteFromRecent(each)} />
                    <img className={styles.thumbnail} src={each.thumbnail} onClick={() => selectVideo(each)} />
                    <div className={styles.typeOverlay}>
                      <span className={styles.text}>Video</span>
                    </div>
                  </div>
                </div>
              )

            } else {
              return (
                <div className={styles.imageResult} key={each.src}>
                  <div className={styles.imgWrapper}>
                    <img className={styles.thumbnail} src={each.src} onClick={() => selectImage(each.src)} />
                    <img className={styles.closeBtn} src="http://cdn.onlinewebfonts.com/svg/img_267727.png" onClick={() => deleteFromRecent(each)} />
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