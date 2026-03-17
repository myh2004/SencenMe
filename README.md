# SecondMe 个人信息网站

这是一个集成 SecondMe OAuth 登录和个人信息获取的 Next.js 网站项目。

## 功能特性

- ✅ SecondMe OAuth 身份验证
- ✅ 个人信息获取和展示
- ✅ 简洁的用户界面
- ✅ 数据库存储用户信息

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma (SQLite)
- SecondMe API

## 快速开始

1. **安装依赖**
   ```bash
   npm install
   ```

2. **配置环境变量**
   项目已包含 `.env.local` 文件，包含必要的 SecondMe 配置。

3. **初始化数据库**
   ```bash
   npx prisma db push
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **访问应用**
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
D:\secondme-website\
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.ts      # OAuth 登录
│   │   │   ├── callback.ts   # OAuth 回调
│   │   │   └── logout.ts     # 退出登录
│   │   └── user.ts           # 获取用户信息
│   ├── _app.tsx              # App 组件
│   └── index.tsx             # 主页
├── prisma/
│   └── schema.prisma         # 数据库模式
├── styles/
│   └── globals.css           # 全局样式
└── .env.local                # 环境变量
```

## 使用说明

1. 点击"使用 SecondMe 登录"按钮
2. 完成 OAuth 授权流程
3. 查看个人信息展示
4. 点击"退出登录"结束会话

## 注意事项

- `.env.local` 文件包含敏感信息，请勿提交到版本控制
- 数据库文件 `dev.db` 会在首次运行时自动创建