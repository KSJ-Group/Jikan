import React, { useState, createContext, useContext, useEffect } from 'react';

export const StylesContext = createContext(
  {
    selectedFont: 'Syne Mono',
    setSelectedFont: (font: string) => { },
    brightness: 100,
    setBrightness: (percentage: number) => { },
    blur: false,
    setBlur: (blur: boolean) => { },
    size: 'medium',
    setSize: (size: string) => { }
  });

export const StylesProvider: React.FC = ({ children }) => {
  const [selectedFont, setSelectedFont] = useState<string>('Syne Mono');
  const [brightness, setBrightness] = useState<number>(100);
  const [blur, setBlur] = useState<boolean>(false);
  const [size, setSize] = useState<string>("medium");

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
    }
  };

  useEffect((): any => {
    let cachedFont = localStorage.getItem('font');
    let cachedBrightness = localStorage.getItem('brightness');
    let cachedBlur = localStorage.getItem('blur');
    let cachedSize = localStorage.getItem('clockSize');
    if (cachedFont) {
      store.setSelectedFont(cachedFont);
    }
    if (cachedBrightness) {
      store.setBrightness(parseInt(cachedBrightness));
    }
    if (cachedBlur) {
      store.setBlur(JSON.parse(cachedBlur));
    }
    if (cachedSize) {
      store.setSize(cachedSize);
    }
  }, []);

  return (
    <StylesContext.Provider value={store}>
      {children}
    </StylesContext.Provider>
  );
};


export const useStylesContext = () => {
  return useContext(StylesContext);
};