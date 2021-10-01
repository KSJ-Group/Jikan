import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { BackgroundContext } from './BackgroundContext';
import styles from '../styles/Background/Background.module.css';
import { BackgroundBlur } from '../styles/Global/global.style';
import { StylesContext } from './StylesContext';

const Background: React.FC = () => {
  const { background, changeLoadStatus } = useContext(BackgroundContext);
  const { blur } = useContext(StylesContext);
  const [blurAmount, setBlurAmount] = useState<string>('0');

  useEffect(() => {
    if (blur) {
      setBlurAmount('5px');
    } else {
      setBlurAmount('0');
    }
  }, [blur])

  return (
    <BackgroundBlur blur={blurAmount}>
      <Image src={background} className={styles.image} placeholder='blur' blurDataURL={background} layout='fill' onLoadingComplete={() => { changeLoadStatus(true) }} />
    </BackgroundBlur>
  );
};

export default Background;