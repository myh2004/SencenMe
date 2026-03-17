import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query

  if (!code) {
    return res.status(400).json({ error: '缺少授权码' })
  }

  try {
    // 交换访问令牌
    const tokenResponse = await fetch(process.env.SECONDME_TOKEN_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.SECONDME_CLIENT_ID!,
        client_secret: process.env.SECONDME_CLIENT_SECRET!,
        code: code as string,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback`
      })
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      throw new Error('获取访问令牌失败')
    }

    // 获取用户信息
    const userResponse = await fetch(`${process.env.SECONDME_BASE_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    })

    const userData = await userResponse.json()

    // 保存用户信息
    const user = await prisma.user.upsert({
      where: { secondmeId: userData.id },
      update: {
        accessToken: tokenData.access_token,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar
      },
      create: {
        secondmeId: userData.id,
        accessToken: tokenData.access_token,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar
      }
    })

    // 设置会话
    res.setHeader('Set-Cookie', `session=${user.id}; HttpOnly; Path=/; Max-Age=86400`)
    res.redirect('/')
  } catch (error) {
    console.error('OAuth 回调错误:', error)
    res.status(500).json({ error: '登录失败' })
  }
}