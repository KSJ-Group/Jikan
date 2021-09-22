import React, { useState, createContext, useContext, useEffect } from 'react';

export const SettingsContext = createContext(
  {
    isClock: true,
    setIsClock: (isClock: boolean) => {},
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn: boolean) => {},
    pomodoroTime: 1500000,
    setPomodoroTime: (time: any) => {},
    shortBreakTime: 300000,
    setShortBreakTime: (time: any) => {},
    longBreakTime: 900000,
    setLongBreakTime: (time: any) => {},
    autoStartBreak: false,
    setAutoStartBreak: (auto: boolean) => {},
    showSeconds: false,
    setShowSeconds: (showSeconds: boolean) => {},
    is24Hour: false,
    setIs24Hour: (is24Hour: boolean) => {},
    selectedAlert: 'alarm.wav',
    setSelectedAlert: (alert: string) => {}
  });

export const SettingsProvider: React.FC = ({ children }) => {
  const [isClock, setIsClock] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [pomodoroTime, setPomodoroTime] = useState<number>(1500000);
  const [shortBreakTime, setShortBreakTime] = useState<number>(300000);
  const [longBreakTime, setLongBreakTime] = useState<number>(900000);
  const [autoStartBreak, setAutoStartBreak] = useState<boolean>(false);
  const [showSeconds, setShowSeconds] = useState<boolean>(false);
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  const [selectedAlert, setSelectedAlert] = useState<string>('');

  const store = {
    isClock: isClock,
    setIsClock: (isClock: boolean): void => {
      setIsClock(isClock);
      localStorage.setItem('isClock', JSON.stringify(isClock));
    },
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: (isLoggedIn: boolean): void => {
      setIsLoggedIn(isLoggedIn);
      localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    },
    pomodoroTime: pomodoroTime,
    setPomodoroTime: (time: number): void => {
      setPomodoroTime(time);
      localStorage.setItem('pom', time.toString());
    },
    shortBreakTime: shortBreakTime,
    setShortBreakTime: (time: number): void => {
      setShortBreakTime(time);
      localStorage.setItem('short', time.toString());
    },
    longBreakTime: longBreakTime,
    setLongBreakTime: (time: number): void => {
      setLongBreakTime(time);
      localStorage.setItem('long', time.toString());
    },
    autoStartBreak: autoStartBreak,
    setAutoStartBreak: (auto: boolean): void => {
      setAutoStartBreak(auto);
      localStorage.setItem('auto', JSON.stringify(auto));
    },
    showSeconds: showSeconds,
    setShowSeconds: (showSeconds: boolean): void => {
      setShowSeconds(showSeconds);
      localStorage.setItem('showSeconds', JSON.stringify(showSeconds));
    },
    is24Hour: is24Hour,
    setIs24Hour: (is24Hour: boolean): void => {
      setIs24Hour(is24Hour);
      localStorage.setItem('24', JSON.stringify(is24Hour));
    },
    selectedAlert: selectedAlert,
    setSelectedAlert: (alert: string): void => {
      setSelectedAlert(alert);
      localStorage.setItem('alert', alert);
    }
  };

  useEffect((): any => {
    let cachedClock = localStorage.getItem('isClock');
    let cachedLoggedIn = localStorage.getItem('isLoggedIn');
    let cachedPom = localStorage.getItem('pom');
    let cachedShort = localStorage.getItem('short');
    let cachedLong = localStorage.getItem('long');
    let cachedAuto = localStorage.getItem('auto');
    let cachedSeconds = localStorage.getItem('showSeconds');
    let cached24 = localStorage.getItem('24');
    let cachedAlert = localStorage.getItem('alert');
    if (cachedClock) {
      store.setIsClock(JSON.parse(cachedClock));
    }
    if (cachedLoggedIn) {
      store.setIsLoggedIn(JSON.parse(cachedLoggedIn));
    }
    if (cachedPom) {
      store.setPomodoroTime(parseInt(cachedPom));
    }
    if (cachedShort) {
      store.setShortBreakTime(parseInt(cachedShort));
    }
    if (cachedLong) {
      store.setLongBreakTime(parseInt(cachedLong));
    }
    if (cachedAuto) {
      store.setAutoStartBreak(JSON.parse(cachedAuto));
    }
    if (cachedSeconds) {
      store.setShowSeconds(JSON.parse(cachedSeconds));
    }
    if (cached24) {
      store.setIs24Hour(JSON.parse(cached24));
    }
    if (cachedAlert) {
      store.setSelectedAlert(cachedAlert);
    }
  }, []);

  return (
    <SettingsContext.Provider value={store}>
      {children}
    </SettingsContext.Provider>
  );
};


export const useSettingsContext = () => {
  return useContext(SettingsContext);
};