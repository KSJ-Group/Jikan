import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  image: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'REQUEST')
    return new Promise((resolve, reject) => {
      resolve(res.status(200).json({ image: 'this should be a string'}))
    }).catch((error) => {console.log(error)})


}