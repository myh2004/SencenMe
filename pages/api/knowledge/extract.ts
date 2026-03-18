import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { url, title, tags } = req.body
  const userId = req.headers.authorization?.replace('Bearer ', '')

  if (!userId || !url) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // 模拟知识提取 (实际应用中会调用 LLM API)
    const mockContent = `从 ${url} 提取的知识内容...`
    const mockSummary = `关于 ${title || '未知主题'} 的知识摘要`
    const mockMarkdown = `# ${title || '知识节点'}\n\n${mockContent}`

    const knowledgeNode = await prisma.knowledgeNode.create({
      data: {
        title: title || '未命名知识节点',
        content: mockContent,
        summary: mockSummary,
        tags: tags || '',
        sourceUrl: url,
        sourceType: url.includes('zhihu.com') ? 'zhihu_answer' : 'external',
        markdown: mockMarkdown,
        userId,
        metadata: JSON.stringify({ extractedAt: new Date().toISOString() })
      }
    })

    res.json({ success: true, node: knowledgeNode })
  } catch (error) {
    console.error('Knowledge extraction error:', error)
    res.status(500).json({ error: 'Extraction failed' })
  }
}