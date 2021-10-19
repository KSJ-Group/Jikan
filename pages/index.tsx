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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"
        />
      </Head>
      <Clock />
    </div>
  );
};

export default Home;
