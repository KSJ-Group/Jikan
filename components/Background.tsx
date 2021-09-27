import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { BackgroundContext } from './BackgroundContext';
import styles from '../styles/Background/Background.module.css';
import { BackgroundBlur, BackgroundColor } from '../styles/global.style';
import { StylesContext } from './StylesContext';

const Background: React.FC = () => {
  const { background, changeLoadStatus, backgroundType } = useContext(BackgroundContext);
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
    <div>
    {backgroundType === 'image'
    ? <BackgroundBlur blur={blurAmount}>
        <Image src={background} className={styles.image} placeholder='blur' blurDataURL={background} layout='fill' onLoadingComplete={() => { changeLoadStatus(true) }}/>
      </BackgroundBlur>
    : <BackgroundColor
        color={background}>
      </BackgroundColor>}
    </div>
  );
};

export default Background;