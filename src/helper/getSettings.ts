import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export async function getSettingsFromFirebase(store, user) {
  console.log("User signed in. Getting background data from Firebase...");
  try {
    const snap = await getDoc(doc(db, user.uid, "settings"));
    if (snap.exists()) {
      const data = snap.data();
      console.log("Settings: ", data);
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
    } else {
      console.log("Settings data does not exist for user", user.uid);
    }
  } catch (e) {
    console.log(e);
  }
}

export function getSettingsFromLocalStorage(store) {
  console.log(
    "User not signed in. Getting background data from local storage..."
  );
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
}
