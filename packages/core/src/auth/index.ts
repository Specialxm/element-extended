import { ref, computed } from 'vue'
import type { UserInfo, LoginForm, AuthResponse } from '../types'

export class AuthManager {
  private token = ref<string | null>(null)
  private userInfo = ref<UserInfo | null>(null)
  private loading = ref(false)

  // 计算属性
  get isLoggedIn() {
    return computed(() => !!this.token.value && !!this.userInfo.value)
  }

  get currentUser() {
    return computed(() => this.userInfo.value)
  }

  get currentToken() {
    return computed(() => this.token.value)
  }

  get isLoading() {
    return computed(() => this.loading.value)
  }

  // 初始化认证状态
  async initAuth(): Promise<void> {
    try {
      const storedToken = localStorage.getItem('nova_admin_token')
      const storedUserInfo = this.getUserInfoFromStorage()

      if (storedToken && storedUserInfo) {
        this.token.value = storedToken
        this.userInfo.value = storedUserInfo

        // 验证 token 有效性
        await this.validateToken(storedToken)
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error)
      this.clearAuth()
    }
  }

  // 登录
  async login(
    loginForm: LoginForm
  ): Promise<{ success: boolean; error?: string }> {
    try {
      this.loading.value = true

      // 这里应该调用实际的登录 API
      const response = await this.loginAPI(loginForm)

      this.token.value = response.token
      this.userInfo.value = response.userInfo

      // 保存到本地存储
      this.saveTokenToStorage(response.token)
      this.saveUserInfoToStorage(response.userInfo)

      return { success: true }
    } catch (error) {
      console.error('Login failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : '登录失败'
      }
    } finally {
      this.loading.value = false
    }
  }

  // 登出
  async logout(): Promise<{ success: boolean; error?: string }> {
    try {
      this.loading.value = true

      // 调用登出 API
      await this.logoutAPI()

      this.clearAuth()
      return { success: true }
    } catch (error) {
      console.error('Logout failed:', error)
      // 即使登出失败，也要清除本地状态
      this.clearAuth()
      return {
        success: false,
        error: error instanceof Error ? error.message : '登出失败'
      }
    } finally {
      this.loading.value = false
    }
  }

  // 更新用户信息
  updateUserInfo(newUserInfo: Partial<UserInfo>): void {
    if (this.userInfo.value) {
      this.userInfo.value = { ...this.userInfo.value, ...newUserInfo }
      this.saveUserInfoToStorage(this.userInfo.value)
    }
  }

  // 检查权限
  hasPermission(permission: string): boolean {
    return this.userInfo.value?.permissions.includes(permission) ?? false
  }

  // 检查角色
  hasRole(role: string): boolean {
    return this.userInfo.value?.roles.includes(role) ?? false
  }

  // 私有方法
  private async loginAPI(loginForm: LoginForm): Promise<AuthResponse> {
    // 模拟 API 调用
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          loginForm.username === 'admin' &&
          loginForm.password === 'admin123456'
        ) {
          resolve({
            token: 'mock_token_' + Date.now(),
            userInfo: {
              id: '1',
              username: 'admin',
              email: 'admin@example.com',
              roles: ['admin'],
              permissions: ['*']
            }
          })
        } else {
          reject(new Error('用户名或密码错误'))
        }
      }, 1000)
    })
  }

  private async logoutAPI(): Promise<void> {
    // 模拟 API 调用
    return new Promise((resolve) => setTimeout(resolve, 500))
  }

  private async validateToken(token: string): Promise<boolean> {
    // 这里应该调用实际的 token 验证 API
    console.log(token)
    return true
  }

  private saveTokenToStorage(token: string): void {
    localStorage.setItem('nova_admin_token', token)
  }

  private saveUserInfoToStorage(userInfo: UserInfo): void {
    localStorage.setItem('nova_admin_user_info', JSON.stringify(userInfo))
  }

  private getUserInfoFromStorage(): UserInfo | null {
    const stored = localStorage.getItem('nova_admin_user_info')
    return stored ? JSON.parse(stored) : null
  }

  private clearAuth(): void {
    this.token.value = null
    this.userInfo.value = null
    localStorage.removeItem('nova_admin_token')
    localStorage.removeItem('nova_admin_user_info')
  }
}

// 导出单例实例
export const authManager = new AuthManager()
