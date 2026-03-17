import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' })
  }

  res.setHeader('Set-Cookie', 'session=; HttpOnly; Path=/; Max-Age=0')
  res.status(200).json({ message: '退出成功' })
}