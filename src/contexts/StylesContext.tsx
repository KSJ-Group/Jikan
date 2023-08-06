import React, { useState, createContext, useContext, useEffect } from 'react';
import { SettingsContext } from "./SettingsContext";
import { getStylesFromFirebase, getStylesFromLocalStorage } from '../helper/getStyles';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const StylesContext = createContext(
  {
    selectedFont: 'Syne Mono',
    setSelectedFont: (font: string) => { },
    brightness: 100,
    setBrightness: (percentage: number) => { },
    blur: false,
    setBlur: (blur: boolean) => { },
    size: 'medium',
    setSize: (size: string) => { },
    opacity: 30,
    setOpacity: (opacity: number) => { },
    color: '0,0,0',
    setColor: (color: string) => { },
    pos: { x: 0, y: 0 },
    setPos: (pos: any) => { }
  });

export const StylesProvider: React.FC = ({ children }) => {
  const { user, showSettings, isLoading } = useContext(SettingsContext);
  const [selectedFont, setSelectedFont] = useState<string>('Syne Mono');
  const [brightness, setBrightness] = useState<number>(100);
  const [blur, setBlur] = useState<boolean>(false);
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
    setBrightness: (percentage: number): void => {
      setBrightness(percentage);
      localStorage.setItem('brightness', brightness.toString());
    },
    blur: blur,
    setBlur: (blur: boolean): void => {
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
      localStorage.setItem('opacity', opacity.toString());
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