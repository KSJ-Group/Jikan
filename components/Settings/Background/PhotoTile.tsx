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
  },
  image: any,
  images: any,
  setImages: Function
};

const PhotoTile: NextPage<ButtonProps> = ({ url, avg_color, src, image, images, setImages }) => {
  const { background, changeBackground, changeLoadStatus, loaded, recentlySelected, setRecentlySelected, favorites, setFavorites } = useContext(BackgroundContext);

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

  const favoriteImage = (image: any) => {
    let temp: any = images.slice();
    temp.map((each: any) => {
      if (image.src === each.src) {
        each.favorited = true;
      }
    })
    setImages(temp);

    let obj = {
      'type': 'image',
      'src': src.original,
      'favorited': true
    }

    let temp2: any = favorites.slice();
    temp2.unshift(obj);
    setFavorites(temp2);
  }

  const unfavoriteImage = (image: any) => {
    let temp: any = images.slice();
    temp.map((each: any) => {
      if (each.src === image.src) {
        each.favorited = false;
      }
    })
    setImages(temp);


    let temp2: any = favorites.slice();
    temp2 = temp2.filter((each: any) => each.src !== image.src);
    setFavorites(temp2);
  }

  return (
    <div className={styles.imageContainer}>
      {!image.favorited ?
        <span className={styles.inactiveStar} onClick={() => favoriteImage(image)}>☆</span>
        : <span className={styles.activeStar} onClick={() => unfavoriteImage(image)}>★</span>
      }

      <img className={styles.image} src={src.medium} alt={url} onClick={clickHandler} />
      {!loaded && background === src.original ? <Spinner className={styles.spinner} animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> : null}
    </div>
  );
};

export default PhotoTile;