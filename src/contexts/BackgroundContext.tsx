import React, { useState, createContext, useContext, useEffect } from 'react';
import { SettingsContext } from "./SettingsContext";
import { getBgFromFirebase, getBgFromLocalStorage } from '../helper/getBackground';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
export const BackgroundContext = createContext(
  {
    background: '/images/default-wallpaper.jpg',
    setBackground: (url: string): void => { },
    loaded: true,
    changeLoadStatus: (status: boolean): void => { },
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

export const BackgroundProvider = ({ children }) => {
  const { user, showSettings, isLoading } = useContext(SettingsContext);
  const [background, setBackground] = useState<string>('/images/default-wallpaper.jpg');
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
      localStorage.setItem('background', newBackground);
    },
    loaded: loaded,
    changeLoadStatus: (status: boolean): void => {
      setLoaded(status);
    },
    isOnlyMusic: isOnlyMusic,
    setIsOnlyMusic: (isOnlyMusic: boolean): void => {
      setIsOnlyMusic(isOnlyMusic);
    },
    eventType: eventType,
    setEventType: (eventType: string): void => {
      setEventType(eventType);
    },
    youtubeResults: youtubeResults,
    setYoutubeResults: (results: any): void => {
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
    },
    recentlySelected: recentlySelected,
    setRecentlySelected: (selected: any): void => {
      if (selected.length > 30) {
        selected.pop();
      }
      setRecentlySelected(selected);
      localStorage.setItem('recentlySelected', JSON.stringify(selected));
    },
    favorites: favorites,
    setFavorites: (favorites: any): void => {
      setFavorites(favorites);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  useEffect(() => {
    if (user) getBgFromFirebase(store, user);
    else getBgFromLocalStorage(store);
  }, [user])

  useEffect(() => {
    if (!showSettings && user && !isLoading) {
      updateDB();
    }
  }, [showSettings])

  const updateDB = async () => {
    const data = {
      background: background,
      recentlySelected: JSON.stringify(recentlySelected),
      favorites: JSON.stringify(favorites)
    };

    try {
      const docRef = doc(db, user["uid"], "background");
      setDoc(docRef, data).then(() => {
        getBgFromFirebase(store, user);
      })
        .catch(error => {
          console.log(error);
        })

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <BackgroundContext.Provider value={store}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackgroundContext = () => {
  return useContext(BackgroundContext);
};