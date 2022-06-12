import type { NextPage } from "next";
import Head from "next/head";
import Clock from "../components/clock";
import styles from "../styles/Main/Main.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jikan | Clock</title>
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
      </Head>
      <Clock />
    </div>
  );
};

export default Home;
