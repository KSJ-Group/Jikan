import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/Background.module.css'

interface backProps {
  background: string
}

const Background: NextPage<backProps> = ({background}) => {
  return (
    <div className={styles.imageContainer}>
      <Image src={background} className={styles.image} layout='fill'/>
    </div>
  );
};

export default Background;