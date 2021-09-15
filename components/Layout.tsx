import type { NextPage } from 'next';
import React, { useState } from 'react';
import Background from './Background';
import Navbar from './Navbar';
import Search from './Search';

const Layout: NextPage = ({ children }) => {
  const [background, setBackground] = useState<string>('/pexels-photo-5011944.jpeg');

  const changeBackground = (event: React.MouseEvent, url:string): void => {
    setBackground(url)
  }

  return (
    <div id='layout'>
      <Navbar />
      <Background background={background}/>
      { children }
      <Search changeBackground={changeBackground}/>
    </div>
  );
};

export default Layout;