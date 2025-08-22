// 核心应用
export { novaApp } from './app'
export type { AppOptions, LifecycleHooks } from './types'

// 认证管理
export { authManager } from './auth'
export type { UserInfo, LoginForm, AuthResponse } from './types'

// 菜单管理
export { menuManager } from './menu'
export type { MenuItem } from './types'

// 路由管理
export { routerManager } from './router'

// 安全管理
export { securityManager } from './security'

// 插件管理
export { pluginManager } from './plugin'
export type { Plugin } from './types'
