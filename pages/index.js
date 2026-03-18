import { useState, useEffect } from 'react'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user)
        setLoading(false)
      })
      .catch(() => setLoading(false))
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

  if (loading) return React.createElement('div', { className: "min-h-screen flex items-center justify-center" }, '加载中...')

  return React.createElement('div', { className: "min-h-screen bg-gray-50 py-12 px-4" },
    React.createElement('div', { className: "max-w-md mx-auto bg-white rounded-lg shadow p-6" },
      React.createElement('h1', { className: "text-2xl font-bold text-center mb-8" }, 'Zhihu Echo - A2A 知识大脑'),

      user ?
        React.createElement('div', { className: "space-y-4" },
          user.avatar && React.createElement('img', { src: user.avatar, alt: "头像", className: "w-20 h-20 rounded-full mx-auto" }),
          React.createElement('div', { className: "text-center" },
            React.createElement('p', { className: "text-lg font-medium" }, user.name || '未知用户'),
            React.createElement('p', { className: "text-gray-600" }, user.email)
          ),
          React.createElement('div', { className: "space-y-3" },
            React.createElement('button', {
              onClick: () => window.location.href = '/knowledge',
              className: "w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 font-medium"
            }, '🧠 进入知识大脑'),
            React.createElement('button', {
              onClick: handleLogout,
              className: "w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            }, '退出登录')
          )
        ) :
        React.createElement('div', { className: "text-center" },
          React.createElement('p', { className: "mb-4 text-gray-600" }, '请登录以查看个人信息'),
          React.createElement('button', {
            onClick: handleLogin,
            className: "bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
          }, '使用 SecondMe 登录')
        )
    )
  )
}