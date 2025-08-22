# Nova Admin

基于 Vue 3 + TypeScript + Element Plus 的管理后台系统。

## 功能特性

- 🚀 基于 Vue 3 + TypeScript + Vite
- 🎨 使用 Element Plus UI 组件库
- 📱 响应式设计，支持移动端
- 🔐 完整的权限管理系统
- 📊 数据可视化图表
- 🌐 国际化支持
- 📝 代码规范和格式化

## 技术栈

- **前端框架**: Vue 3
- **构建工具**: Vite
- **UI 组件库**: Element Plus
- **状态管理**: Pinia
- **路由管理**: Vue Router 4
- **HTTP 客户端**: Axios
- **CSS 预处理器**: Sass
- **代码规范**: ESLint + Prettier
- **类型检查**: TypeScript

## 开发环境要求

- Node.js >= 16.0.0
- pnpm >= 7.0.0

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
# 启动 mock 服务
cd apps/mock
pnpm start

# 新开一个终端，启动 web-admin
cd apps/web-admin
pnpm dev
```

### 3. 访问应用

- Web Admin: http://localhost:5173
- Mock API: http://localhost:3000

## 项目结构

```
apps/web-admin/
├── src/                    # 源代码
│   ├── components/         # 公共组件
│   ├── views/             # 页面组件
│   ├── router/            # 路由配置
│   ├── stores/            # 状态管理
│   ├── utils/             # 工具函数
│   └── styles/            # 样式文件
├── public/                # 静态资源
├── dist/                  # 构建输出
└── package.json           # 项目配置
```

## Mock 服务

项目使用 `@nova/mock` 作为模拟数据服务，提供以下 API 端点：

### 认证相关

- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/user` - 获取用户信息

### 用户管理

- `GET /api/users` - 获取用户列表（支持分页和搜索）

### 仪表板

- `GET /api/dashboard/stats` - 获取统计数据
- `GET /api/dashboard/activity` - 获取最近活动

## 开发说明

### 环境配置

项目已配置代理，开发时 API 请求会自动转发到 mock 服务：

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000/',
      changeOrigin: true
    }
  }
}
```

### 登录测试

使用以下账号进行测试：

- 用户名: `admin`
- 密码: `admin`

## 构建部署

### 开发环境构建

```bash
pnpm build:dev
```

### 生产环境构建

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 代码规范

### 代码格式化

```bash
pnpm format
```

### 代码检查

```bash
pnpm lint
```

### 类型检查

```bash
pnpm typecheck
```

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有问题或建议，请提交 Issue 或联系项目维护者。
