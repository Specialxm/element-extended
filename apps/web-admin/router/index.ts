import { createRouter, createWebHistory } from 'vue-router'
import { setupRouteGuard } from './guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      meta: {
        requiresAuth: true, // 需要鉴权
        title: '首页'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: {
        requiresAuth: false, // 不需要鉴权
        title: '登录'
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('../views/Test.vue'),
      meta: {
        requiresAuth: true, // 需要鉴权
        title: '鉴权测试'
      }
    },
    // 可以添加更多需要鉴权的路由
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'), // 懒加载
      meta: {
        requiresAuth: true,
        title: '仪表板'
      }
    },
    // 404 页面
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
      meta: {
        requiresAuth: false,
        title: '页面未找到'
      }
    }
  ]
})

// 设置路由守卫
setupRouteGuard(router)

export default router
