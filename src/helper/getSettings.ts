import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export async function getSettingsFromFirebase(store, user) {
  try {
    const snap = await getDoc(doc(db, user.uid, "settings"));
    if (snap.exists()) {
      const data = snap.data();
      store.setPomodoroTime(JSON.parse(data["pomodoroTime"]));
      store.setBreakTime(JSON.parse(data["breakTime"]));
      store.setAutoStartBreak(JSON.parse(data["autoStartBreak"]));
      store.setShowSeconds(JSON.parse(data["showSeconds"]));
      store.setIs24Hour(JSON.parse(data["is24Hour"]));
      store.setSelectedAlert(data["selectedAlert"]);
      store.setAllAlarms(JSON.parse(data["alarms"]));
      store.setMusicVolume(JSON.parse(data["musicVolume"]));
      store.setAlertVolume(JSON.parse(data["alertVolume"]));
      store.setZip(data["zip"]);
      store.setTaskItems(JSON.parse(data["taskItems"]));
      store.setOpenTasks(JSON.parse(data["openTasks"]));
      store.setShowQuote(JSON.parse(data["showQuote"]));
    }
  } catch (e) {
    console.log(e);
  }
}

export function getSettingsFromLocalStorage(store) {
  const cachedPom = localStorage.getItem("pom");
  const cachedShort = localStorage.getItem("short");
  const cachedAuto = localStorage.getItem("auto");
  const cachedSeconds = localStorage.getItem("showSeconds");
  const cached24 = localStorage.getItem("24");
  const cachedAlert = localStorage.getItem("alert");
  const cachedAlarms = localStorage.getItem("allAlarms");
  const cachedMusicVol = localStorage.getItem("musicVolume");
  const cachedAlertVol = localStorage.getItem("alertVolume");
  const cachedZip = localStorage.getItem("zip");
  const cachedTasks = localStorage.getItem("taskItems");
  const cachedOpenTasks = localStorage.getItem("openTasks");
  const cachedShowQuote = localStorage.getItem("showQuote");
  const cachedQuote = localStorage.getItem("quote");
  if (cachedPom) {
    store.setPomodoroTime(parseInt(cachedPom));
  }
  if (cachedShort) {
    store.setBreakTime(parseInt(cachedShort));
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
  if (cachedTasks) {
    store.setTaskItems(JSON.parse(cachedTasks));
  }
  if (cachedOpenTasks) {
    store.setOpenTasks(JSON.parse(cachedOpenTasks));
  }
  if (cachedShowQuote) {
    store.setShowQuote(JSON.parse(cachedShowQuote));
  }
  if (cachedQuote) {
    store.setQuote(cachedQuote);
  }
}
