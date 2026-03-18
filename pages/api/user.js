export default function handler(req, res) {
  // 简化版本，不依赖数据库，直接返回无用户状态
  res.status(200).json({ user: null })
}