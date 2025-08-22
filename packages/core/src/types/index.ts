export interface UserInfo {
  id: string
  username: string
  email: string
  avatar?: string
  roles: string[]
  permissions: string[]
}

export interface LoginForm {
  username: string
  password: string
  remember?: boolean
}

export interface AuthResponse {
  token: string
  userInfo: UserInfo
}

export interface MenuItem {
  id: string
  title: string
  path?: string
  icon?: string
  children?: MenuItem[]
  meta?: {
    title?: string
    icon?: string
    hidden?: boolean
    roles?: string[]
    permissions?: string[]
  }
}

export interface RouteMeta {
  title?: string
  icon?: string
  hidden?: boolean
  roles?: string[]
  permissions?: string[]
  requiresAuth?: boolean
  keepAlive?: boolean
}

export interface Plugin {
  name: string
  install: (app: any, options?: any) => void
}

export interface AppOptions {
  plugins?: Plugin[]
  router?: any
  store?: any
  config?: Record<string, any>
}

export interface LifecycleHooks {
  beforeCreate?: () => void | Promise<void>
  created?: () => void | Promise<void>
  beforeMount?: () => void | Promise<void>
  mounted?: () => void | Promise<void>
  beforeUnmount?: () => void | Promise<void>
  unmounted?: () => void | Promise<void>
}
