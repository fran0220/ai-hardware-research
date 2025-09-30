# 部署指南

## 🚀 快速部署到服务器

VitePress生成的是纯静态文件,可以部署到任何Web服务器。

### 📦 构建生产版本

```bash
npm run docs:build
```

构建产物位于: `docs/.vitepress/dist/`

---

## 🌐 服务器部署方案

### 方案1: Nginx直接部署

#### 步骤1: 上传文件

```bash
# 使用SCP上传
scp -r docs/.vitepress/dist/* user@your-server:/var/www/airesearch/

# 或使用rsync同步
rsync -avz --delete docs/.vitepress/dist/ user@your-server:/var/www/airesearch/
```

#### 步骤2: 配置Nginx

创建 `/etc/nginx/sites-available/airesearch`:

```nginx
server {
    listen 80;
    server_name airesearch.yourdomain.com;
    root /var/www/airesearch;
    index index.html;

    # Gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
    gzip_min_length 1000;

    # SPA路由支持
    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### 步骤3: 启用站点

```bash
sudo ln -s /etc/nginx/sites-available/airesearch /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 步骤4: 配置HTTPS (Let's Encrypt)

```bash
sudo certbot --nginx -d airesearch.yourdomain.com
```

---

### 方案2: Docker部署

#### 创建Dockerfile

在项目根目录创建 `Dockerfile`:

```dockerfile
# 阶段1: 构建
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run docs:build

# 阶段2: Nginx服务
FROM nginx:alpine
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### 创建nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 构建和运行

```bash
# 构建镜像
docker build -t ai-hardware-research .

# 运行容器
docker run -d -p 80:80 --name airesearch ai-hardware-research

# 或使用docker-compose
```

#### docker-compose.yml

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

---

### 方案3: GitHub Actions自动部署

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Server

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build
        run: npm run docs:build

      - name: Deploy to Server
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          source: "docs/.vitepress/dist/*"
          target: "/var/www/airesearch/"
          strip_components: 3
          rm: true
```

**配置GitHub Secrets**:
- `SERVER_HOST`: 服务器IP或域名
- `SERVER_USER`: SSH用户名
- `SSH_PRIVATE_KEY`: SSH私钥

---

## 🎨 其他部署平台

### GitHub Pages (免费)

1. 创建 `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run docs:build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

2. GitHub仓库设置 → Pages → Source选择 "GitHub Actions"

访问: `https://fran0220.github.io/ai-hardware-research/`

---

### Netlify (免费)

```bash
# 安装Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 部署
netlify deploy --prod --dir=docs/.vitepress/dist
```

或连接GitHub自动部署:
1. 访问 https://app.netlify.com
2. "New site from Git" → 选择仓库
3. Build command: `npm run docs:build`
4. Publish directory: `docs/.vitepress/dist`

---

### Vercel (免费)

```bash
# 安装Vercel CLI
npm install -g vercel

# 部署
vercel --prod
```

或连接GitHub自动部署:
1. 访问 https://vercel.com
2. Import Project → 选择仓库
3. Framework Preset: VitePress
4. 自动检测配置

---

## 🔧 服务器要求

### 最低配置
- **CPU**: 1核
- **内存**: 512MB
- **存储**: 5GB
- **Web服务器**: Nginx/Apache/Caddy

### 推荐配置
- **CPU**: 1-2核
- **内存**: 1GB
- **存储**: 10GB
- **带宽**: 5Mbps
- **操作系统**: Ubuntu 22.04 / Debian 12

---

## 📊 性能优化

### 1. 开启Brotli压缩 (比Gzip更优)

```nginx
# 需要安装nginx-mod-http-brotli
brotli on;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
brotli_comp_level 6;
```

### 2. CDN加速

推荐使用:
- **Cloudflare** (免费,全球CDN)
- **阿里云CDN** (国内访问快)
- **腾讯云CDN**

### 3. HTTP/2启用

```nginx
listen 443 ssl http2;
```

---

## 🔄 更新流程

### 手动更新

```bash
# 1. 本地修改Markdown文件
# 2. 构建
npm run docs:build

# 3. 上传到服务器
rsync -avz --delete docs/.vitepress/dist/ user@server:/var/www/airesearch/
```

### 自动更新 (GitHub Actions)

1. 修改Markdown文件
2. Commit并Push到GitHub
3. GitHub Actions自动构建并部署

---

## 📝 自定义域名

### DNS配置

添加A记录或CNAME:
```
airesearch.yourdomain.com  →  服务器IP
```

### SSL证书

```bash
# Let's Encrypt (免费,自动续期)
sudo certbot --nginx -d airesearch.yourdomain.com
```

---

## 🐛 常见问题

### 1. 404错误
**原因**: Nginx未配置SPA路由
**解决**: 添加 `try_files $uri $uri/ $uri.html /index.html;`

### 2. 样式丢失
**原因**: base路径配置错误
**解决**: 检查 `config.ts` 中的 `base` 配置

### 3. 搜索不工作
**原因**: 本地搜索需要完整的静态文件
**解决**: 确保所有文件都已上传,包括 `hashmap.json`

---

## 📞 技术支持

- GitHub仓库: https://github.com/fran0220/ai-hardware-research
- VitePress文档: https://vitepress.dev
- Nginx文档: https://nginx.org/en/docs/