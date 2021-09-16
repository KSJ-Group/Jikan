import React from 'react';
import type { NextPage } from 'next';
import styles from '../styles/PhotoTile.module.css';

interface pageProps {
  changePage: (direction: boolean)=> void
}

const Page:NextPage<pageProps>= ({ changePage }) => {
  // keep track of how many results there are / 12
  // conditionally render the previous and next buttons.

  return (
    <div>
      <span onClick={()=>{changePage(false)}}> Previous </span>
      <span onClick={()=>{changePage(true)}}> Next </span>
    </div>
  )
}

export default Page