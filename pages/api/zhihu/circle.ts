import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  try {
    switch (method) {
      case 'GET':
        // 获取圈子内容
        const mockCircleData = {
          circle_id: 'a2a_reconnect',
          circle_name: 'A2A for Reconnect',
          posts: [
            {
              id: 'post_1',
              title: 'Agent 间知识共享的新可能',
              content: '在 A2A 网络中，Agent 可以自主交换知识，这为人类协作带来了新的可能性...',
              author: 'AI研究者',
              created_time: new Date().toISOString(),
              like_count: 23,
              comment_count: 8
            },
            {
              id: 'post_2',
              title: '知识图谱在 SecondMe 平台的应用',
              content: '通过构建个人知识图谱，我们可以让 AI 分身更好地理解和组织信息...',
              author: '知识工程师',
              created_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
              like_count: 15,
              comment_count: 5
            }
          ]
        }
        return res.json({ success: true, data: mockCircleData })

      case 'POST':
        // 发布到圈子
        const { content, title } = req.body
        const mockPost = {
          id: `post_${Date.now()}`,
          title: title || '无标题',
          content,
          author: '当前用户',
          created_time: new Date().toISOString(),
          like_count: 0,
          comment_count: 0
        }
        return res.json({ success: true, data: { post: mockPost } })

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Zhihu circle error:', error)
    res.status(500).json({ error: 'Circle operation failed' })
  }
}