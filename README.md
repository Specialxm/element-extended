# Nova Admin - 后台管理系统

一个基于 Vue 3 + TypeScript + Element Plus 的现代化后台管理系统。

## 🚀 特性

- **现代化技术栈**: Vue 3 + TypeScript + Vite + Element Plus
- **工程化架构**: 模块化设计，支持 monorepo 管理
- **BEM 命名规范**: 使用 useNamespace 工具实现一致的样式命名
- **主题系统**: 基于 Element Plus 全局变量的主题系统
- **权限管理**: 完整的用户认证、角色权限、菜单权限体系
- **路由鉴权**: 自动路由守卫和权限验证
- **安全防护**: XSS 防护、SQL 注入防护等安全措施
- **插件系统**: 可扩展的插件架构
- **生命周期钩子**: 完整的应用生命周期管理

## 🏗️ 项目结构

```
nova-admin/
├── @nova/                    # 工程化配置包
│   ├── lint/                # ESLint 和 Prettier 配置
│   ├── tsconfig/            # TypeScript 配置
│   └── utils/               # 构建工具
├── apps/                    # 应用包
│   ├── web-admin/          # 主应用 - 后台管理系统
│   └── mock/               # Mock 服务
├── packages/                # 功能包
│   ├── core/               # 核心功能包
│   │   ├── auth/           # 认证管理
│   │   ├── menu/           # 菜单管理
│   │   ├── router/         # 路由管理
│   │   ├── security/       # 安全管理
│   │   └── plugin/         # 插件系统
│   ├── shared/             # 共享工具包
│   ├── ui/                 # UI 组件包
│   └── utils/              # 工具包 (useNamespace 等)
└── docs/                   # 文档
```

## 📦 核心包说明

### @nova/core

核心功能包，包含：

- **认证管理**: 用户登录、登出、权限验证
- **菜单管理**: 动态菜单、权限过滤
- **路由管理**: 路由守卫、权限检查
- **安全管理**: XSS 防护、输入验证
- **插件系统**: 可扩展的插件架构

### @nova/utils

工具包，包含：

- **useNamespace**: BEM 命名规范工具
- **CSS 变量管理**: 主题变量工具
- **其他工具函数**: 常用工具函数

## 🎨 设计规范

### BEM 命名规范

使用 `useNamespace` 工具实现一致的 BEM 命名：

```typescript
import { useNamespace } from '@nova/utils'

const ns = useNamespace('component-name')

// 使用
ns.b() // 'nova-component-name'
ns.e('item') // 'nova-component-name__item'
ns.m('active') // 'nova-component-name--active'
ns.be('item', 'active') // 'nova-component-name__item--active'
```

### 主题系统

基于 Element Plus 全局变量的主题系统：

```scss
:root {
  // Element Plus 变量
  --el-color-primary: #409eff;
  --el-color-success: #67c23a;

  // Nova Admin 自定义变量
  --nova-sidebar-width: 200px;
  --nova-header-height: 60px;
}
```

## 🚀 快速开始

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

## 📱 功能模块

### 已实现模块

- **仪表盘**: 数据统计、图表展示、快捷操作
- **用户管理**: 用户 CRUD、角色分配、状态管理
- **系统管理**: 用户、角色、菜单管理
- **内容管理**: 文章、分类管理
- **系统监控**: 在线用户、操作日志

### 待开发模块

- 更多业务模块
- 高级图表组件
- 文件管理
- 系统配置

## 🔧 技术栈

- **前端框架**: Vue 3
- **开发语言**: TypeScript
- **构建工具**: Vite
- **UI 组件库**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **样式**: SCSS + CSS 变量
- **包管理**: pnpm + monorepo

## 📚 开发指南

### 添加新页面

1. 在 `apps/web-admin/views/` 下创建页面组件
2. 在 `apps/web-admin/router/index.ts` 中添加路由
3. 在 `packages/core/src/menu/index.ts` 中添加菜单项

### 添加新功能包

1. 在 `packages/` 下创建新包
2. 配置 `package.json` 和 `tsconfig.json`
3. 在 `pnpm-workspace.yaml` 中添加包路径

### 使用 useNamespace

```typescript
import { useNamespace } from '@nova/utils'

const ns = useNamespace('my-component')

// 在模板中使用
<div :class="ns.b()">
  <div :class="ns.e('header')">
    <span :class="ns.m('title')">标题</span>
  </div>
</div>
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License

## 📞 联系方式

如有问题或建议，请提交 Issue 或联系开发团队。
