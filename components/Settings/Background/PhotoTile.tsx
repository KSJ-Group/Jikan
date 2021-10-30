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
  const { background, changeBackground, changeLoadStatus, loaded } = useContext(BackgroundContext);

  return (
    <div className={styles.imageContainer}>
      <img className={styles.image} src={src.medium} alt={url} onClick={(event) => {
        changeBackground(src.original);
        changeLoadStatus(false);
      }} />
      {!loaded && background === src.original ? <Spinner className={styles.spinner} animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> : null}
    </div>
  );
};

export default PhotoTile;