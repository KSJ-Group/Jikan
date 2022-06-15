import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

export const SettingsContext = createContext({
  isClock: true,
  setIsClock: (isClock: boolean) => { },
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => { },
  pomodoroTime: 1500000,
  setPomodoroTime: (time: any) => { },
  shortBreakTime: 300000,
  setShortBreakTime: (time: any) => { },
  longBreakTime: 900000,
  setLongBreakTime: (time: any) => { },
  autoStartBreak: true,
  setAutoStartBreak: (auto: boolean) => { },
  showSeconds: false,
  setShowSeconds: (showSeconds: boolean) => { },
  is24Hour: false,
  setIs24Hour: (is24Hour: boolean) => { },
  selectedAlert: "Xylophone.mp3",
  setSelectedAlert: (alert: string) => { },
  allAlarms: [
    "Classic analog alarm.mp3",
    "Classic digital alarm.mp3",
    "Fast pings.mp3",
    "Japan Airport Alert.mp3",
    "Obnoxious.mp3",
    "Short pings.mp3",
    "Sonar.mp3",
    "Super Mario Bros.mp3",
    "Tri-tone ping.mp3",
    "Xylophone.mp3",
  ],
  setAllAlarms: (alarms: string[]) => { },
  musicVolume: 100,
  setMusicVolume: (volume: number) => { },
  alertVolume: 100,
  setAlertVolume: (volume: number) => { },
  zip: '',
  setZip: (zip: string) => { },
  showSettings: false,
  setShowSettings: (show: boolean) => { },
  currentWeather: {
    city: '',
    tempC: '',
    tempF: '',
    weather: '',
    icon: '',
  },
  setCurrentWeather: (weather: any) => { },
  currentAmbiance: "none",
  setCurrentAmbiance: (currentAmbiance: string) => { },
  isMobile: false,
});

export const SettingsProvider: React.FC = ({ children }) => {
  const [isClock, setIsClock] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [pomodoroTime, setPomodoroTime] = useState<number>(1500000);
  const [shortBreakTime, setShortBreakTime] = useState<number>(300000);
  const [longBreakTime, setLongBreakTime] = useState<number>(900000);
  const [autoStartBreak, setAutoStartBreak] = useState<boolean>(true);
  const [showSeconds, setShowSeconds] = useState<boolean>(false);
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  const [selectedAlert, setSelectedAlert] = useState<string>("Xylophone.mp3");
  const [allAlarms, setAllAlarms] = useState<string[]>([
    "Classic analog alarm.mp3",
    "Classic digital alarm.mp3",
    "Fast pings.mp3",
    "Japan Airport Alert.mp3",
    "Obnoxious.mp3",
    "Short pings.mp3",
    "Sonar.mp3",
    "Super Mario Bros.mp3",
    "Tri-tone ping.mp3",
    "Xylophone.mp3",
  ]);
  const [musicVolume, setMusicVolume] = useState<number>(100);
  const [alertVolume, setAlertVolume] = useState<number>(100);
  const [zip, setZip] = useState<string>('');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [currentWeather, setCurrentWeather] = useState<any>({
    city: '',
    tempC: '',
    tempF: '',
    weather: '',
    icon: '',
  });
  const [currentAmbiance, setCurrentAmbiance] = useState<string>("none");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    axios.get("/api/getAlarms").then((data) => {
      if (data.data.length) {
        let alerts = data.data.filter((name) => name.includes(".mp3"));
        setAllAlarms(alerts);
        localStorage.setItem("allAlarms", JSON.stringify(alerts));
      }
    });

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  const store = {
    isClock: isClock,
    setIsClock: (isClock: boolean): void => {
      setIsClock(isClock);
      localStorage.setItem("isClock", JSON.stringify(isClock));
    },
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: (isLoggedIn: boolean): void => {
      setIsLoggedIn(isLoggedIn);
      localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    },
    pomodoroTime: pomodoroTime,
    setPomodoroTime: (time: number): void => {
      setPomodoroTime(time);
      localStorage.setItem("pom", time.toString());
    },
    shortBreakTime: shortBreakTime,
    setShortBreakTime: (time: number): void => {
      setShortBreakTime(time);
      localStorage.setItem("short", time.toString());
    },
    longBreakTime: longBreakTime,
    setLongBreakTime: (time: number): void => {
      setLongBreakTime(time);
      localStorage.setItem("long", time.toString());
    },
    autoStartBreak: autoStartBreak,
    setAutoStartBreak: (auto: boolean): void => {
      setAutoStartBreak(auto);
      localStorage.setItem("auto", JSON.stringify(auto));
    },
    showSeconds: showSeconds,
    setShowSeconds: (showSeconds: boolean): void => {
      setShowSeconds(showSeconds);
      localStorage.setItem("showSeconds", JSON.stringify(showSeconds));
    },
    is24Hour: is24Hour,
    setIs24Hour: (is24Hour: boolean): void => {
      setIs24Hour(is24Hour);
      localStorage.setItem("24", JSON.stringify(is24Hour));
    },
    selectedAlert: selectedAlert,
    setSelectedAlert: (alert: string): void => {
      setSelectedAlert(alert);
      localStorage.setItem("alert", alert);
    },
    allAlarms: allAlarms,
    setAllAlarms: (alarms: string[]): void => {
      setAllAlarms(alarms);
      localStorage.setItem("allAlarms", JSON.stringify(alarms));
    },
    musicVolume: musicVolume,
    setMusicVolume: (volume: number): void => {
      setMusicVolume(volume);
      localStorage.setItem("musicVolume", volume.toString());
    },
    alertVolume: alertVolume,
    setAlertVolume: (volume: number): void => {
      setAlertVolume(volume);
      localStorage.setItem("alertVolume", volume.toString());
    },
    zip: zip,
    setZip: (zip: string): void => {
      setZip(zip);
      localStorage.setItem("zip", zip);
    },
    showSettings: showSettings,
    setShowSettings: (show: boolean): void => {
      setShowSettings(show);
    },
    currentWeather: currentWeather,
    setCurrentWeather: (weather: any) => {
      setCurrentWeather(weather);
    },
    currentAmbiance: currentAmbiance,
    setCurrentAmbiance: (currentAmbiance: string) => {
      setCurrentAmbiance(currentAmbiance);
      localStorage.setItem("currentAmbiance", currentAmbiance);
    },
    isMobile: isMobile
  };

  useEffect((): any => {
    const cachedClock = localStorage.getItem("isClock");
    const cachedLoggedIn = localStorage.getItem("isLoggedIn");
    const cachedPom = localStorage.getItem("pom");
    const cachedShort = localStorage.getItem("short");
    const cachedLong = localStorage.getItem("long");
    const cachedAuto = localStorage.getItem("auto");
    const cachedSeconds = localStorage.getItem("showSeconds");
    const cached24 = localStorage.getItem("24");
    const cachedAlert = localStorage.getItem("alert");
    const cachedAlarms = localStorage.getItem("allAlarms");
    const cachedMusicVol = localStorage.getItem("musicVolume");
    const cachedAlertVol = localStorage.getItem("alertVolume");
    const cachedZip = localStorage.getItem("zip");
    const cachedAmbiance = localStorage.getItem("currentAmbiance");
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
    if (cachedAlarms) {
      store.setAllAlarms(JSON.parse(cachedAlarms));
    }
    if (cachedMusicVol) {
      store.setMusicVolume(parseInt(cachedMusicVol));
    }
    if (cachedAlertVol) {
      store.setAlertVolume(parseInt(cachedAlertVol));
    }
    if (cachedZip) {
      store.setZip(cachedZip);
    }
    if (cachedAmbiance) {
      store.setCurrentAmbiance(cachedAmbiance);
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
