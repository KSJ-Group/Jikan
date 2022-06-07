import axios from "axios";
require("dotenv").config();

// https://developers.google.com/youtube/player_parameters

export default async function handler(req, res) {
  let { terms, eventType } = req.query;

  let params = {
    part: "snippet",
    maxResults: 20,
    key: process.env.YOUTUBE_API,
    eventType: "live",
    type: "video",
  };

  if (eventType !== "live") {
    params = {
      part: "snippet",
      maxResults: 20,
      key: process.env.YOUTUBE_API,
      type: "video",
      loop: 1,
    };
  }

  console.log(terms, eventType);

  const youtube = axios.create({
    baseURL: `https://www.googleapis.com/youtube/v3`,
    params: params,
  });

  const response = await youtube.get("/search", {
    params: {
      q: terms,
    },
  });
  return res.status(200).json(response.data);
}

// export const auth: string = process.env.local.AUTH!;
