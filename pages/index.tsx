import type { NextPage } from "next";
import Head from "next/head";
import Clock from "../src/Components/clock";
import styles from "../src/styles/Main/Main.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jikan | Clock</title>
      </Head>
      <Clock />
    </div>
  );
};

export default Home;
