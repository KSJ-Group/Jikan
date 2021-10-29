import React from "react";
import type { NextPage } from "next";
import styles from "../../styles/Settings/Background/Page/Page.module.css";

interface pageProps {
  changePage: (direction: boolean) => void;
  page: number;
  maxPages: number;
}
const Page: NextPage<pageProps> = ({ changePage, page, maxPages }) => {
  return (
    <div className={styles.page}>
      {page > 1 ? (
        <button
          className={styles.btn}
          onClick={() => {
            changePage(false);
          }}
        >
          {"<<"}
        </button>
      ) : (
        <span></span>
      )}
      {page < maxPages ? (
        <button
          className={styles.btn}
          onClick={() => {
            changePage(true);
          }}
        >
          {">>"}
        </button>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Page;
