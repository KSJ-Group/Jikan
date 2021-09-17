import type { NextPage } from 'next';
import Head from 'next/head';
import Clock from '../components/clock';
import styles from '../styles/Main.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jikan | Clock</title>
        <meta name="description" content="Track time" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous"/>
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="true"></script>

        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
          crossOrigin="true"></script>

        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossOrigin="true"></script>

        <script>var Alert = ReactBootstrap.Alert; </script>

        <script src="https://kit.fontawesome.com/5a44324c7d.js" crossOrigin="anonymous"></script>
      </Head>
      <Clock />
    </div>
  )
}

export default Home
