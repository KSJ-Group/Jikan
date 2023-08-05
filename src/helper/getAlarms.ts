import axios from "axios";

export default function getAlarms(setAllAlarms) {
  axios.get("/api/getAlarms").then((data) => {
    if (data.data.length) {
      let alerts = data.data.filter((name) => name.includes(".mp3"));
      setAllAlarms(alerts);
      localStorage.setItem("allAlarms", JSON.stringify(alerts));
    }
  });
}
