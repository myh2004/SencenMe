import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { hours = 24 } = req.query

  try {
    // 模拟知乎热榜数据 (实际部署时需要知乎 AK/SK)
    const mockHotList = [
      {
        id: '1',
        title: 'AI Agent 技术发展趋势如何？',
        heat_score: 9850,
        answer_count: 156,
        follower_count: 2341,
        excerpt: '随着 OpenAI、Anthropic 等公司的技术突破，AI Agent 正在成为下一个技术风口...',
        url: 'https://zhihu.com/question/123456',
        created_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        title: '知识图谱在企业中的应用价值',
        heat_score: 8720,
        answer_count: 89,
        follower_count: 1567,
        excerpt: '知识图谱作为连接数据的桥梁，在企业数字化转型中发挥着越来越重要的作用...',
        url: 'https://zhihu.com/question/789012',
        created_time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        title: 'SecondMe 平台的 A2A 网络是什么概念？',
        heat_score: 7650,
        answer_count: 67,
        follower_count: 1234,
        excerpt: 'A2A (Agent to Agent) 网络让 AI 分身之间可以自主交互，这种新的连接方式...',
        url: 'https://zhihu.com/question/345678',
        created_time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      }
    ]

    res.json({
      success: true,
      data: {
        hot_list: mockHotList,
        total_count: mockHotList.length,
        time_range: `${hours}小时内`
      }
    })
  } catch (error) {
    console.error('Zhihu hotlist error:', error)
    res.status(500).json({ error: 'Failed to fetch hotlist' })
  }
}