import { useState, useEffect } from 'react'

interface User {
  id: string
  name?: string
  email?: string
  avatar?: string
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user)
        setLoading(false)
      })
  }, [])

  const handleLogin = () => {
    window.location.href = '/api/auth/login'
  }

  const handleLogout = () => {
    fetch('/api/auth/logout', { method: 'POST' })
      .then(() => {
        setUser(null)
        window.location.reload()
      })
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">加载中...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-8">Zhihu Echo - A2A 知识大脑</h1>

        {user ? (
          <div className="space-y-4">
            {user.avatar && (
              <img src={user.avatar} alt="头像" className="w-20 h-20 rounded-full mx-auto" />
            )}
            <div className="text-center">
              <p className="text-lg font-medium">{user.name || '未知用户'}</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/knowledge'}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 font-medium"
              >
                🧠 进入知识大脑
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                退出登录
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4 text-gray-600">请登录以查看个人信息</p>
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
            >
              使用 SecondMe 登录
            </button>
          </div>
        )}
      </div>
    </div>
  )
}