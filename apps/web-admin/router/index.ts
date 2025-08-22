import { createRouter, createWebHistory } from 'vue-router'
import { setupRouteGuard } from './guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('../components/layout.vue'),
      redirect: '/dashboard',
      meta: {
        requiresAuth: true,
        title: '首页'
      },
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('../src/views/dashboard/index.vue'),
          meta: {
            requiresAuth: true,
            title: '仪表盘'
          }
        },
        {
          path: '/system',
          name: 'System',
          redirect: '/system/user',
          meta: {
            requiresAuth: true,
            title: '系统管理'
          },
          children: [
            {
              path: '/system/user',
              name: 'UserManagement',
              component: () => import('../src/views/system/user/index.vue'),
              meta: {
                requiresAuth: true,
                title: '用户管理'
              }
            },
            {
              path: '/system/role',
              name: 'RoleManagement',
              component: () => import('../src/views/system/role/index.vue'),
              meta: {
                requiresAuth: true,
                title: '角色管理'
              }
            },
            {
              path: '/system/menu',
              name: 'MenuManagement',
              component: () => import('../src/views/system/menu/index.vue'),
              meta: {
                requiresAuth: true,
                title: '菜单管理'
              }
            }
          ]
        },
        {
          path: '/content',
          name: 'Content',
          redirect: '/content/article',
          meta: {
            requiresAuth: true,
            title: '内容管理'
          },
          children: [
            {
              path: '/content/article',
              name: 'ArticleManagement',
              component: () => import('../src/views/content/article/index.vue'),
              meta: {
                requiresAuth: true,
                title: '文章管理'
              }
            },
            {
              path: '/content/category',
              name: 'CategoryManagement',
              component: () =>
                import('../src/views/content/category/index.vue'),
              meta: {
                requiresAuth: true,
                title: '分类管理'
              }
            }
          ]
        },
        {
          path: '/monitor',
          name: 'Monitor',
          redirect: '/monitor/online',
          meta: {
            requiresAuth: true,
            title: '系统监控'
          },
          children: [
            {
              path: '/monitor/online',
              name: 'OnlineUsers',
              component: () => import('../src/views/monitor/online/index.vue'),
              meta: {
                requiresAuth: true,
                title: '在线用户'
              }
            },
            {
              path: '/monitor/log',
              name: 'OperationLog',
              component: () => import('../src/views/monitor/log/index.vue'),
              meta: {
                requiresAuth: true,
                title: '操作日志'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../src/views/auth/login/index.vue'),
      meta: {
        requiresAuth: false,
        title: '登录'
      }
    },
    {
      path: '/403',
      name: 'Forbidden',
      component: () => import('../src/views/auth/forbidden/index.vue'),
      meta: {
        requiresAuth: false,
        title: '无权限访问'
      }
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('../src/views/auth/404/index.vue'),
      meta: {
        requiresAuth: false,
        title: '页面未找到'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

// 设置路由守卫
setupRouteGuard(router)

export default router
