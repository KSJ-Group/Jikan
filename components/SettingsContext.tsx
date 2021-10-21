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
  autoStartBreak: "Off",
  setAutoStartBreak: (auto: string) => { },
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
  selectedMusic: 'None',
  setMusic: (music: string) => { },
  music: [
    {
      title: 'None',
      url: 'None'
    },
    {
      title: 'Acoustic Folk',
      url: 'JoPeBwSJeVc'
    },
    {
      title: 'Anime Lofi Mix',
      url: 'w3LWHIz3bMc'
    },
    {
      title: 'Anime Music',
      url: 'NJvaGDTJEQU'
    },
    {
      title: 'Calm Piano',
      url: 'XULUBg_ZcAU'
    },
    {
      title: 'Deep Focus',
      url: '8N-eLvmheSE'
    },
    {
      title: 'Fallout Radio',
      url: 'Ya3WXzEBL1E'
    },
    {
      title: 'Indie / Pop / Rock',
      url: '1itSqkbXIlU'
    },
    {
      title: 'Lofi Hip Hop',
      url: '5qap5aO4i9A'
    },
    {
      title: 'Nintendo Radio',
      url: 'tOnOutGHcRQ'
    },
    {
      title: 'R&B Chill',
      url: 'L9Q1HUdUMp0'
    },
    {
      title: 'Relaxing Jazz',
      url: 'Dx5qFachd3A'
    },
    {
      title: 'Relaxing Sleep',
      url: 'n4M8j6ic1Ts'
    },
    {
      title: 'Soothing Rain',
      url: 'kXUqhIjdowQ'
    },
    {
      title: 'Sounds of Nature',
      url: 'gfo2xZ2SMjc'
    },
    {
      title: 'Spooky Halloween Music',
      url: 'qJSLmjzLnAM'
    },
    {
      title: 'Studio Ghibli',
      url: 'P8j-_MOSrec'
    },
    {
      title: 'The Beatles Greatest Hits',
      url: 'XAtsnyaJziM'
    },
    {
      title: 'The Good Life',
      url: '36YnV9STBqc'
    },
    {
      title: 'Video Game Tunes',
      url: '8txpDvFnh5o'
    },
  ],
  musicVolume: 20,
  setMusicVolume: (volume: number) => { },
  alertVolume: 50,
  setAlertVolume: (volume: number) => { }
});

export const SettingsProvider: React.FC = ({ children }) => {
  const [isClock, setIsClock] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [pomodoroTime, setPomodoroTime] = useState<number>(1500000);
  const [shortBreakTime, setShortBreakTime] = useState<number>(300000);
  const [longBreakTime, setLongBreakTime] = useState<number>(900000);
  const [autoStartBreak, setAutoStartBreak] = useState<string>("Off");
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
  const [selectedMusic, setMusic] = useState<string>('None');
  const [music, setAllMusic] = useState<{ title: string, url: string }[]>([
    {
      title: 'None',
      url: 'None'
    },
    {
      title: 'Acoustic Folk',
      url: 'JoPeBwSJeVc'
    },
    {
      title: 'Anime Lofi Mix',
      url: 'w3LWHIz3bMc'
    },
    {
      title: 'Anime Music',
      url: 'NJvaGDTJEQU'
    },
    {
      title: 'Calm Piano',
      url: 'XULUBg_ZcAU'
    },
    {
      title: 'Deep Focus',
      url: '8N-eLvmheSE'
    },
    {
      title: 'Fallout Radio',
      url: 'Ya3WXzEBL1E'
    },
    {
      title: 'Indie / Pop / Rock',
      url: '1itSqkbXIlU'
    },
    {
      title: 'Lofi Hip Hop',
      url: '5qap5aO4i9A'
    },
    {
      title: 'Nintendo Radio',
      url: 'tOnOutGHcRQ'
    },
    {
      title: 'R&B Chill',
      url: 'L9Q1HUdUMp0'
    },
    {
      title: 'Relaxing Jazz',
      url: 'Dx5qFachd3A'
    },
    {
      title: 'Relaxing Sleep',
      url: 'n4M8j6ic1Ts'
    },
    {
      title: 'Soothing Rain',
      url: 'kXUqhIjdowQ'
    },
    {
      title: 'Sounds of Nature',
      url: 'gfo2xZ2SMjc'
    },
    {
      title: 'Spooky Halloween Music',
      url: 'qJSLmjzLnAM'
    },
    {
      title: 'Studio Ghibli',
      url: 'P8j-_MOSrec'
    },
    {
      title: 'The Beatles Greatest Hits',
      url: 'XAtsnyaJziM'
    },
    {
      title: 'The Good Life',
      url: '36YnV9STBqc'
    },
    {
      title: 'Video Game Tunes',
      url: '8txpDvFnh5o'
    },
  ]);
  const [musicVolume, setMusicVolume] = useState<number>(20);
  const [alertVolume, setAlertVolume] = useState<number>(50);

  useEffect(() => {
    axios.get("/api/getAlarms").then((data) => {
      if (data.data.length) {
        let alerts = data.data.filter((name) => name.includes(".mp3"));
        setAllAlarms(alerts);
        localStorage.setItem("allAlarms", JSON.stringify(alerts));
      }
    });
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
    setAutoStartBreak: (auto: string): void => {
      setAutoStartBreak(auto);
      localStorage.setItem("auto", auto);
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
    selectedMusic: selectedMusic,
    setMusic: (music: string): void => {
      setMusic(music);
    },
    music: music,
    setAllMusic: (music: { title: string, url: string }[]): void => {
      setAllMusic(music);
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
    }
  };

  useEffect((): any => {
    let cachedClock = localStorage.getItem("isClock");
    let cachedLoggedIn = localStorage.getItem("isLoggedIn");
    let cachedPom = localStorage.getItem("pom");
    let cachedShort = localStorage.getItem("short");
    let cachedLong = localStorage.getItem("long");
    let cachedAuto = localStorage.getItem("auto");
    let cachedSeconds = localStorage.getItem("showSeconds");
    let cached24 = localStorage.getItem("24");
    let cachedAlert = localStorage.getItem("alert");
    let cachedAlarms = localStorage.getItem("allAlarms");
    let cachedMusicVol = localStorage.getItem("musicVolume");
    let cachedAlertVol = localStorage.getItem("alertVolume");
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
      store.setAutoStartBreak(cachedAuto);
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
