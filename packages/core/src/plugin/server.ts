import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios'
import type { NovaApp } from '../app'

export interface ServerConfig {
  baseURL?: string
  timeout?: number
  withCredentials?: boolean
  headers?: Record<string, string>
}

export interface ServerPlugin {
  name: string
  install: (app: NovaApp) => void
}

export class ServerManager {
  private instance: AxiosInstance
  private config: ServerConfig

  constructor(config: ServerConfig = {}) {
    this.config = {
      baseURL: '/api',
      timeout: 20000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      ...config
    }

    this.instance = axios.create(this.config)
    this.setupInterceptors()
  }

  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 请求地址携带时间戳防止缓存
        if (config.url) {
          const separator = config.url.includes('?') ? '&' : '?'
          config.url += `${separator}_t=${Date.now()}`
        }

        // 从 localStorage 获取 token
        const token = localStorage.getItem('nova_admin_token')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.status === 200) {
          return Promise.resolve(response.data)
        } else {
          return Promise.reject(response)
        }
      },
      (error) => {
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.message = '错误请求'
              break
            case 401:
              error.message = '未授权，请重新登录'
              // 清除本地认证信息
              localStorage.removeItem('nova_admin_token')
              localStorage.removeItem('nova_admin_user_info')
              // 可以在这里触发重新登录
              break
            case 403:
              error.message = '拒绝访问'
              break
            case 404:
              error.message = '请求错误,未找到该资源'
              break
            case 405:
              error.message = '请求方法未允许'
              break
            case 408:
              error.message = '请求超时'
              break
            case 500:
              error.message = '服务器端出错'
              break
            case 501:
              error.message = '网络未实现'
              break
            case 502:
              error.message = '网络错误'
              break
            case 503:
              error.message = '服务不可用'
              break
            case 504:
              error.message = '网络超时'
              break
            case 505:
              error.message = 'http版本不支持该请求'
              break
            default:
              error.message = `未知错误${error.response.status}`
          }
        } else {
          error.message = '连接到服务器失败'
        }
        return Promise.reject(error)
      }
    )
  }

  // GET 请求
  async get<T = any>(url: string, params = {}): Promise<T> {
    try {
      const response = await this.instance.get(url, { params })
      return response
    } catch (error) {
      throw error
    }
  }

  // POST 请求
  async post<T = any>(url: string, data = {}): Promise<T> {
    try {
      const response = await this.instance.post(url, data)
      return response
    } catch (error) {
      throw error
    }
  }

  // PUT 请求
  async put<T = any>(url: string, data = {}): Promise<T> {
    try {
      const response = await this.instance.put(url, data)
      return response
    } catch (error) {
      throw error
    }
  }

  // DELETE 请求
  async delete<T = any>(url: string, params = {}): Promise<T> {
    try {
      const response = await this.instance.delete(url, { params })
      return response
    } catch (error) {
      throw error
    }
  }

  // PATCH 请求
  async patch<T = any>(url: string, data = {}): Promise<T> {
    try {
      const response = await this.instance.patch(url, data)
      return response
    } catch (error) {
      throw error
    }
  }

  // 自定义请求
  async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.request(config)
      return response
    } catch (error) {
      throw error
    }
  }

  // 获取 axios 实例
  getInstance(): AxiosInstance {
    return this.instance
  }

  // 更新配置
  updateConfig(config: Partial<ServerConfig>) {
    this.config = { ...this.config, ...config }
    // 重新创建实例
    this.instance = axios.create(this.config)
    this.setupInterceptors()
  }

  // 设置认证 token
  setAuthToken(token: string) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  // 清除认证 token
  clearAuthToken() {
    delete this.instance.defaults.headers.common.Authorization
  }
}

// 创建 Server Plugin
export const serverPlugin: ServerPlugin = {
  name: 'server',
  install(app: NovaApp) {
    const serverManager = new ServerManager({
      baseURL: app.config?.api?.baseURL || '/api',
      timeout: app.config?.api?.timeout || 20000
    })

    // 将 serverManager 添加到 app 实例
    app.server = serverManager

    // 提供全局访问
    app.provide('server', serverManager)
  }
}

// 导出默认实例
export const serverManager = new ServerManager()
