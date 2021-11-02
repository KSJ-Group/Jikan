import axios from "axios";

export default async function getWeather(zip) {
  return axios
    .get(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER}&q=${zip}&aqi=no`
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
