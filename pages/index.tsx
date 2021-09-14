import type { NextPage } from 'next';
import Head from 'next/head';
import Clock from '../components/clock';
import styles from '../styles/Main.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jikan | Clock</title>
        <meta name="description" content="Track time" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Clock />
     </div>
  )
}

export default Home
