import React, { useContext } from 'react';
import Background from './Background';
import Navbar from './Navbar';
import { BackgroundProvider } from '../contexts/BackgroundContext';
import { StylesContext } from '../contexts/StylesContext';
import { BrightnessDiv } from '../styles/Global/global.style';
import Weather from './Weather';

const Layout: React.FC = ({ children }) => {
  const { brightness, blur } = useContext(StylesContext);

  return (
    <BrightnessDiv brightness={brightness}>
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
