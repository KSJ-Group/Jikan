import React from 'react';
import type { NextPage } from 'next';
import styles from '../../styles/Page.module.css';

interface pageProps {
  changePage: (direction: boolean)=> void,
  page: number,
  maxPages: number
}

const Page:NextPage<pageProps>= ({ changePage, page, maxPages }) => {
  return (
    <div className={styles.page}>
      { page > 1 ? <span onClick={()=>{changePage(false)}}> Previous </span> : <span></span> }
      { page < maxPages ? <span onClick={()=>{changePage(true)}}> Next </span> : <span></span> }
    </div>
  )
}

export default Page