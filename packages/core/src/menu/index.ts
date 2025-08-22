import { ref, computed } from 'vue'
import type { MenuItem } from '../types'

export class MenuManager {
  private menus = ref<MenuItem[]>([])
  private activeMenu = ref<string>('')

  // 计算属性
  get allMenus() {
    return computed(() => this.menus.value)
  }

  get activeMenuId() {
    return computed(() => this.activeMenu.value)
  }

  // 初始化菜单
  async initMenus(): Promise<void> {
    try {
      // 这里应该从 API 获取菜单数据
      const menuData = await this.fetchMenus()
      this.menus.value = menuData
    } catch (error) {
      console.error('Failed to initialize menus:', error)
      // 使用默认菜单
      this.menus.value = this.getDefaultMenus()
    }
  }

  // 设置活动菜单
  setActiveMenu(menuId: string): void {
    this.activeMenu.value = menuId
  }

  // 根据路径查找菜单
  findMenuByPath(path: string): MenuItem | null {
    return this.findMenuRecursive(this.menus.value, path)
  }

  // 获取用户有权限的菜单
  getUserMenus(userPermissions: string[]): MenuItem[] {
    return this.filterMenusByPermissions(this.menus.value, userPermissions)
  }

  // 私有方法
  private async fetchMenus(): Promise<MenuItem[]> {
    // 模拟 API 调用
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getDefaultMenus())
      }, 500)
    })
  }

  private getDefaultMenus(): MenuItem[] {
    return [
      {
        id: 'dashboard',
        title: '仪表盘',
        path: '/dashboard',
        icon: 'Odometer',
        meta: {
          title: '仪表盘',
          icon: 'Odometer'
        }
      },
      {
        id: 'system',
        title: '系统管理',
        icon: 'Setting',
        meta: {
          title: '系统管理',
          icon: 'Setting'
        },
        children: [
          {
            id: 'user',
            title: '用户管理',
            path: '/system/user',
            icon: 'User',
            meta: {
              title: '用户管理',
              icon: 'User'
            }
          },
          {
            id: 'role',
            title: '角色管理',
            path: '/system/role',
            icon: 'UserFilled',
            meta: {
              title: '角色管理',
              icon: 'UserFilled'
            }
          },
          {
            id: 'menu',
            title: '菜单管理',
            path: '/system/menu',
            icon: 'Menu',
            meta: {
              title: '菜单管理',
              icon: 'Menu'
            }
          }
        ]
      },
      {
        id: 'content',
        title: '内容管理',
        icon: 'Document',
        meta: {
          title: '内容管理',
          icon: 'Document'
        },
        children: [
          {
            id: 'article',
            title: '文章管理',
            path: '/content/article',
            icon: 'Document',
            meta: {
              title: '文章管理',
              icon: 'Document'
            }
          },
          {
            id: 'category',
            title: '分类管理',
            path: '/content/category',
            icon: 'Folder',
            meta: {
              title: '分类管理',
              icon: 'Folder'
            }
          }
        ]
      },
      {
        id: 'monitor',
        title: '系统监控',
        icon: 'Monitor',
        meta: {
          title: '系统监控',
          icon: 'Monitor'
        },
        children: [
          {
            id: 'online',
            title: '在线用户',
            path: '/monitor/online',
            icon: 'User',
            meta: {
              title: '在线用户',
              icon: 'User'
            }
          },
          {
            id: 'log',
            title: '操作日志',
            path: '/monitor/log',
            icon: 'Document',
            meta: {
              title: '操作日志',
              icon: 'Document'
            }
          }
        ]
      }
    ]
  }

  private findMenuRecursive(menus: MenuItem[], path: string): MenuItem | null {
    for (const menu of menus) {
      if (menu.path === path) {
        return menu
      }
      if (menu.children) {
        const found = this.findMenuRecursive(menu.children, path)
        if (found) return found
      }
    }
    return null
  }

  private filterMenusByPermissions(
    menus: MenuItem[],
    permissions: string[]
  ): MenuItem[] {
    return menus
      .map((menu) => {
        if (menu.children) {
          const filteredChildren = this.filterMenusByPermissions(
            menu.children,
            permissions
          )
          if (filteredChildren.length > 0) {
            return { ...menu, children: filteredChildren }
          }
        }
        return menu
      })
      .filter((menu) => {
        // 如果有子菜单，至少保留一个
        if (menu.children && menu.children.length > 0) {
          return true
        }
        // 检查权限
        if (menu.meta?.permissions) {
          return menu.meta.permissions.some(
            (permission) =>
              permissions.includes(permission) || permissions.includes('*')
          )
        }
        return true
      })
  }
}

// 导出单例实例
export const menuManager = new MenuManager()
