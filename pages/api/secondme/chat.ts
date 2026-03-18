import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, sessionId } = req.body
  const userId = req.headers.authorization?.replace('Bearer ', '')

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // 调用 SecondMe A2A 聊天接口
    const response = await fetch(`${process.env.SECONDME_BASE_URL}/api/secondme/chat/stream`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        sessionId,
        systemPrompt: "你是一个知识管理助手，帮助用户整理和连接知识。"
      })
    })

    if (!response.ok) {
      throw new Error('SecondMe API error')
    }

    // 流式响应
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error('No response body')
    }

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = new TextDecoder().decode(value)
      res.write(chunk)
    }

    res.end()
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Chat failed' })
  }
}