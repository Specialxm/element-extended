// 鉴权相关工具函数
import { useStorage } from '@vueuse/core'

export interface UserInfo {
  id: string
  username: string
  email?: string
  avatar?: string
  role?: string
  permissions?: string[]
}

export interface LoginForm {
  username: string
  password: string
}

// Token 存储的 key
const TOKEN_KEY = 'nova_admin_token'
const USER_INFO_KEY = 'nova_admin_user_info'

// 使用 @vueuse 的 useStorage 进行响应式存储
export const useTokenStorage = () => useStorage<string | null>(TOKEN_KEY, null)
export const useUserInfoStorage = () =>
  useStorage<UserInfo | null>(USER_INFO_KEY, null)

// 获取 token
export const getToken = (): string | null => {
  return useTokenStorage().value
}

// 设置 token
export const setToken = (token: string): void => {
  useTokenStorage().value = token
}

// 移除 token
export const removeToken = (): void => {
  useTokenStorage().value = null
}

// 获取用户信息
export const getUserInfo = (): UserInfo | null => {
  return useUserInfoStorage().value
}

// 设置用户信息
export const setUserInfo = (userInfo: UserInfo): void => {
  useUserInfoStorage().value = userInfo
}

// 移除用户信息
export const removeUserInfo = (): void => {
  useUserInfoStorage().value = null
}

// 检查用户是否已登录
export const isLoggedIn = (): boolean => {
  const token = getToken()
  const userInfo = getUserInfo()
  const isLoggedIn = !!(token && userInfo)

  // 添加调试信息
  console.log('isLoggedIn check:', {
    token: !!token,
    userInfo: !!userInfo,
    result: isLoggedIn
  })

  return isLoggedIn
}

// 清除所有认证信息
export const clearAuth = (): void => {
  removeToken()
  removeUserInfo()
}
