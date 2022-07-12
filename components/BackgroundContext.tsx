import React, { useState, createContext, useContext, useEffect } from 'react';

export const BackgroundContext = createContext(
  {
    background: '/images/wallpaper-june-2022.jpg',
    setBackground: (url: string): void => { },
    loaded: true,
    changeLoadStatus: (status: boolean): void => { },
    backgroundType: 'image',
    isOnlyMusic: true,
    setIsOnlyMusic: (isOnlyMusic: boolean): void => { },
    eventType: 'live',
    setEventType: (eventType: string): void => { },
    youtubeResults: [],
    setYoutubeResults: (results: any) => { },
    recentlySelected: [],
    setRecentlySelected: (selected: any) => { },
    favorites: [],
    setFavorites: (favorites: any) => { },
  });

export const BackgroundProvider: React.FC = ({ children }) => {
  const [background, setBackground] = useState<string>('/images/wallpaper-june-2022.jpg');
  const [backgroundType, setBackgroundType] = useState<string>('image');
  const [loaded, setLoaded] = useState(true);
  const [isOnlyMusic, setIsOnlyMusic] = useState<boolean>(true);
  const [eventType, setEventType] = useState<string>('live');
  const [youtubeResults, setYoutubeResults] = useState<any>([]);
  const [recentlySelected, setRecentlySelected] = useState<any>([]);
  const [favorites, setFavorites] = useState<any>([]);

  const store = {
    background: background,
    setBackground: (newBackground: string): void => {
      setBackground(newBackground);
      if (!newBackground.includes('.')) {
        setBackgroundType('video');
      } else {
        setBackgroundType('image')
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
    },
    youtubeResults: youtubeResults,
    setYoutubeResults: (results: any): void => {
      console.log('Results:', results);
      const uniqueIds = new Set();
      const unique = results.filter(element => {
        const isDuplicate = uniqueIds.has(element.id);
        if (!isDuplicate) {
          uniqueIds.add(element.id);
          return true;
        }
        return false;
      });
      setYoutubeResults(unique);
      localStorage.setItem('youtubeResults', JSON.stringify(results));
    },
    recentlySelected: recentlySelected,
    setRecentlySelected: (selected: any): void => {
      setRecentlySelected(selected);
      localStorage.setItem('recentlySelected', JSON.stringify(selected));
    },
    favorites: favorites,
    setFavorites: (favorites: any): void => {
      setFavorites(favorites);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  useEffect((): any => {
    const cachedBackground = localStorage.getItem('background');
    const cachedIsOnlyMusic = localStorage.getItem('isOnlyMusic');
    const cachedEventType = localStorage.getItem('eventType');
    const cachedYoutubeResults = localStorage.getItem('youtubeResults');
    const cachedRecentlySelected = localStorage.getItem('recentlySelected');
    const cachedFavorites = localStorage.getItem('favorites');
    if (cachedBackground) {
      store.setBackground(cachedBackground);
    }
    if (cachedIsOnlyMusic) {
      store.setIsOnlyMusic(JSON.parse(cachedIsOnlyMusic));
    }
    if (cachedEventType) {
      store.setEventType(cachedEventType);
    }
    if (cachedYoutubeResults) {
      store.setYoutubeResults(JSON.parse(cachedYoutubeResults));
    }
    if (cachedRecentlySelected) {
      store.setRecentlySelected(JSON.parse(cachedRecentlySelected));
    }
    if (cachedFavorites) {
      store.setFavorites(JSON.parse(cachedFavorites));
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