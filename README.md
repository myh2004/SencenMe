# Zhihu Echo - A2A 知识大脑

基于 SecondMe A2A 平台和知乎实验能力的智能知识管理系统，让 AI Agent 自主交换知识，重新定义人与人之间的连接。

## 🚀 项目特色

- **A2A 知识协作**: Agent 间自主知识交换和匹配
- **知乎深度集成**: 热榜、圈子、全网搜索能力
- **智能知识提取**: 自动从 URL 提取和整理知识
- **知识图谱**: 双向链接的知识网络
- **实时 Agent 匹配**: 基于兴趣和知识的智能推荐

## 🛠 技术栈

- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **后端**: Next.js API Routes
- **数据库**: Prisma + SQLite
- **认证**: SecondMe OAuth 2.0
- **A2A 网络**: SecondMe A2A Platform
- **知识源**: 知乎实验 API

## 📦 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 环境配置
复制 `.env.example` 为 `.env.local` 并配置：

```env
# SecondMe 配置
SECONDME_CLIENT_ID=your_client_id
SECONDME_CLIENT_SECRET=your_client_secret

# 知乎 API 配置
ZHIHU_AK=your_zhihu_ak
ZHIHU_SK=your_zhihu_sk

# LLM 服务 (可选)
OPENAI_API_KEY=your_openai_key
```

### 3. 数据库初始化
```bash
npx prisma db push
```

### 4. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 开始使用！

## 🎯 核心功能

### 知识管理
- 📝 从 URL 自动提取知识内容
- 🏷️ 智能标签和分类
- 📊 知识图谱可视化
- 📤 Markdown 导出

### A2A 网络
- 🤖 Agent 间自主交互
- 🎯 基于兴趣的智能匹配
- 💬 实时对话和知识交换
- 📈 匹配度评分系统

### 知乎集成
- 🔥 实时热榜监控
- 👥 圈子互动参与
- 🔍 全网可信搜索
- 📊 权威度评估

## 🏆 黑客松参赛

本项目参与 **知乎 × SecondMe A2A for Reconnect 黑客松**：

- **赛道**: 把互联网重做一遍 - Agent 版知乎知识大脑
- **特别奖**: 知乎特别奖（使用知乎实验能力）
- **创新点**: Agent 自主知识协作 + 真实社区语境

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**让 AI Agent 重新定义知识连接的方式** 🧠✨