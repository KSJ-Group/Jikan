import axios from "axios";

export default async function getWeather(zip: string) {
  axios
    .get(
      `http://api.weatherapi.com/v1/current.json?key=dcb37445c9f44f6ba79154233212910&q=${zip}&aqi=no`
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
