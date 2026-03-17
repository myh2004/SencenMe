# 部署到服务器指南

## 方法一：直接上传到服务器

1. **打包项目**
   ```bash
   npm run build
   ```

2. **上传文件到服务器**
   - 将整个项目文件夹上传到服务器
   - 确保包含 `.env.local` 文件（但要更新其中的 URL）

3. **在服务器上安装依赖**
   ```bash
   npm install --production
   ```

4. **更新环境变量**
   将 `.env.local` 中的 `NEXTAUTH_URL` 改为你的服务器域名：
   ```
   NEXTAUTH_URL=https://your-domain.com
   ```

5. **启动应用**
   ```bash
   npm start
   ```

## 方法二：使用 GitHub + Vercel 网页部署

1. **推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/secondme-website.git
   git push -u origin main
   ```

2. **在 Vercel 网站部署**
   - 访问 https://vercel.com
   - 连接 GitHub 仓库
   - 自动部署

## 需要更新的配置

部署后记得更新：
1. SecondMe 开发者平台的重定向 URI
2. 环境变量中的 NEXTAUTH_URL