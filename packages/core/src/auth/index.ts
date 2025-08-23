import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import type { UserInfo, LoginForm, AuthResponse } from '../types'
import { novaApp } from '../app'

export class AuthManager {
  private token = useStorage<string | null>('nova_admin_token', null)
  private userInfo = useStorage<UserInfo | null>('nova_admin_user_info', null)
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
      if (this.token.value && this.userInfo.value) {
        // 验证 token 有效性
        const isValid = await this.validateToken(this.token.value)
        if (!isValid) {
          console.warn('Stored token is invalid, clearing auth')
          this.clearAuth()
        }
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

      // 使用 @app/ 下的 server 进行登录
      const response = await this.loginAPI(loginForm)

      this.token.value = response.token
      this.userInfo.value = response.userInfo

      // 设置 server 的认证 token
      novaApp.getServerManager().setAuthToken(response.token)

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
    }
  }

  // 刷新用户信息
  async refreshUserInfo(): Promise<boolean> {
    try {
      if (!this.token.value) {
        return false
      }

      const response = await novaApp.getServerManager().get('/auth/user')

      if (response.success) {
        this.userInfo.value = response.data
        return true
      }

      return false
    } catch (error) {
      console.error('Refresh user info error:', error)
      return false
    }
  }

  // 检查权限
  hasPermission(permission: string): boolean {
    if (!this.userInfo.value?.permissions) {
      return false
    }

    // 支持通配符权限
    if (this.userInfo.value.permissions.includes('*')) {
      return true
    }

    return this.userInfo.value.permissions.includes(permission)
  }

  // 检查角色
  hasRole(role: string): boolean {
    if (!this.userInfo.value?.roles) {
      return false
    }

    return this.userInfo.value.roles.includes(role)
  }

  // 检查是否有任意一个权限
  hasAnyPermission(permissions: string[]): boolean {
    if (!this.userInfo.value?.permissions) {
      return false
    }

    if (this.userInfo.value.permissions.includes('*')) {
      return true
    }

    return permissions.some((permission) =>
      this.userInfo.value!.permissions.includes(permission)
    )
  }

  // 检查是否有所有权限
  hasAllPermissions(permissions: string[]): boolean {
    if (!this.userInfo.value?.permissions) {
      return false
    }

    if (this.userInfo.value.permissions.includes('*')) {
      return true
    }

    return permissions.every((permission) =>
      this.userInfo.value!.permissions.includes(permission)
    )
  }

  // 检查网络连接状态
  async checkNetworkStatus(): Promise<boolean> {
    try {
      const response = await novaApp.getServerManager().get('/hello')
      return response.success
    } catch (error) {
      console.warn('Network check failed:', error)
      return false
    }
  }

  // 获取认证状态摘要
  getAuthSummary() {
    return {
      isLoggedIn: this.isLoggedIn.value,
      currentUser: this.currentUser.value,
      hasToken: !!this.currentToken.value,
      isLoading: this.isLoading.value
    }
  }

  // 私有方法
  private async loginAPI(loginForm: LoginForm): Promise<AuthResponse> {
    try {
      // 使用 @app/ 下的 server 进行登录
      const response = await novaApp
        .getServerManager()
        .post('/auth/login', loginForm)

      if (response.success) {
        return {
          token: response.data.token,
          userInfo: response.data.userInfo
        }
      } else {
        throw new Error(response.message || '登录失败')
      }
    } catch (error) {
      console.error('Login API error:', error)
      throw error
    }
  }

  private async logoutAPI(): Promise<void> {
    try {
      // 使用 @app/ 下的 server 进行登出
      await novaApp.getServerManager().post('/auth/logout')
    } catch (error) {
      console.error('Logout API error:', error)
      // 登出失败不影响本地状态清除
    }
  }

  private async validateToken(token: string): Promise<boolean> {
    try {
      // 使用 @app/ 下的 server 验证 token
      const response = await novaApp.getServerManager().get('/auth/user')

      if (response.success) {
        // 更新用户信息
        this.userInfo.value = response.data
        return true
      }

      return false
    } catch (error) {
      console.error('Token validation error:', error)
      return false
    }
  }

  private clearAuth(): void {
    this.token.value = null
    this.userInfo.value = null
    // 清除 server 的认证 token
    novaApp.getServerManager().clearAuthToken()
  }
}

// 导出单例实例
export const authManager = new AuthManager()
