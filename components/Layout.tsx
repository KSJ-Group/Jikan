import React, { useState, useContext, useEffect } from 'react';
import Background from './Background';
import Navbar from './Navbar';
import { BackgroundProvider } from './BackgroundContext';
import { StylesContext } from './StylesContext';
import { BrightnessDiv } from '../styles/Global/global.style';
import getHandler from '../pages/api/weather';
import moment from 'moment';
import Weather from './Weather';

const Layout: React.FC = ({ children }) => {
  const { brightness } = useContext(StylesContext);

  return (
    <BrightnessDiv brightness={brightness.toString() + '%'}>
      <div id='layout'>
        <BackgroundProvider>
          <Navbar />
          <Background />
          {children}
          <Weather />
        </BackgroundProvider>
      </div>
    </BrightnessDiv>
  );
};

export default Layout;
