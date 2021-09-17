import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Background from './Background';
import Navbar from './Navbar';
import Search from './Search';

const Layout: NextPage = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [background, setBackground] = useState<string>('/pexels-photo-5011944.jpeg');

  useEffect((): any => {
    let cachedImage = localStorage.getItem('background')
    if (cachedImage) {
      setBackground(cachedImage)
    }
  }, [])
  
  const toggleFullscreen = (): void => {
    if (isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    } else {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
      setIsFullscreen(true);
    }
  }

  const changeBackground = (event: React.MouseEvent, url:string): void => {
    setBackground(url);
    localStorage.setItem('background', url);
  }

  return (
    <div id='layout'>
      <Navbar />
      <div onClick={() => toggleFullscreen()} className='fs'>[ ]</div>
      <Background background={background}/>
      { children }
      <Search changeBackground={changeBackground}/>
    </div>
  );
};

export default Layout;