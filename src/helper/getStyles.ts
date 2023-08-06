import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export async function getStylesFromFirebase(store, user) {
  try {
    const snap = await getDoc(doc(db, user.uid, "styles"));
    if (snap.exists()) {
      const data = snap.data();
      store.setSelectedFont(data["selectedFont"]);
      store.setBrightness(parseInt(data["brightness"]));
      store.setBlur(JSON.parse(data["blur"]));
      store.setSize(data["size"]);
      store.setOpacity(parseInt(data["opacity"]));
    }
  } catch (e) {
    console.log(e);
  }
}

export function getStylesFromLocalStorage(store) {
  const cachedFont = localStorage.getItem("font");
  const cachedBrightness = localStorage.getItem("brightness");
  const cachedBlur = localStorage.getItem("blur");
  const cachedSize = localStorage.getItem("clockSize");
  const cachedOpacity = localStorage.getItem("opacity");
  const position = localStorage.getItem("position");
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
  if (position) {
    store.setPos(JSON.parse(position));
  }
}
