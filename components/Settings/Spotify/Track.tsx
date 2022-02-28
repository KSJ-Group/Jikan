import React, { useEffect, useState } from 'react';
import styles from '../../../styles/Settings/Spotify/Spotify.module.css';

interface Props {
  track: any;
  setCurrentTrack: Function;
}

const Track: React.FC<Props> = ({ track, setCurrentTrack }) => {
  const [albumSrc, setAlbumSrc] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const [duration, setDuration] = useState<string>('');

  const convertMS = (ms: number): string => {
    var minutes = Math.floor(ms / 60000);
    var seconds = parseInt(((ms % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  const getAlbumImg = (arr: any): string => {
    if (arr[arr.length - 1]) {
      return arr[arr.length - 1].url;
    } else {
      return '';
    }
  }

  useEffect(() => {
    if (track) {
      setAlbumSrc(getAlbumImg(track.album.images));
      setTitle(track.name);
      setArtist(track.artists[0].name);
      setDuration(convertMS(parseInt(track.duration_ms)));
    }
  }, [track]);

  const changeTrack = () => {
    console.log('Changing track to:', title);
    setCurrentTrack(track);
    document.getElementById('playing-track')?.classList.add('playing-track');
  }

  return (
    <div id="playing-track" className={styles.trackContainer} onClick={changeTrack}>
      {albumSrc.length ? <img src={albumSrc} alt="album cover" className={styles.trackImg} /> : null}
      <div className={styles.wrapper}>
        <div className={styles.textCol}>
          <span className={styles.title}>{title}</span>
          <span className={styles.artist}>{artist}</span>
        </div>
        <span className={styles.duration}>{duration}</span>
      </div>
    </div>
  );
};

export default Track;