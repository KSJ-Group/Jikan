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
      title: 'Coffee Shop Ambiance',
      url: 'dx3GxpitvbY'
    },
    {
      title: 'Christmas Tunes',
      url: 'mDTH8UuGxEY'
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
      url: 'HCOO8FdXR1c'
    },
    {
      title: 'Soothing Rain',
      url: '5tA0Onw2wyQ'
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
  alertVolume: 80,
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
  token: '',
  setToken: (token: string) => { },
  tracks: [],
  setTracks: (tracks: any) => { },
  playlists: [],
  setPlaylists: (playlists: any) => { },
  currentPlaylist: null,
  setCurrentPlaylist: (playlist: any) => { },
  playlistName: '',
  setPlaylistName: (name: string) => { },
  // handleLogin: () => { }
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
      url: 'WDXPJWIgX-o'
    },
    // {
    //   title: 'Anime Music',
    //   url: 'NJvaGDTJEQU'
    // },
    {
      title: 'Beautiful Piano',
      url: 'xWRHTpqQMGM'
    },
    {
      title: 'Coffee Shop Ambiance',
      url: 'mkgylOJSdhE'
    },
    {
      title: 'Christmas Tunes',
      url: 'mDTH8UuGxEY'
    },
    {
      title: 'Deep Focus',
      url: 'yfYjEkaN-1s'
    },
    {
      title: 'Dubstep, Trap, EDM, Electro House',
      url: '8NzYo0jmYek'
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
      title: 'lofi hip hop radio - beats to relax/study to',
      url: '5qap5aO4i9A'
    },
    {
      title: 'Nintendo Radio',
      url: 'MBA_x8kP-yo'
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
      url: 'MzCOqGCPvkE'
    },
    {
      title: 'Soothing Rain',
      url: '42M3esYyHdw'
    },
    {
      title: 'Ocean Waves',
      url: 'rZ7VVGvrfiA'
    },
    // {
    //   title: 'Spooky Halloween Music',
    //   url: 'qJSLmjzLnAM'
    // },
    // {
    //   title: 'Studio Ghibli',
    //   url: 'P8j-_MOSrec'
    // },
    {
      title: 'Oldies But Goodies',
      url: 'x0Y-VAmnMOI'
    },
    {
      title: 'The Good Life',
      url: '36YnV9STBqc'
    },
  ]);
  const [musicVolume, setMusicVolume] = useState<number>(20);
  const [alertVolume, setAlertVolume] = useState<number>(80);
  const [zip, setZip] = useState<string>('');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [currentWeather, setCurrentWeather] = useState<any>({
    city: '',
    tempC: '',
    tempF: '',
    weather: '',
    icon: '',
  });
  const [token, setToken] = useState<string>('');
  const [tracks, setTracks] = useState<any>([]);
  const [playlists, setPlaylists] = useState<any>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<any>();
  const [playlistName, setPlaylistName] = useState<any>("");

  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000";
  const SPACE_DELIMITER = "%20";
  const SCOPES = [
    "streaming",
    "playlist-read-private",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-modify-playback-state",
  ];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

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
    token: token,
    setToken: (token: string): void => {
      setToken(token);
    },
    tracks: tracks,
    setTracks: (tracks: any): void => {
      setTracks(tracks);
    },
    playlists: playlists,
    setPlaylists: (playlists: any): void => {
      setPlaylists(playlists);
    },
    currentPlaylist: currentPlaylist,
    setCurrentPlaylist: (playlist: any): void => {
      setCurrentPlaylist(playlist);
    },
    playlistName: playlistName,
    setPlaylistName: (name: string): void => {
      setPlaylistName(name);
    },
    handleLogin: () => {
      window.location.href = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=false`;
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
    let cachedZip = localStorage.getItem("zip");
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
    if (cachedZip) {
      store.setZip(cachedZip);
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
