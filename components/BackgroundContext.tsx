import React, { useState, createContext, useContext, useEffect } from 'react';

export const BackgroundContext = createContext(
  {
    background: '/images/wallpaper-june-2022.jpg',
    changeBackground: (url: string): void => { },
    loaded: true,
    changeLoadStatus: (status: boolean): void => { },
    backgroundType: 'image',
    isOnlyMusic: true,
    setIsOnlyMusic: (isOnlyMusic: boolean): void => { },
    eventType: 'live',
    setEventType: (eventType: string): void => { }
  });

export const BackgroundProvider: React.FC = ({ children }) => {
  const [backgroundType, setType] = useState<string>('image');
  const [background, setBackground] = useState<string>('/images/wallpaper-june-2022.jpg');
  const [loaded, setLoaded] = useState(true);
  const [isOnlyMusic, setIsOnlyMusic] = useState<boolean>(true);
  const [eventType, setEventType] = useState<string>('live');

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
    isOnlyMusic: isOnlyMusic,
    setIsOnlyMusic: (isOnlyMusic: boolean): void => {
      setIsOnlyMusic(isOnlyMusic);
      localStorage.setItem('isOnlyMusic', JSON.stringify(isOnlyMusic));

    },
    eventType: eventType,
    setEventType: (eventType: string): void => {
      setEventType(eventType);
      localStorage.setItem('eventType', eventType);
    }
  };

  useEffect((): any => {
    let cachedBackground = localStorage.getItem('background');
    let cachedIsOnlyMusic = localStorage.getItem('isOnlyMusic');
    let cachedEventType = localStorage.getItem('eventType');
    if (cachedBackground) {
      store.changeBackground(cachedBackground);
    };

    if (cachedIsOnlyMusic) {
      store.setIsOnlyMusic(JSON.parse(cachedIsOnlyMusic));
    }

    if (cachedEventType) {
      store.setEventType(cachedEventType);
    }

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