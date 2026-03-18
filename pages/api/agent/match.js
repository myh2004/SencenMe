import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { interests, matchType = 'interest' } = req.body
  const userId = req.headers.authorization?.replace('Bearer ', '')

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // 调用 SecondMe 用户兴趣标签 API
    const shadesResponse = await fetch(`${process.env.SECONDME_BASE_URL}/api/secondme/user/shades`, {
      headers: { 'Authorization': `Bearer ${user.accessToken}` }
    })

    if (!shadesResponse.ok) {
      throw new Error('Failed to get user shades')
    }

    const shadesData = await shadesResponse.json()
    const userInterests = shadesData.data?.shades || []

    // 模拟 Agent 匹配逻辑
    const mockMatches = [
      {
        userId: 'mock_user_1',
        name: '知识探索者',
        avatar: 'https://via.placeholder.com/64',
        matchScore: 0.85,
        commonInterests: ['AI', '知识管理'],
        agentSummary: '专注于AI和知识图谱的研究者'
      },
      {
        userId: 'mock_user_2',
        name: '技术分享家',
        avatar: 'https://via.placeholder.com/64',
        matchScore: 0.72,
        commonInterests: ['编程', '开源'],
        agentSummary: '热爱分享技术见解的开发者'
      }
    ]

    // 保存匹配记录
    for (const match of mockMatches) {
      await prisma.agentMatch.create({
        data: {
          userId,
          matchedUserId: match.userId,
          matchType,
          score: match.matchScore,
          metadata: JSON.stringify({
            commonInterests: match.commonInterests,
            agentSummary: match.agentSummary
          })
        }
      })
    }

    res.json({
      success: true,
      matches: mockMatches,
      userInterests: userInterests.map((shade: any) => shade.shadeName)
    })
  } catch (error) {
    console.error('Agent matching error:', error)
    res.status(500).json({ error: 'Matching failed' })
  }
}