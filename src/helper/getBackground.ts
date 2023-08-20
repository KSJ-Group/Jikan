import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export async function getBgFromFirebase(store, user) {
  try {
    const snap = await getDoc(doc(db, user.uid, "background"));
    if (snap.exists()) {
      const data = snap.data();
      store.setBackground(data["background"]);
      store.setRecentlySelected(JSON.parse(data["recentlySelected"]));
      store.setFavorites(JSON.parse(data["favorites"]));
    }
  } catch (e) {
    console.log(e);
  }
}

export function getBgFromLocalStorage(store) {
  const cachedBackground = localStorage.getItem("background");
  const cachedEventType = localStorage.getItem("eventType");
  const cachedRecentlySelected = localStorage.getItem("recentlySelected");
  const cachedFavorites = localStorage.getItem("favorites");
  if (cachedBackground) {
    store.setBackground(cachedBackground);
  }
  if (cachedEventType) {
    store.setEventType(cachedEventType);
  }
  if (cachedRecentlySelected) {
    store.setRecentlySelected(JSON.parse(cachedRecentlySelected));
  }
  if (cachedFavorites) {
    store.setFavorites(JSON.parse(cachedFavorites));
  }
}
