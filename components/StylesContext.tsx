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
    setSize: (size: string) => { },
    opacity: 40,
    setOpacity: (opacity: number) => { },
    color: '0, 0, 0',
    setColor: (color: string) => { },
    hex: '#000000',
    setHex: (hex: string) => { }
  });

export const StylesProvider: React.FC = ({ children }) => {
  const [selectedFont, setSelectedFont] = useState<string>('Syne Mono');
  const [brightness, setBrightness] = useState<number>(100);
  const [blur, setBlur] = useState<boolean>(false);
  const [size, setSize] = useState<string>("medium");
  const [opacity, setOpacity] = useState<number>(40);
  const [color, setColor] = useState<string>('0, 0, 0');
  const [hex, setHex] = useState<string>('#000000');

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
      localStorage.setItem('color', color);
    },
    hex: hex,
    setHex: (hex: string): void => {
      setHex(hex);
      localStorage.setItem('hex', hex);
    }
  };

  useEffect((): any => {
    const cachedFont = localStorage.getItem('font');
    const cachedBrightness = localStorage.getItem('brightness');
    const cachedBlur = localStorage.getItem('blur');
    const cachedSize = localStorage.getItem('clockSize');
    const cachedOpacity = localStorage.getItem('opacity');
    const cachedColor = localStorage.getItem('color');
    const cachedHex = localStorage.getItem('hex');
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
    if (cachedOpacity) {
      store.setOpacity(parseInt(cachedOpacity));
    }
    if (cachedColor) {
      store.setColor(cachedColor);
    }
    if (cachedHex) {
      store.setColor(cachedHex);
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