# Nova Admin 部署指南

## 🚀 快速部署

### 1. 构建项目

```bash
# 安装依赖
pnpm install

# 构建生产版本
pnpm build

# 构建完成后，dist/ 目录包含所有静态文件
```

### 2. 部署到静态服务器

#### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/nova-admin;
    index index.html;

    # 处理 Vue Router 的 history 模式
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API 代理（如果需要）
    location /api/ {
        proxy_pass http://your-backend-server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Apache 配置示例

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/nova-admin

    <Directory /var/www/nova-admin>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # 处理 Vue Router 的 history 模式
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</VirtualHost>
```

### 3. 部署到 CDN

#### 使用 Vercel

1. 安装 Vercel CLI

```bash
npm i -g vercel
```

2. 部署

```bash
vercel --prod
```

#### 使用 Netlify

1. 创建 `netlify.toml` 文件

```toml
[build]
  publish = "dist"
  command = "pnpm build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. 连接 GitHub 仓库并自动部署

## 🔧 环境配置

### 生产环境变量

创建 `.env.production` 文件：

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_APP_TITLE=Nova Admin
VITE_APP_VERSION=1.0.0
VITE_MOCK_API=false
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
```

### 构建配置

在 `vite.config.ts` 中配置构建选项：

```typescript
export default defineConfig({
  build: {
    // 输出目录
    outDir: 'dist',

    // 资源内联阈值
    assetsInlineLimit: 4096,

    // 分块策略
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          utils: ['axios']
        }
      }
    },

    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
```

## 📦 Docker 部署

### Dockerfile

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 复制 package 文件
COPY package*.json ./
COPY pnpm-lock.yaml ./

# 安装依赖
RUN npm install -g pnpm
RUN pnpm install

# 复制源代码
COPY . .

# 构建应用
RUN pnpm build

# 生产阶段
FROM nginx:alpine

# 复制构建结果
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  nova-admin:
    build: .
    ports:
      - '80:80'
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## 🌐 域名和 SSL

### 配置 HTTPS

使用 Let's Encrypt 免费 SSL 证书：

```bash
# 安装 certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo crontab -e
# 添加：0 12 * * * /usr/bin/certbot renew --quiet
```

### 强制 HTTPS 重定向

在 Nginx 配置中添加：

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL 配置
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # 强制 HTTPS
    if ($scheme != "https") {
        return 301 https://$server_name$request_uri;
    }
}
```

## 📊 性能优化

### 1. 启用 Gzip 压缩

```nginx
# Nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### 2. 启用 HTTP/2

```nginx
listen 443 ssl http2;
```

### 3. 配置缓存策略

```nginx
# 静态资源长期缓存
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML 文件不缓存
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

## 🔍 监控和日志

### 1. 访问日志

```nginx
# Nginx 访问日志
access_log /var/log/nginx/nova-admin.access.log;
error_log /var/log/nginx/nova-admin.error.log;
```

### 2. 性能监控

集成 Google Analytics 或其他监控工具：

```typescript
// 在 main.ts 中添加
if (import.meta.env.PROD && import.meta.env.VITE_ENABLE_ANALYTICS) {
  // 初始化分析工具
}
```

## 🚨 安全配置

### 1. 安全头

```nginx
# 添加安全头
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

### 2. 隐藏服务器信息

```nginx
# 隐藏 Nginx 版本
server_tokens off;
```

## 📝 部署检查清单

- [ ] 项目构建成功
- [ ] 环境变量配置正确
- [ ] API 地址配置正确
- [ ] 域名解析配置
- [ ] SSL 证书配置
- [ ] 反向代理配置
- [ ] 缓存策略配置
- [ ] 安全头配置
- [ ] 监控工具集成
- [ ] 错误页面配置
- [ ] 性能测试通过

## 🆘 常见问题

### 1. 路由刷新 404

确保服务器配置了正确的 fallback 规则，将所有路由都指向 `index.html`。

### 2. 静态资源加载失败

检查构建后的文件路径是否正确，确保服务器配置了正确的静态文件服务。

### 3. API 请求失败

检查 CORS 配置和 API 地址是否正确。

---

**部署完成后，访问您的域名即可看到 Nova Admin 系统！**
