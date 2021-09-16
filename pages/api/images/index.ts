import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from 'axios';
import { pexelAPI } from '../../../config.js';


interface Photo {
  url: string,
  avg_color: string,
}

const photos: Photo[] = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof photos>
) {
  let { terms, page } = req.query
  let query: AxiosRequestConfig = {
    method: `get`,
    url: `https://api.pexels.com/v1/search?query=${terms}&page=${page}&per_page=12&orientation=landscape`,
    headers: {Authorization: pexelAPI}
  }
  axios(query)
    .then((response) => {res.status(200).json(response.data.photos)})
    .catch((error) => {console.log(error)})
}