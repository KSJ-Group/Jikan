import React, { useState, createContext, useContext, useEffect } from 'react';

export const BackgroundContext = createContext(
  {
    background: '/mountains.jpeg',
    changeBackground: (url: string): void => { },
    loaded: true,
    changeLoadStatus: (status:boolean): void => { }
  });

export const BackgroundProvider: React.FC = ({ children }) => {
  const [background, setBackground] = useState<string>('/mountains.jpeg');
  const [loaded, setLoaded] = useState(true);

  const store = {
    background: background,
    changeBackground: (url: string): void => {
      setBackground(url);
      localStorage.setItem('background', url);
    },
    loaded: loaded,
    changeLoadStatus: (status:boolean): void => {
      setLoaded(status);
    }
  };

  useEffect((): any => {
    let cachedImage = localStorage.getItem('background');
    if (cachedImage) {
      store.changeBackground(cachedImage);
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