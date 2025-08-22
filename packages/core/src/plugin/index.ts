import type { Plugin } from '../types'

export class PluginManager {
  private plugins: Plugin[] = []
  private app: any = null

  // 设置应用实例
  setApp(app: any): void {
    this.app = app
  }

  // 注册插件
  register(plugin: Plugin): void {
    if (this.plugins.find((p) => p.name === plugin.name)) {
      console.warn(`Plugin ${plugin.name} already registered`)
      return
    }
    this.plugins.push(plugin)
  }

  // 注册多个插件
  registerAll(plugins: Plugin[]): void {
    plugins.forEach((plugin) => this.register(plugin))
  }

  // 安装所有插件
  async installAll(options?: any): Promise<void> {
    if (!this.app) {
      console.error('App not set')
      return
    }

    for (const plugin of this.plugins) {
      try {
        await this.installPlugin(plugin, options)
      } catch (error) {
        console.error(`Failed to install plugin ${plugin.name}:`, error)
      }
    }
  }

  // 安装单个插件
  private async installPlugin(plugin: Plugin, options?: any): Promise<void> {
    if (typeof plugin.install === 'function') {
      await plugin.install(this.app, options)
      console.log(`Plugin ${plugin.name} installed successfully`)
    }
  }

  // 获取已注册的插件
  getRegisteredPlugins(): Plugin[] {
    return [...this.plugins]
  }

  // 检查插件是否已注册
  isRegistered(pluginName: string): boolean {
    return this.plugins.some((p) => p.name === pluginName)
  }

  // 卸载插件
  unregister(pluginName: string): void {
    const index = this.plugins.findIndex((p) => p.name === pluginName)
    if (index > -1) {
      this.plugins.splice(index, 1)
    }
  }

  // 清空所有插件
  clear(): void {
    this.plugins = []
  }
}

// 导出单例实例
export const pluginManager = new PluginManager()
