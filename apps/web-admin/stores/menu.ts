import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user'

export interface MenuItem {
  id: string
  title: string
  path: string
  icon?: string
  children?: MenuItem[]
  permission?: string
  meta?: {
    requiresAuth: boolean
    title: string
  }
}

export const useMenuStore = defineStore('menu', () => {
  const userStore = useUserStore()

  // 所有可用菜单项
  const allMenus: MenuItem[] = [
    {
      id: 'dashboard',
      title: '仪表盘',
      path: '/dashboard',
      icon: 'Dashboard',
      permission: 'dashboard',
      meta: {
        requiresAuth: true,
        title: '仪表盘'
      }
    },
    {
      id: 'system',
      title: '系统管理',
      path: '/system',
      icon: 'Setting',
      permission: 'system',
      meta: {
        requiresAuth: true,
        title: '系统管理'
      },
      children: [
        {
          id: 'user',
          title: '用户管理',
          path: '/system/user',
          permission: 'users',
          meta: {
            requiresAuth: true,
            title: '用户管理'
          }
        },
        {
          id: 'role',
          title: '角色管理',
          path: '/system/role',
          permission: 'roles',
          meta: {
            requiresAuth: true,
            title: '角色管理'
          }
        },
        {
          id: 'menu',
          title: '菜单管理',
          path: '/system/menu',
          permission: 'menus',
          meta: {
            requiresAuth: true,
            title: '菜单管理'
          }
        }
      ]
    },
    {
      id: 'content',
      title: '内容管理',
      path: '/content',
      icon: 'Document',
      permission: 'content',
      meta: {
        requiresAuth: true,
        title: '内容管理'
      },
      children: [
        {
          id: 'article',
          title: '文章管理',
          path: '/content/article',
          permission: 'articles',
          meta: {
            requiresAuth: true,
            title: '文章管理'
          }
        },
        {
          id: 'category',
          title: '分类管理',
          path: '/content/category',
          permission: 'categories',
          meta: {
            requiresAuth: true,
            title: '分类管理'
          }
        }
      ]
    },
    {
      id: 'monitor',
      title: '系统监控',
      path: '/monitor',
      icon: 'Monitor',
      permission: 'monitor',
      meta: {
        requiresAuth: true,
        title: '系统监控'
      },
      children: [
        {
          id: 'online',
          title: '在线用户',
          path: '/monitor/online',
          permission: 'online_users',
          meta: {
            requiresAuth: true,
            title: '在线用户'
          }
        },
        {
          id: 'log',
          title: '操作日志',
          path: '/monitor/log',
          permission: 'operation_logs',
          meta: {
            requiresAuth: true,
            title: '操作日志'
          }
        }
      ]
    }
  ]

  // 根据用户权限过滤菜单
  const filteredMenus = computed(() => {
    if (!userStore.userInfo?.permissions) {
      return []
    }

    const userPermissions = userStore.userInfo.permissions

    const filterMenu = (menus: MenuItem[]): MenuItem[] => {
      return menus.filter((menu) => {
        // 检查菜单权限
        if (menu.permission && !userPermissions.includes(menu.permission)) {
          return false
        }

        // 递归过滤子菜单
        if (menu.children) {
          const filteredChildren = filterMenu(menu.children)
          if (filteredChildren.length === 0) {
            return false
          }
          menu.children = filteredChildren
        }

        return true
      })
    }

    return filterMenu([...allMenus])
  })

  // 获取扁平化的菜单列表（用于面包屑导航等）
  const flatMenus = computed(() => {
    const flatten = (menus: MenuItem[]): MenuItem[] => {
      const result: MenuItem[] = []
      menus.forEach((menu) => {
        result.push(menu)
        if (menu.children) {
          result.push(...flatten(menu.children))
        }
      })
      return result
    }
    return flatten(filteredMenus.value)
  })

  // 根据路径查找菜单项
  const findMenuByPath = (path: string): MenuItem | undefined => {
    return flatMenus.value.find((menu) => menu.path === path)
  }

  // 获取面包屑导航
  const getBreadcrumbs = (path: string): MenuItem[] => {
    const breadcrumbs: MenuItem[] = []
    const findBreadcrumbs = (
      menus: MenuItem[],
      targetPath: string
    ): boolean => {
      for (const menu of menus) {
        if (menu.path === targetPath) {
          breadcrumbs.push(menu)
          return true
        }
        if (menu.children) {
          if (findBreadcrumbs(menu.children, targetPath)) {
            breadcrumbs.unshift(menu)
            return true
          }
        }
      }
      return false
    }

    findBreadcrumbs(filteredMenus.value, path)
    return breadcrumbs
  }

  return {
    allMenus,
    filteredMenus,
    flatMenus,
    findMenuByPath,
    getBreadcrumbs
  }
})
