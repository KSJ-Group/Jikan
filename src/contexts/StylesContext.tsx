import React, { useState, createContext, useContext, useEffect } from 'react';
import { SettingsContext } from "./SettingsContext";
import { getStylesFromFirebase, getStylesFromLocalStorage } from '../helper/getStyles';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const StylesContext = createContext(
  {
    selectedFont: 'Nova Mono',
    setSelectedFont: (font: string) => { },
    brightness: 100,
    setBrightness: (percentage: number) => { },
    blur: 0,
    setBlur: (blur: number) => { },
    size: 'medium',
    setSize: (size: string) => { },
    opacity: 30,
    setOpacity: (opacity: number) => { },
    color: '0,0,0',
    setColor: (color: string) => { },
    pos: { x: 0, y: 0 },
    setPos: (pos: any) => { }
  });

export const StylesProvider = ({ children }) => {
  const { user, showSettings, isLoading } = useContext(SettingsContext);
  const [selectedFont, setSelectedFont] = useState<string>('Nova Mono');
  const [brightness, setBrightness] = useState<number>(100);
  const [blur, setBlur] = useState<number>(0);
  const [size, setSize] = useState<string>("medium");
  const [opacity, setOpacity] = useState<number>(30);
  const [color, setColor] = useState<string>('0,0,0');
  const [pos, setPos] = useState<any>({ x: 0, y: 0 })

  const store = {
    selectedFont: selectedFont,
    setSelectedFont: (font: string): void => {
      setSelectedFont(font);
      localStorage.setItem('font', font);
    },
    brightness: brightness,
    setBrightness: (brightness: number): void => {
      setBrightness(brightness);
      localStorage.setItem('brightness', JSON.stringify(brightness));
    },
    blur: blur,
    setBlur: (blur: number): void => {
      setBlur(blur);
      localStorage.setItem('blur', JSON.stringify(blur));
    },
    size: size,
    setSize: (size: string): void => {
      setSize(size);
      localStorage.setItem('clockSize', size);
    },
    opacity: opacity,
    setOpacity: (opacity: number): void => {
      setOpacity(opacity);
      localStorage.setItem('opacity', JSON.stringify(opacity));
    },
    color: color,
    setColor: (color: string): void => {
      setColor(color);
    },
    pos: pos,
    setPos: (pos: any): void => {
      setPos(pos);
      localStorage.setItem('position', JSON.stringify(pos));
    }
  };

  useEffect(() => {
    if (user) getStylesFromFirebase(store, user)
    else getStylesFromLocalStorage(store)
  }, [user])

  useEffect(() => {
    if (!showSettings && user && !isLoading) {
      updateDB();
    }
  }, [showSettings])

  const updateDB = async () => {
    const data = {
      selectedFont: selectedFont,
      brightness: JSON.stringify(brightness),
      blur: JSON.stringify(blur),
      size: size,
      opacity: JSON.stringify(opacity),
    };

    try {
      const docRef = doc(db, user["uid"], "styles");
      setDoc(docRef, data).then(() => {
        getStylesFromFirebase(store, user);
      })
        .catch(error => {
          console.log(error);
        })

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <StylesContext.Provider value={store}>
      {children}
    </StylesContext.Provider>
  );
};


export const useStylesContext = () => {
  return useContext(StylesContext);
};