import React, {useEffect, useContext} from 'react';
import type { NextPage } from 'next';
import { BackgroundContext } from '../BackgroundContext';
import styles from '../../styles/PhotoTile/PhotoTile.module.css';

interface ButtonProps {
  url: string,
  avg_color: string,
  src: {
    original: string,
    medium: string
  }
}

const PhotoTile: NextPage<ButtonProps>= ({url, avg_color, src}) => {
  const { changeBackground, loaded } = useContext(BackgroundContext);

  useEffect((): any => {
    let cachedImage = localStorage.getItem('background')
    if (cachedImage) {
      changeBackground(cachedImage)
    }
  }, [])

  return (
    <div className={styles.imageContainer}>
      {loaded ? <img className={styles.image} src={src.medium} alt={url} onClick={(event)=>{changeBackground(src.original)}}/> : <div>Uploading Background Image...</div>}

    </div>
  )

}

export default PhotoTile;