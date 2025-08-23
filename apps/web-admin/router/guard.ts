import type { Router, RouteLocationNormalized } from 'vue-router'
import { isLoggedIn } from '../utils/auth'

// 不需要鉴权的路由路径
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password']

// 检查路由是否需要鉴权
export const requiresAuth = (route: RouteLocationNormalized): boolean => {
  // 如果路由有 meta.requiresAuth 配置，优先使用
  if (route.meta.requiresAuth !== undefined) {
    return route.meta.requiresAuth as boolean
  }

  // 否则检查是否在公开路由列表中
  return !PUBLIC_ROUTES.includes(route.path)
}

// 路由守卫
export const setupRouteGuard = (router: Router): void => {
  router.beforeEach(async (to, from, next) => {
    // 如果用户已登录但访问登录页面，重定向到首页
    if (to.path === '/login' && isLoggedIn()) {
      next({ path: '/' })
      return
    }

    // 检查路由是否需要鉴权
    if (requiresAuth(to)) {
      // 需要鉴权，检查用户是否已登录
      if (isLoggedIn()) {
        // 用户已登录，允许访问
        next()
      } else {
        // 用户未登录，跳转到登录页面
        next({
          path: '/login',
          query: { redirect: to.fullPath } // 保存原始路径，登录后可以跳转回去
        })
      }
    } else {
      // 不需要鉴权，直接允许访问
      next()
    }
  })
}
