import React, { useState, createContext, useContext, useEffect } from 'react';

export const BackgroundContext = createContext(
  {
    background: '/mountains.jpeg',
    changeBackground: (url: string): void => { },
    loaded: true,
    changeLoadStatus: (status:boolean): void => { },
    backgroundType: 'image',
  });

export const BackgroundProvider: React.FC = ({ children }) => {
<<<<<<< HEAD
  const [background, setBackground] = useState<string>('/pexels-photo-5011944.jpeg');
  const [loaded, setLoaded] = useState<boolean>(true);
  const [backgroundType, setType] = useState<string>('image');
=======
  const [background, setBackground] = useState<string>('/mountains.jpeg');
  const [loaded, setLoaded] = useState(true);
>>>>>>> d50971c2e8fdaadc79db5d07848af4cd412c6daf

  const store = {
    background: background,
    changeBackground: (newBackground: string): void => {
      setBackground(newBackground);
      if (newBackground[0] === '#') {
        setType('color')
      } else {
        setType('image')
      }
      localStorage.setItem('background', newBackground);
      localStorage.setItem('backgroundType', backgroundType);
    },

    backgroundType: backgroundType,
    loaded: loaded,
    changeLoadStatus: (status:boolean): void => {
      setLoaded(status);
    }
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