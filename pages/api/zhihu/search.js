import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { q: query, limit = 10 } = req.query

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' })
  }

  try {
    // 模拟知乎全网可信搜索结果 (实际部署时需要知乎 AK/SK)
    const mockSearchResults = [
      {
        id: 'search_1',
        title: `关于"${query}"的深度分析`,
        type: 'answer',
        excerpt: `这是一个关于${query}的详细回答，涵盖了核心概念、应用场景和发展趋势...`,
        author: {
          name: '专业研究者',
          authority_level: 'HIGH',
          follower_count: 15000
        },
        url: `https://zhihu.com/question/123456/answer/789012`,
        vote_count: 234,
        comment_count: 45,
        created_time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'search_2',
        title: `${query}在实际项目中的应用经验`,
        type: 'article',
        excerpt: `本文分享了在实际项目中应用${query}的经验和踩坑记录，希望对大家有帮助...`,
        author: {
          name: '技术实践者',
          authority_level: 'MEDIUM',
          follower_count: 8500
        },
        url: `https://zhuanlan.zhihu.com/p/567890`,
        vote_count: 156,
        comment_count: 23,
        created_time: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
      }
    ]

    res.json({
      success: true,
      data: {
        results: mockSearchResults.slice(0, Number(limit)),
        total_count: mockSearchResults.length,
        query: query as string
      }
    })
  } catch (error) {
    console.error('Zhihu search error:', error)
    res.status(500).json({ error: 'Search failed' })
  }
}