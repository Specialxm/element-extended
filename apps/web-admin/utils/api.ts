import axios from 'axios'
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { getToken, clearAuth } from './auth'
import { useUserStore } from '../stores/user'

// 创建 axios 实例
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加 token 到请求头
    const token = getToken()
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
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    if (error.response) {
      const { status } = error.response

      switch (status) {
        case 401: {
          // 未授权，清除本地认证信息并跳转登录
          clearAuth()
          const userStore = useUserStore()
          userStore.$reset()
          window.location.href = '/login'
          break
        }

        case 403:
          // 禁止访问
          console.error(
            '访问被拒绝：',
            error.response.data?.message || '权限不足'
          )
          break

        case 404:
          // 资源不存在
          console.error(
            '资源不存在：',
            error.response.data?.message || '请求的资源不存在'
          )
          break

        case 500:
          // 服务器错误
          console.error(
            '服务器错误：',
            error.response.data?.message || '服务器内部错误'
          )
          break

        default:
          console.error(
            '请求失败：',
            error.response.data?.message || '未知错误'
          )
      }
    } else if (error.request) {
      // 网络错误
      console.error('网络错误：', error.message || '网络连接失败')
    } else {
      // 其他错误
      console.error('请求配置错误：', error.message || '请求配置有误')
    }

    return Promise.reject(error)
  }
)

// API 方法
export const authAPI = {
  // 用户登录
  login: (data: { username: string; password: string }) => {
    return api.post('/auth/login', data)
  },

  // 用户登出
  logout: () => {
    return api.post('/auth/logout')
  },

  // 获取用户信息
  getUserInfo: () => {
    return api.get('/auth/user')
  },

  // 刷新 token
  refreshToken: () => {
    return api.post('/auth/refresh')
  }
}

// 仪表板相关 API
export const dashboardAPI = {
  // 获取统计数据
  getStats: () => api.get('/dashboard/stats'),

  // 获取最近活动
  getRecentActivity: (limit: number = 10) =>
    api.get(`/dashboard/activity?limit=${limit}`)
}

// 用户管理相关 API
export const userAPI = {
  // 获取用户列表
  getUserList: (params: any) => api.get('/users', { params }),

  // 创建用户
  createUser: (userData: any) => api.post('/users', userData),

  // 更新用户
  updateUser: (id: string, userData: any) => api.put(`/users/${id}`, userData),

  // 删除用户
  deleteUser: (id: string) => api.delete(`/users/${id}`),

  // 批量删除用户
  batchDeleteUsers: (userIds: string[]) =>
    api.post('/users/batch-delete', { userIds })
}

// 导出 axios 实例，用于自定义请求
export default api

// 使用示例：
/*
import { authAPI } from '@/utils/api'

// 登录
try {
  const response = await authAPI.login({
    username: 'admin',
    password: 'admin'
  })
  console.log('登录成功：', response.data)
} catch (error) {
  console.error('登录失败：', error)
}

// 获取用户信息
try {
  const response = await authAPI.getUserInfo()
  console.log('用户信息：', response.data)
} catch (error) {
  console.error('获取用户信息失败：', error)
}
*/
