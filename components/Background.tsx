import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { BackgroundContext } from './BackgroundContext';
import styles from '../styles/Background/Background.module.css';


const Background: React.FC = () => {
  const { background, changeLoadStatus } = useContext(BackgroundContext);



  return (
    <div className={styles.imageContainer}>
        <Image src={background} className={styles.image} placeholder='blur' blurDataURL={background} layout='fill' onLoadingComplete={() => { changeLoadStatus(true) }} />
    </div>
  );
};

export default Background;