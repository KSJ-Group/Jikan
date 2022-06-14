import React, { useEffect, useContext, useState } from 'react';
import type { NextPage } from 'next';
import { BackgroundContext } from '../../BackgroundContext';
import styles from '../../../styles/Settings/Background/PhotoTile/PhotoTile.module.css';
import { Spinner } from 'react-bootstrap'

interface ButtonProps {
  url: string,
  avg_color: string,
  src: {
    original: string,
    medium: string
  }
};

const PhotoTile: NextPage<ButtonProps> = ({ url, avg_color, src }) => {
  const { background, changeBackground, changeLoadStatus, loaded, recentlySelected, setRecentlySelected } = useContext(BackgroundContext);

  const clickHandler = () => {
    changeBackground(src.original);
    changeLoadStatus(false);
    let obj = {
      'type': 'image',
      'src': src.original
    }
    let temp: any = recentlySelected.slice(0, 20);
    temp = temp.filter(each => each.src !== src.original)
    temp.unshift(obj);
    setRecentlySelected(temp);
  }

  return (
    <div className={styles.imageContainer}>
      <img className={styles.image} src={src.medium} alt={url} onClick={clickHandler} />
      {!loaded && background === src.original ? <Spinner className={styles.spinner} animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> : null}
    </div>
  );
};

export default PhotoTile;