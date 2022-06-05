import React, { useState, createContext, useContext, useEffect } from 'react';

export const BackgroundContext = createContext(
  {
    background: '/images/wallpaper-june-2022.jpg',
    changeBackground: (url: string): void => { },
    loaded: true,
    changeLoadStatus: (status: boolean): void => { },
    backgroundType: 'image',
  });

export const BackgroundProvider: React.FC = ({ children }) => {
  const [backgroundType, setType] = useState<string>('image');
  const [background, setBackground] = useState<string>('/images/wallpaper-june-2022.jpg');
  const [loaded, setLoaded] = useState(true);

  const store = {
    background: background,
    changeBackground: (newBackground: string): void => {
      setBackground(newBackground);
      if (!newBackground.includes('.')) {
        setType('video');
      } else {
        setType('image')
      }
      localStorage.setItem('background', newBackground);
      localStorage.setItem('backgroundType', backgroundType);
    },

    backgroundType: backgroundType,
    loaded: loaded,
    changeLoadStatus: (status: boolean): void => {
      setLoaded(status);
    },
  };

  useEffect((): any => {
    let cachedBackground = localStorage.getItem('background');
    if (cachedBackground) {
      store.changeBackground(cachedBackground);
    };
  }, []);

  return (
    <BackgroundContext.Provider value={store}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackgroundContext = () => {
  return useContext(BackgroundContext);
};