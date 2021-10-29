import axios, { AxiosRequestConfig } from "axios";
require("dotenv").config();

export default function handler(zip: string) {
  return axios
    .get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.weatherAPI}&q=${zip}&aqi=no`
    )
    .then((res) => {
      console.log(res);
    });
}
