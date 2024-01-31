import React, { useState, createContext, useContext, useEffect } from "react";
import firebase from '../firebase';
import { getSettingsFromFirebase, getSettingsFromLocalStorage } from "../helper/getSettings";
import checkMobile from "../helper/checkMobile";
import getAlarms from "../helper/getAlarms";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Weather {
  city: string
  tempC: string
  tempF: string
  weather: string
  icon: string
}

interface Task {
  complete: boolean
  taskText: string
  createdTime: number
}

export const SettingsContext = createContext({
  isLoading: true,
  isClock: true,
  setIsClock: (isClock: boolean) => { },
  pomodoroTime: 1500000,
  setPomodoroTime: (time: any) => { },
  breakTime: 300000,
  setBreakTime: (time: any) => { },
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
  isMobile: false,
  started: false,
  setStarted: (started: boolean) => { },
  user: {},
  setUser: (user: any) => { },
  taskItems: [],
  setTaskItems: (taskItems: Task[]) => { },
  openTasks: false,
  setOpenTasks: (open: boolean) => { },
  tasksLoading: false,
  setTasksLoading: (loading: boolean) => { },
  showQuote: false,
  setShowQuote: (show: boolean) => { },
  quote: "",
  setQuote: (quote: string) => { }
});

export const SettingsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isClock, setIsClock] = useState<boolean>(true);
  const [pomodoroTime, setPomodoroTime] = useState<number>(1500000);
  const [breakTime, setBreakTime] = useState<number>(300000);
  const [autoStartBreak, setAutoStartBreak] = useState<boolean>(true);
  const [showSeconds, setShowSeconds] = useState<boolean>(false);
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  const [selectedAlert, setSelectedAlert] = useState<string>("Xylophone.mp3");
  const [musicVolume, setMusicVolume] = useState<number>(100);
  const [alertVolume, setAlertVolume] = useState<number>(100);
  const [zip, setZip] = useState<string>('');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [currentWeather, setCurrentWeather] = useState<Weather>({
    city: '',
    tempC: '',
    tempF: '',
    weather: '',
    icon: '',
  });
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
  const [taskItems, setTaskItems] = useState<any>([]);
  const [openTasks, setOpenTasks] = useState<boolean>(false);
  const [tasksLoading, setTasksLoading] = useState<boolean>(false);
  const [showQuote, setShowQuote] = useState<boolean>(false);
  const [quote, setQuote] = useState<string>('');

  const store = {
    isLoading: isLoading,
    isClock: isClock,
    setIsClock: (isClock: boolean): void => {
      setIsClock(isClock);
      localStorage.setItem("isClock", JSON.stringify(isClock));
    },
    pomodoroTime: pomodoroTime,
    setPomodoroTime: (time: number): void => {
      setPomodoroTime(time);
      localStorage.setItem("pom", time.toString());
    },
    breakTime: breakTime,
    setBreakTime: (time: number): void => {
      setBreakTime(time);
      localStorage.setItem("short", time.toString());
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
    isMobile: isMobile,
    started: started,
    setStarted: (started: boolean) => {
      setStarted(started);
    },
    user: user,
    setUser: (user: any) => {
      setUser(user);
    },
    taskItems: taskItems,
    setTaskItems: (taskItems: any): void => {
      setTaskItems(taskItems);
      localStorage.setItem("taskItems", JSON.stringify(taskItems));
    },
    openTasks: openTasks,
    setOpenTasks: (open: boolean): void => {
      setOpenTasks(open);
      localStorage.setItem("openTasks", JSON.stringify(open));
    },
    tasksLoading: tasksLoading,
    setTasksLoading: (loading: boolean): void => {
      setTasksLoading(loading);
    },
    showQuote: showQuote,
    setShowQuote: (show: boolean): void => {
      setShowQuote(show);
      localStorage.setItem("showQuote", JSON.stringify(show));
      if (!show) {
        setQuote("");
        localStorage.removeItem("quote");
      }
    },
    quote: quote,
    setQuote: (quote: string): void => {
      setQuote(quote.replace(/"\//g, ""));
      localStorage.setItem("quote", quote);
    }
  };

  useEffect((): any => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
    getAlarms(setAllAlarms);
    checkMobile(setIsMobile);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) getSettingsFromFirebase(store, user);
    else getSettingsFromLocalStorage(store);
  }, [user])

  useEffect(() => {
    if (!showSettings && user && !isLoading) {
      updateDB();
    }
  }, [showSettings])

  useEffect(() => {
    if (!isLoading && user && tasksLoading) {
      updateDB();
    }
  }, [tasksLoading]);

  const updateDB = async () => {
    const data = {
      pomodoroTime: JSON.stringify(pomodoroTime),
      breakTime: JSON.stringify(breakTime),
      autoStartBreak: JSON.stringify(autoStartBreak),
      showSeconds: JSON.stringify(showSeconds),
      is24Hour: JSON.stringify(is24Hour),
      selectedAlert: selectedAlert,
      alarms: JSON.stringify(allAlarms),
      musicVolume: JSON.stringify(musicVolume),
      alertVolume: JSON.stringify(alertVolume),
      zip: zip,
      taskItems: JSON.stringify(taskItems),
      openTasks: JSON.stringify(openTasks),
      showQuote: JSON.stringify(showQuote),
    }

    try {
      const docRef = doc(db, user.uid, "settings");
      setDoc(docRef, data).then(() => {
        getSettingsFromFirebase(store, user);
      })
        .catch(error => {
          console.log(error);
        })
      setTasksLoading(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <SettingsContext.Provider value={store}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  return useContext(SettingsContext);
};
