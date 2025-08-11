# Nova Admin - 鉴权系统

这是一个基于 Vue3 + TypeScript + Vite + Pinia + Vue Router 的管理系统，包含完整的用户鉴权功能。

## 功能特性

- 🔐 用户登录/登出
- 🛡️ 路由守卫和权限控制
- 📱 响应式设计
- 🎨 现代化UI界面
- 💾 本地状态持久化
- 🌐 API服务集成
- 🛠️ 通用工具函数
- ⚙️ 环境配置管理
- 📊 仪表板展示
- 🔍 鉴权功能测试

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

## 鉴权系统说明

### 1. 路由鉴权

系统会自动检查路由是否需要鉴权：

- **需要鉴权的路由**：用户必须登录才能访问
- **公开路由**：无需登录即可访问（如登录页面）

### 2. 路由配置

在路由配置中，可以通过 `meta.requiresAuth` 来控制路由是否需要鉴权：

```typescript
{
  path: '/dashboard',
  name: 'Dashboard',
  component: Dashboard,
  meta: {
    requiresAuth: true, // 需要鉴权
    title: '仪表板'
  }
}
```

### 3. 用户状态管理

使用 Pinia 管理用户状态，包括：

- 用户登录状态
- 用户信息
- Token 管理
- 登录/登出操作

### 4. 登录流程

1. 用户访问需要鉴权的页面
2. 系统检查用户登录状态
3. 如果未登录，自动跳转到登录页面
4. 用户输入用户名密码登录
5. 登录成功后跳转回原页面

### 5. 演示账号

- 用户名：`admin`
- 密码：`admin`

## 项目结构

```
web-admin/
├── stores/          # 状态管理
│   └── user.ts     # 用户状态
├── utils/           # 工具函数
│   ├── auth.ts     # 鉴权工具
│   ├── api.ts      # API服务
│   └── common.ts   # 通用工具
├── src/
│   └── config/     # 配置文件
│       └── index.ts
├── views/           # 页面组件
│   ├── Login.vue   # 登录页面
│   ├── Home.vue    # 主页面
│   ├── Dashboard.vue # 仪表板
│   ├── Test.vue    # 鉴权测试
│   └── NotFound.vue # 404页面
├── components/      # 公共组件
│   └── Navigation.vue # 导航组件
├── router/          # 路由配置
│   ├── index.ts    # 路由主文件
│   └── guard.ts    # 路由守卫
├── main.ts         # 应用入口
├── DEMO.md         # 演示说明
└── README.md       # 项目说明
```

## 自定义配置

### 修改公开路由

在 `router/guard.ts` 中修改 `PUBLIC_ROUTES` 数组：

```typescript
const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
  '/public-page'
]
```

### 添加新的鉴权路由

在 `router/index.ts` 中添加新路由：

```typescript
{
  path: '/admin',
  name: 'Admin',
  component: Admin,
  meta: {
    requiresAuth: true,
    title: '管理页面'
  }
}
```

### 集成真实API

修改 `utils/auth.ts` 中的登录和登出函数，替换为真实的API调用。

### 配置API服务

在 `utils/api.ts` 中配置真实的API地址和请求拦截器：

```typescript
// 修改 baseURL
baseURL: 'https://your-api-domain.com/api'

// 配置请求/响应拦截器
api.interceptors.request.use(...)
api.interceptors.response.use(...)
```

### 使用通用工具

在组件中使用 `utils/common.ts` 中的工具函数：

```typescript
import { formatDate, showMessage, debounce } from '@/utils/common'

// 格式化日期
const formattedDate = formatDate(new Date(), 'YYYY年MM月DD日')

// 显示消息
showMessage('操作成功！', 'success')

// 防抖处理
const handleSearch = debounce(() => {
  // 搜索逻辑
}, 300)
```

## 技术栈

- **前端框架**: Vue 3
- **构建工具**: Vite
- **状态管理**: Pinia
- **路由管理**: Vue Router 4
- **开发语言**: TypeScript
- **样式**: CSS3 + 响应式设计
- **HTTP客户端**: Axios
- **工具库**: 自定义工具函数集合

## 注意事项

1. 当前使用 localStorage 存储用户信息，生产环境建议使用更安全的存储方式
2. 登录接口为模拟接口，需要替换为真实的API
3. Token 过期处理需要根据实际业务需求实现
4. 建议添加请求拦截器，自动在请求头中添加 Token

## 开发建议

1. 使用 TypeScript 严格模式
2. 遵循 Vue 3 Composition API 最佳实践
3. 组件化开发，提高代码复用性
4. 添加适当的错误处理和用户提示
5. 实现完整的加载状态管理
