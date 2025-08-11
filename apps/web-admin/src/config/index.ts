// 应用配置
export const config = {
  // API 配置
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
    retryTimes: 3
  },

  // 应用信息
  app: {
    name: 'Nova Admin',
    version: '1.0.0',
    description: '基于 Vue3 的管理系统'
  },

  // 功能开关
  features: {
    mockAPI: true, // 是否使用模拟API
    analytics: false, // 是否启用分析
    debug: true, // 是否启用调试模式
    rememberLogin: true // 是否记住登录状态
  },

  // 路由配置
  router: {
    mode: 'history',
    scrollBehavior: 'smooth'
  },

  // 存储配置
  storage: {
    prefix: 'nova_admin_',
    expire: 7 * 24 * 60 * 60 * 1000 // 7天过期
  },

  // 主题配置
  theme: {
    primary: '#667eea',
    secondary: '#764ba2',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  }
}

// 开发环境配置
export const devConfig = {
  ...config,
  features: {
    ...config.features,
    mockAPI: true,
    debug: true
  }
}

// 生产环境配置
export const prodConfig = {
  ...config,
  features: {
    ...config.features,
    mockAPI: false,
    debug: false
  }
}

// 根据环境导出配置
export default import.meta.env.DEV ? devConfig : prodConfig
