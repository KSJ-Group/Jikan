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
      title: 'Anime Lofi',
      url: '//www.youtube.com/embed/w3LWHIz3bMc?autoplay=1'
    },
    {
      title: 'Calm Piano',
      url: '//www.youtube.com/embed/XULUBg_ZcAU?autoplay=1'
    },
    {
      title: 'Deep Focus',
      url: '//www.youtube.com/embed/8N-eLvmheSE?autoplay=1'
    },
    {
      title: 'Fallout Radio',
      url: '//www.youtube.com/embed/Ya3WXzEBL1E?autoplay=1'
    },
    {
      title: 'Indie / Pop / Rock',
      url: '//www.youtube.com/embed/1itSqkbXIlU?autoplay=1'
    },
    {
      title: 'Lofi Hip Hop',
      url: '//www.youtube.com/embed/5qap5aO4i9A?autoplay=1'
    },
    {
      title: 'Nintendo Radio',
      url: '//www.youtube.com/embed/tOnOutGHcRQ?autoplay=1'
    },
    {
      title: 'Relaxing Sleep',
      url: '//www.youtube.com/embed/n4M8j6ic1Ts?autoplay=1'
    },
    {
      title: 'Soothing Rain',
      url: '//www.youtube.com/embed/ZddHkhVUf2c?autoplay=1'
    },
    {
      title: 'Sounds of Nature',
      url: '//www.youtube.com/embed/gfo2xZ2SMjc?autoplay=1'
    },
    {
      title: 'Spooky Halloween Music',
      url: '//www.youtube.com/embed/qJSLmjzLnAM?autoplay=1'
    },
    {
      title: 'The Good Life',
      url: '//www.youtube.com/embed/36YnV9STBqc?autoplay=1'
    },
    {
      title: 'Weekend Jazz',
      url: '//www.youtube.com/embed/uKTUW9niMYg?autoplay=1'
    },
  ]
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
      title: 'Anime Lofi',
      url: '//www.youtube.com/embed/w3LWHIz3bMc?autoplay=1'
    },
    {
      title: 'Calm Piano',
      url: '//www.youtube.com/embed/XULUBg_ZcAU?autoplay=1'
    },
    {
      title: 'Deep Focus',
      url: '//www.youtube.com/embed/8N-eLvmheSE?autoplay=1'
    },
    {
      title: 'Fallout Radio',
      url: '//www.youtube.com/embed/Ya3WXzEBL1E?autoplay=1'
    },
    {
      title: 'Indie / Pop / Rock',
      url: '//www.youtube.com/embed/1itSqkbXIlU?autoplay=1'
    },
    {
      title: 'Lofi Hip Hop',
      url: '//www.youtube.com/embed/5qap5aO4i9A?autoplay=1'
    },
    {
      title: 'Nintendo Radio',
      url: '//www.youtube.com/embed/tOnOutGHcRQ?autoplay=1'
    },
    {
      title: 'Relaxing Sleep',
      url: '//www.youtube.com/embed/n4M8j6ic1Ts?autoplay=1'
    },
    {
      title: 'Soothing Rain',
      url: '//www.youtube.com/embed/ZddHkhVUf2c?autoplay=1'
    },
    {
      title: 'Sounds of Nature',
      url: '//www.youtube.com/embed/gfo2xZ2SMjc?autoplay=1'
    },
    {
      title: 'Spooky Halloween Music',
      url: '//www.youtube.com/embed/qJSLmjzLnAM?autoplay=1'
    },
    {
      title: 'The Good Life',
      url: '//www.youtube.com/embed/36YnV9STBqc?autoplay=1'
    },
    {
      title: 'Weekend Jazz',
      url: '//www.youtube.com/embed/uKTUW9niMYg?autoplay=1'
    },
  ]);

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
