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
          content="https://i.imgur.com/xI4X2JS.jpg"
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
        <script
          src="https://unpkg.com/react/umd/react.production.min.js"
          crossOrigin="true"
        ></script>

        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
          crossOrigin="true"
        ></script>

        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossOrigin="true"
        ></script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet"></link>
        <script>var Alert = ReactBootstrap.Alert; </script>

        <script
          src="https://kit.fontawesome.com/5a44324c7d.js"
          crossOrigin="anonymous"
        ></script>

      </Head>
      <Clock />
    </div>
  );
};

export default Home;
