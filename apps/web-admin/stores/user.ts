import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authAPI } from '../utils/api'
import {
  setUserInfo as setUserInfoStorage,
  setToken as setTokenStorage,
  clearAuth
} from '../utils/auth'
import type { UserInfo, LoginForm } from '../utils/auth'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string | null>(null)
  const userInfo = ref<UserInfo | null>(null)
  const loading = ref(false)

  // 计算属性
  const isLoggedIn = computed(() => !!token.value && !!userInfo.value)
  const username = computed(() => userInfo.value?.username || '')

  // 初始化状态
  const initAuth = () => {
    // 从本地存储恢复状态
    const storedToken = localStorage.getItem('nova_admin_token')
    const storedUserInfo = localStorage.getItem('nova_admin_user_info')

    if (storedToken && storedUserInfo) {
      try {
        token.value = storedToken
        userInfo.value = JSON.parse(storedUserInfo)
      } catch {
        clearAuth()
      }
    }
  }

  // 登录
  const login = async (loginForm: LoginForm) => {
    try {
      loading.value = true
      const response = await authAPI.login(loginForm)

      if (response.data.success) {
        const { token: newToken, userInfo: newUserInfo } = response.data.data

        // 保存到 store
        token.value = newToken
        userInfo.value = newUserInfo

        // 保存到本地存储
        setTokenStorage(newToken)
        setUserInfoStorage(newUserInfo)

        return { success: true }
      } else {
        return {
          success: false,
          error: '登录失败'
        }
      }
    } catch (error: any) {
      console.error('Login failed:', error)
      return {
        success: false,
        error:
          error.response?.data?.statusMessage || error.message || '登录失败'
      }
    } finally {
      loading.value = false
    }
  }

  // 登出
  const logout = async () => {
    try {
      loading.value = true
      await authAPI.logout()

      // 清除 store 状态
      token.value = null
      userInfo.value = null

      // 清除本地存储
      clearAuth()

      return { success: true }
    } catch (error: any) {
      console.error('Logout failed:', error)
      // 即使登出失败，也要清除本地状态
      token.value = null
      userInfo.value = null
      clearAuth()
      return {
        success: false,
        error:
          error.response?.data?.statusMessage || error.message || '登出失败'
      }
    } finally {
      loading.value = false
    }
  }

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const response = await authAPI.getUserInfo()
      if (response.data.success) {
        userInfo.value = response.data.data
        setUserInfoStorage(response.data.data)
        return { success: true }
      }
      return { success: false }
    } catch (error: any) {
      console.error('Fetch user info failed:', error)
      return { success: false, error: error.message }
    }
  }

  // 更新用户信息
  const updateUserInfo = (newUserInfo: Partial<UserInfo>) => {
    if (userInfo.value) {
      userInfo.value = { ...userInfo.value, ...newUserInfo }
      setUserInfoStorage(userInfo.value)
    }
  }

  return {
    // 状态
    token,
    userInfo,
    loading,

    // 计算属性
    isLoggedIn,
    username,

    // 方法
    initAuth,
    login,
    logout,
    fetchUserInfo,
    updateUserInfo
  }
})
