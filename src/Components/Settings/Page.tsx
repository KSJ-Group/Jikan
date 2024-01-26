import React from "react";
import styles from "../../styles/Settings/Background/Page/Page.module.css";

interface PageProps {
  changePage: (direction: boolean) => void;
  page: number;
  maxPages: number;
}
const Page = ({ changePage, page, maxPages }: PageProps) => {

  const clickHandlerNext = (e: any) => {
    e.preventDefault();
    changePage(true);
  }

  const clickHandlerPrev = (e: any) => {
    e.preventDefault();
    changePage(false);
  }

  return (
    <div className={styles.page}>
      {page > 1 ? (
        <button
          className={styles.btn}
          onClick={(e: any) => {
            clickHandlerPrev(e);
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
          onClick={(e: any) => {
            clickHandlerNext(e);
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
