import type { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import Clock from "../src/Components/clock";
import styles from "../src/styles/Main/Main.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDo from "../src/Components/ToDo";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="description"
          content="Take control of your productivity. Use Jikan as a simple clock or a Pomodoro timer to effectively use your productive time wisely with inserted breaks. Customize the clock's style to your liking."
        />
        <meta
          name="title"
          property="og:title"
          content="Jikan | Pomodoro Timer"
        />
        <meta
          name="image"
          property="og:image"
          content="https://i.imgur.com/hk9dPII.png"
        />
        <link
          rel="icon"
          href="https://icons-for-free.com/iconfiles/png/512/time+timer+icon-1320087275815015291.png"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
          integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
          crossOrigin="anonymous"
        />
        <Script
          src="https://unpkg.com/react/umd/react.production.min.js"
          crossOrigin="true"
        ></Script>
        <Script
          src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
          crossOrigin="true"
        ></Script>
        <Script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossOrigin="true"
        ></Script>
        <Script>var Alert = ReactBootstrap.Alert; </Script>
        <Script
          src="https://kit.fontawesome.com/5a44324c7d.js"
          crossOrigin="anonymous"
        ></Script>
        <link
          rel="icon"
          href="https://icons-for-free.com/iconfiles/png/512/time+timer+icon-1320087275815015291.png"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Xanh+Mono&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Clock />
      <ToDo />
    </div>
  );
};

export default Home;
