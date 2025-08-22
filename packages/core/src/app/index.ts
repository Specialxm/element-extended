import type { App as VueApp } from 'vue'
import type { AppOptions, LifecycleHooks } from '../types'
import { authManager } from '../auth'
import { menuManager } from '../menu'
import { routerManager } from '../router'
import { securityManager } from '../security'
import { pluginManager } from '../plugin'

export class NovaApp {
  private app: VueApp | null = null
  private options: AppOptions = {}
  private lifecycleHooks: LifecycleHooks = {}
  private isInitialized = false

  // 设置应用实例
  setApp(app: VueApp): void {
    this.app = app
    pluginManager.setApp(app)
  }

  // 设置选项
  setOptions(options: AppOptions): void {
    this.options = { ...this.options, ...options }
  }

  // 设置生命周期钩子
  setLifecycleHooks(hooks: LifecycleHooks): void {
    this.lifecycleHooks = { ...this.lifecycleHooks, ...hooks }
  }

  // 初始化应用
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.warn('App already initialized')
      return
    }

    try {
      // 执行 beforeCreate 钩子
      if (this.lifecycleHooks.beforeCreate) {
        await this.lifecycleHooks.beforeCreate()
      }

      // 初始化认证
      await authManager.initAuth()

      // 初始化菜单
      await menuManager.initMenus()

      // 设置路由守卫
      if (this.options.router) {
        routerManager.setRouter(this.options.router)
        routerManager.setupRouteGuard()
      }

      // 安装插件
      if (this.options.plugins) {
        pluginManager.registerAll(this.options.plugins)
        await pluginManager.installAll(this.options.config)
      }

      // 执行 created 钩子
      if (this.lifecycleHooks.created) {
        await this.lifecycleHooks.created()
      }

      this.isInitialized = true
      console.log('Nova App initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Nova App:', error)
      throw error
    }
  }

  // 挂载应用
  async mount(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    try {
      // 执行 beforeMount 钩子
      if (this.lifecycleHooks.beforeMount) {
        await this.lifecycleHooks.beforeMount()
      }

      // 执行 mounted 钩子
      if (this.lifecycleHooks.mounted) {
        await this.lifecycleHooks.mounted()
      }
    } catch (error) {
      console.error('Failed to mount Nova App:', error)
      throw error
    }
  }

  // 卸载应用
  async unmount(): Promise<void> {
    try {
      // 执行 beforeUnmount 钩子
      if (this.lifecycleHooks.beforeUnmount) {
        await this.lifecycleHooks.beforeUnmount()
      }

      // 执行 unmounted 钩子
      if (this.lifecycleHooks.unmounted) {
        await this.lifecycleHooks.unmounted()
      }

      this.isInitialized = false
    } catch (error) {
      console.error('Failed to unmount Nova App:', error)
      throw error
    }
  }

  // 获取管理器实例
  getApp() {
    return this.app
  }

  getAuthManager() {
    return authManager
  }

  getMenuManager() {
    return menuManager
  }

  getRouterManager() {
    return routerManager
  }

  getSecurityManager() {
    return securityManager
  }

  getPluginManager() {
    return pluginManager
  }

  // 检查是否已初始化
  get initialized() {
    return this.isInitialized
  }
}

// 导出单例实例
export const novaApp = new NovaApp()
