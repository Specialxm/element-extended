import type { Router, RouteLocationNormalized } from 'vue-router'
import { authManager } from '../auth'
import { menuManager } from '../menu'

export class RouterManager {
  private router: Router | null = null

  // 设置路由器实例
  setRouter(router: Router): void {
    this.router = router
  }

  // 设置路由守卫
  setupRouteGuard(): void {
    if (!this.router) {
      console.error('Router not set')
      return
    }

    this.router.beforeEach(async (to, from, next) => {
      // 检查是否需要认证
      if (to.meta.requiresAuth !== false) {
        if (!authManager.isLoggedIn.value) {
          // 未登录，重定向到登录页
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
          return
        }

        // 检查权限
        if (!this.checkRoutePermission(to)) {
          next('/403')
          return
        }
      }

      // 设置页面标题
      if (to.meta.title) {
        document.title = `${to.meta.title} - Nova Admin`
      }

      // 设置活动菜单
      const menu = menuManager.findMenuByPath(to.path)
      if (menu) {
        menuManager.setActiveMenu(menu.id)
      }

      next()
    })

    this.router.afterEach((to) => {
      // 路由切换后的处理
      console.log('Route changed to:', to.path)
    })
  }

  // 检查路由权限
  private checkRoutePermission(route: RouteLocationNormalized): boolean {
    const meta = route.meta as any

    // 检查角色权限
    if (meta.roles && meta.roles.length > 0) {
      const hasRole = meta.roles.some((role: string) =>
        authManager.hasRole(role)
      )
      if (!hasRole) return false
    }

    // 检查操作权限
    if (meta.permissions && meta.permissions.length > 0) {
      const hasPermission = meta.permissions.some((permission: string) =>
        authManager.hasPermission(permission)
      )
      if (!hasPermission) return false
    }

    return true
  }

  // 动态添加路由
  addRoutes(routes: any[]): void {
    if (!this.router) {
      console.error('Router not set')
      return
    }

    routes.forEach((route) => {
      this.router?.addRoute(route)
    })
  }

  // 获取当前路由信息
  getCurrentRoute(): RouteLocationNormalized | null {
    if (!this.router) return null
    return this.router.currentRoute.value
  }
}

// 导出单例实例
export const routerManager = new RouterManager()
