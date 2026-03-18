import { useState, useEffect } from 'react'

interface KnowledgeNode {
  id: string
  title: string
  summary?: string
  tags: string
  sourceUrl?: string
  createdAt: string
}

interface AgentMatch {
  userId: string
  name: string
  avatar: string
  matchScore: number
  commonInterests: string[]
  agentSummary: string
}

export default function Knowledge() {
  const [nodes, setNodes] = useState<KnowledgeNode[]>([])
  const [matches, setMatches] = useState<AgentMatch[]>([])
  const [extractUrl, setExtractUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleExtract = async () => {
    if (!extractUrl) return

    setLoading(true)
    try {
      const response = await fetch('/api/knowledge/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: extractUrl })
      })

      if (response.ok) {
        setExtractUrl('')
        loadNodes()
      }
    } catch (error) {
      console.error('Extract failed:', error)
    }
    setLoading(false)
  }

  const handleAgentMatch = async () => {
    try {
      const response = await fetch('/api/agent/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchType: 'knowledge' })
      })

      if (response.ok) {
        const data = await response.json()
        setMatches(data.matches)
      }
    } catch (error) {
      console.error('Agent match failed:', error)
    }
  }

  const loadNodes = async () => {
    // Mock data for demo
    setNodes([
      {
        id: '1',
        title: 'AI 知识图谱构建方法',
        summary: '探讨如何构建高质量的AI知识图谱',
        tags: 'AI,知识图谱,机器学习',
        sourceUrl: 'https://zhihu.com/question/123456',
        createdAt: new Date().toISOString()
      }
    ])
  }

  useEffect(() => {
    loadNodes()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Zhihu Echo - 知识大脑</h1>

        {/* 知识提取 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">知识提取</h2>
          <div className="flex gap-4">
            <input
              type="url"
              value={extractUrl}
              onChange={(e) => setExtractUrl(e.target.value)}
              placeholder="输入知乎链接或其他URL"
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={handleExtract}
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? '提取中...' : '提取知识'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 知识节点 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">我的知识节点</h2>
            <div className="space-y-4">
              {nodes.map((node) => (
                <div key={node.id} className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg">{node.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{node.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {node.tags.split(',').map((tag, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  {node.sourceUrl && (
                    <a href={node.sourceUrl} target="_blank" rel="noopener noreferrer"
                       className="text-blue-500 text-sm mt-2 block hover:underline">
                      查看原文 →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Agent 匹配 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Agent 知识伙伴</h2>
              <button
                onClick={handleAgentMatch}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                寻找伙伴
              </button>
            </div>
            <div className="space-y-4">
              {matches.map((match, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={match.avatar} alt={match.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <h3 className="font-medium">{match.name}</h3>
                      <p className="text-sm text-gray-600">匹配度: {(match.matchScore * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{match.agentSummary}</p>
                  <div className="flex flex-wrap gap-1">
                    {match.commonInterests.map((interest, j) => (
                      <span key={j} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {interest}
                      </span>
                    ))}
                  </div>
                  <button className="mt-2 text-blue-500 text-sm hover:underline">
                    开始对话 →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}