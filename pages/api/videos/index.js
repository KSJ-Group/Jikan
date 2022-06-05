import axios from "axios";
require("dotenv").config();

const youtube = axios.create({
  baseURL: `https://www.googleapis.com/youtube/v3`,
  params: {
    part: 'snippet',
    maxResults: 10,
    key: process.env.YOUTUBE_API,
    eventType: 'live',
    type: 'video'
  }
})

export default async function handler(req, res) {
  let { terms } = req.query;
  const response = await youtube.get('/search', {
    params: {
        q: terms + ' music'
    }
  })
  // console.log(response.data.items);
  return res.status(200).json(response.data);
}

// export const auth: string = process.env.local.AUTH!;
