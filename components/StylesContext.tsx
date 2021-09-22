import React, { useState, createContext, useContext, useEffect } from 'react';

export const StylesContext = createContext(
  {
    selectedFont: 'Courier New',
    setSelectedFont: (font: string) => {},
    brightness: 100,
    setBrightness: (percentage: number) => {},
    blur: false,
    setBlur: (blur: boolean) => {}
  });

export const StylesProvider: React.FC = ({ children }) => {
  const [selectedFont, setSelectedFont] = useState<string>("'Courier New', monospace");
  const [brightness, setBrightness] = useState<number>(100);
  const [blur, setBlur] = useState<boolean>(false);

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
    }
  };

  useEffect((): any => {
    let cachedFont = localStorage.getItem('font');
    let cachedBrightness = localStorage.getItem('brightness');
    let cachedBlur = localStorage.getItem('blur');
    if (cachedFont) {
      store.setSelectedFont(cachedFont);
    }
    if (cachedBrightness) {
      store.setBrightness(parseInt(cachedBrightness));
    }
    if (cachedBlur) {
      store.setBlur(JSON.parse(cachedBlur));
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