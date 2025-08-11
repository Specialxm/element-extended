# Nova Admin 鉴权系统演示

## 🚀 快速开始

### 1. 启动开发服务器

```bash
# 在项目根目录
pnpm dev

# 选择 @nova/admin 应用
```

### 2. 访问应用

打开浏览器访问：`http://localhost:5173`

## 🔐 鉴权流程演示

### 首次访问

1. 访问首页 `/` 时，系统会自动检查登录状态
2. 由于未登录，会自动跳转到登录页面 `/login`
3. 在登录页面输入演示账号：
   - 用户名：`admin`
   - 密码：`admin`

### 登录成功

1. 登录成功后会自动跳转回首页
2. 现在可以访问所有需要鉴权的页面
3. 顶部导航栏会显示用户名和登出按钮

### 页面导航

- **首页** (`/`) - 系统概览和功能卡片
- **鉴权测试** (`/test`) - 测试鉴权功能，显示用户信息
- **仪表板** (`/dashboard`) - 数据统计和图表展示
- **登录页面** (`/login`) - 用户登录

### 登出测试

1. 点击导航栏的"登出"按钮
2. 系统会清除用户状态和本地存储
3. 自动跳转到登录页面
4. 再次访问需要鉴权的页面会被拦截

## 🛡️ 鉴权机制详解

### 路由守卫

- 系统使用 Vue Router 的 `beforeEach` 钩子
- 自动检查每个路由的 `meta.requiresAuth` 属性
- 未登录用户访问受保护页面时自动跳转登录

### 状态管理

- 使用 Pinia 管理用户状态
- 本地存储 Token 和用户信息
- 支持页面刷新后状态恢复

### 公开路由

- `/login` - 登录页面
- `/register` - 注册页面（可扩展）
- `/forgot-password` - 忘记密码（可扩展）
- 其他路由默认需要鉴权

## 🎯 测试场景

### 场景1：未登录访问受保护页面

1. 清除浏览器本地存储
2. 直接访问 `/test` 或 `/dashboard`
3. 预期结果：自动跳转到登录页面

### 场景2：已登录访问登录页面

1. 先登录系统
2. 手动访问 `/login`
3. 预期结果：自动跳转到首页

### 场景3：Token 过期处理

1. 手动清除 localStorage 中的 token
2. 刷新页面
3. 预期结果：自动跳转到登录页面

### 场景4：路由重定向

1. 未登录状态下访问 `/dashboard`
2. 登录成功后
3. 预期结果：自动跳转到 `/dashboard`

## 🔧 自定义配置

### 添加新的受保护路由

```typescript
// 在 router/index.ts 中添加
{
  path: '/admin',
  name: 'Admin',
  component: () => import('../views/Admin.vue'),
  meta: {
    requiresAuth: true,
    title: '管理页面'
  }
}
```

### 添加新的公开路由

```typescript
// 在 router/guard.ts 中修改
const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
  '/public-page' // 新增
]
```

### 修改鉴权逻辑

```typescript
// 在 router/guard.ts 中自定义
export const requiresAuth = (route: RouteLocationNormalized): boolean => {
  // 添加自定义逻辑
  if (route.path.startsWith('/public')) {
    return false
  }

  // 原有逻辑
  if (route.meta.requiresAuth !== undefined) {
    return route.meta.requiresAuth as boolean
  }

  return !PUBLIC_ROUTES.includes(route.path)
}
```

## 📱 响应式设计

- 支持桌面端和移动端
- 导航栏在小屏幕上自动折叠
- 卡片布局自适应屏幕尺寸
- 触摸友好的按钮和交互

## 🎨 UI 特性

- 现代化渐变背景
- 卡片式布局设计
- 平滑的动画过渡
- 一致的颜色主题
- 清晰的视觉层次

## 🚨 注意事项

1. **演示环境**：当前使用模拟登录接口，生产环境需要替换为真实API
2. **存储安全**：使用 localStorage 存储敏感信息，生产环境建议使用更安全的方式
3. **Token 管理**：需要实现 Token 过期处理和自动刷新
4. **错误处理**：建议添加网络错误和服务器错误的处理逻辑

## 🔮 扩展建议

### 权限系统

- 基于角色的访问控制 (RBAC)
- 细粒度的页面权限
- 动态菜单生成

### 安全增强

- JWT Token 刷新机制
- 请求拦截器自动添加 Token
- 敏感操作二次验证

### 用户体验

- 记住登录状态
- 自动登录
- 多标签页状态同步

## 📞 技术支持

如果遇到问题，请检查：

1. 浏览器控制台是否有错误信息
2. 网络请求是否正常
3. 本地存储是否被清除
4. 路由配置是否正确

---

**演示账号**：admin / admin  
**开发环境**：Vue 3 + TypeScript + Vite + Pinia + Vue Router  
**构建命令**：`pnpm build`
