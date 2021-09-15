import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/PhotoTile.module.css';

interface ButtonProps {
  url: string,
  avg_color: string,
  src: {
    original: string,
    medium: string
  },
  changeBackground: (event: React.MouseEvent, url:string) => void
}

const PhotoTile: NextPage<ButtonProps>= ({url, avg_color, src, changeBackground}) => {
  return (
    <div className={styles.imageContainer}>
      <Image src={src.medium} alt={url} layout='fill' onClick={(event)=>{changeBackground(event, src.original)}}/>
    </div>
  )

}

export default PhotoTile;