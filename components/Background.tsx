import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/Background.module.css'

const Background: NextPage = () => {
  return (
    <div>
      <Image src="/pexels-photo-5011944.jpeg" className={styles.image} layout='fill'/>
    </div>
  );
};

export default Background;