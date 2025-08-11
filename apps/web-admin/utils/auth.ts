// 鉴权相关工具函数
export interface UserInfo {
  id: string
  username: string
  email?: string
  avatar?: string
}

export interface LoginForm {
  username: string
  password: string
}

// Token 存储的 key
const TOKEN_KEY = 'nova_admin_token'
const USER_INFO_KEY = 'nova_admin_user_info'

// 获取 token
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

// 设置 token
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

// 移除 token
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

// 获取用户信息
export const getUserInfo = (): UserInfo | null => {
  const userInfoStr = localStorage.getItem(USER_INFO_KEY)
  if (userInfoStr) {
    try {
      return JSON.parse(userInfoStr)
    } catch {
      return null
    }
  }
  return null
}

// 设置用户信息
export const setUserInfo = (userInfo: UserInfo): void => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
}

// 移除用户信息
export const removeUserInfo = (): void => {
  localStorage.removeItem(USER_INFO_KEY)
}

// 检查用户是否已登录
export const isLoggedIn = (): boolean => {
  return !!getToken() && !!getUserInfo()
}

// 清除所有认证信息
export const clearAuth = (): void => {
  removeToken()
  removeUserInfo()
}

// 模拟登录接口
export const login = async (
  loginForm: LoginForm
): Promise<{ token: string; userInfo: UserInfo }> => {
  // 这里应该调用真实的登录 API
  // 现在使用模拟数据
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUserInfo: UserInfo = {
        id: '1',
        username: loginForm.username,
        email: `${loginForm.username}@example.com`,
        avatar: 'https://via.placeholder.com/40'
      }
      const mockToken = `mock_token_${Date.now()}`

      resolve({
        token: mockToken,
        userInfo: mockUserInfo
      })
    }, 1000)
  })
}

// 模拟登出接口
export const logout = async (): Promise<void> => {
  // 这里应该调用真实的登出 API
  return new Promise((resolve) => {
    setTimeout(() => {
      clearAuth()
      resolve()
    }, 500)
  })
}
