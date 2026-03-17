import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionCookie = req.cookies.session

  if (!sessionCookie) {
    return res.status(200).json({ user: null })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: sessionCookie },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true
      }
    })

    res.status(200).json({ user })
  } catch (error) {
    console.error('获取用户信息错误:', error)
    res.status(500).json({ error: '获取用户信息失败' })
  }
}