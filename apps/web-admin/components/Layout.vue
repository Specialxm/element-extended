<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNamespace } from '@nova/shared-utils'
import { novaApp } from '@nova/core'
import type { MenuItem, UserInfo } from '@nova/core'
import { ArrowDown } from '@element-plus/icons-vue'

// 使用 BEM 命名空间
const ns = useNamespace('layout')

// 响应式数据
const isCollapsed = ref(false)
const menus = ref<MenuItem[]>([])
const activeMenu = ref('')
const userInfo = ref<UserInfo | null>(null)

// 路由相关
const router = useRouter()
const route = useRoute()

// 计算属性
const breadcrumbs = computed(() => {
  const currentMenu = menus.value.find(
    (menu) =>
      menu.path === route.path ||
      (menu.children &&
        menu.children.some((child) => child.path === route.path))
  )

  if (currentMenu) {
    if (currentMenu.children) {
      const subMenu = currentMenu.children.find(
        (child) => child.path === route.path
      )
      return [
        { title: currentMenu.title, path: currentMenu.path || '#' },
        { title: subMenu?.title || '', path: subMenu?.path || '#' }
      ]
    }
    return [{ title: currentMenu.title, path: currentMenu.path || '#' }]
  }

  return []
})

// 方法
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleMenuSelect = (index: string) => {
  activeMenu.value = index
}

const handleMenuClick = (menu: MenuItem) => {
  if (menu.path) {
    router.push(menu.path)
  }
}

const handleUserCommand = async (command: string) => {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'settings':
      router.push('/settings')
      break
    case 'logout':
      await handleLogout()
      break
  }
}

const handleLogout = async () => {
  try {
    const authManager = novaApp.getAuthManager()
    const result = await authManager.logout()
    if (result.success) {
      router.push('/login')
    }
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

// 生命周期
onMounted(async () => {
  try {
    // 初始化 Nova App
    await novaApp.initialize()

    // 获取菜单和用户信息
    const menuManager = novaApp.getMenuManager()
    const authManager = novaApp.getAuthManager()

    menus.value = menuManager.allMenus.value
    userInfo.value = authManager.currentUser.value

    // 设置当前活动菜单
    const currentMenu = menuManager.findMenuByPath(route.path)
    if (currentMenu) {
      activeMenu.value = currentMenu.id
    }
  } catch (error) {
    console.error('Failed to initialize layout:', error)
  }
})
</script>

<template>
  <div :class="ns.b()">
    <!-- 侧边栏 -->
    <aside :class="[ns.e('sidebar'), { [ns.is('collapsed')]: isCollapsed }]">
      <div :class="ns.e('logo')">
        <img src="../../public/favicon.ico" alt="Logo" />
        <span v-show="!isCollapsed">Nova Admin</span>
      </div>

      <el-menu
        :class="ns.e('menu')"
        :default-active="activeMenu"
        :collapse="isCollapsed"
        :unique-opened="true"
        :collapse-transition="false"
        background-color="var(--nova-sidebar-bg-color)"
        text-color="var(--nova-sidebar-text-color)"
        active-text-color="var(--nova-sidebar-active-text-color)"
        @select="handleMenuSelect"
      >
        <template v-for="menu in menus">
          <el-sub-menu
            v-if="menu.children && menu.children.length > 0"
            :index="menu.id"
            :key="menu.id"
          >
            <template #title>
              <el-icon v-if="menu.icon">
                <component :is="menu.icon" />
              </el-icon>
              <span>{{ menu.title }}</span>
            </template>
            <el-menu-item
              v-for="subMenu in menu.children"
              :key="subMenu.id"
              :index="subMenu.id"
              @click="handleMenuClick(subMenu)"
            >
              <el-icon v-if="subMenu.icon">
                <component :is="subMenu.icon" />
              </el-icon>
              <span>{{ subMenu.title }}</span>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item
            v-else
            :index="menu.id"
            :key="menu.id"
            @click="handleMenuClick(menu)"
          >
            <el-icon v-if="menu.icon">
              <component :is="menu.icon" />
            </el-icon>
            <span>{{ menu.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </aside>

    <!-- 主内容区 -->
    <div :class="ns.e('main')">
      <!-- 顶部导航 -->
      <header :class="ns.e('header')">
        <div :class="ns.e('header-left')">
          <el-button
            :class="ns.e('collapse-btn')"
            type="text"
            @click="toggleCollapse"
          >
            <el-icon>
              <component :is="isCollapsed ? 'Expand' : 'Fold'" />
            </el-icon>
          </el-button>

          <el-breadcrumb :class="ns.e('breadcrumb')">
            <el-breadcrumb-item
              v-for="item in breadcrumbs"
              :key="item.path"
              :to="item.path"
            >
              {{ item.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div :class="ns.e('header-right')">
          <el-dropdown trigger="click" @command="handleUserCommand">
            <div :class="ns.e('user-info')">
              <el-avatar :size="32" :src="userInfo?.avatar">
                {{ userInfo?.username?.charAt(0)?.toUpperCase() }}
              </el-avatar>
              <span v-show="!isCollapsed">{{ userInfo?.username }}</span>
              <el-icon><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人资料</el-dropdown-item>
                <el-dropdown-item command="settings">系统设置</el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <!-- 内容区域 -->
      <main :class="ns.e('content')">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../src/styles/variables.scss';

.nova-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;

  &__sidebar {
    width: var(--nova-sidebar-width);
    background-color: var(--nova-sidebar-bg-color);
    border-right: 1px solid var(--el-border-color-light);
    transition: width var(--el-transition-duration)
      var(--el-transition-function);
    overflow: hidden;

    &.is-collapsed {
      width: var(--nova-sidebar-collapsed-width);
    }
  }

  &__logo {
    height: var(--nova-header-height);
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-bottom: 1px solid var(--el-border-color-light);

    img {
      width: 32px;
      height: 32px;
      margin-right: 12px;
    }

    span {
      font-size: 18px;
      font-weight: 600;
      color: var(--el-color-primary);
    }
  }

  &__menu {
    border: none;

    :deep(.el-menu-item) {
      height: 50px;
      line-height: 50px;

      &.is-active {
        background-color: var(--nova-sidebar-active-bg-color);
        color: var(--nova-sidebar-active-text-color);
      }

      &:hover {
        background-color: var(--nova-sidebar-hover-bg-color);
      }
    }

    :deep(.el-sub-menu__title) {
      height: 50px;
      line-height: 50px;

      &:hover {
        background-color: var(--nova-sidebar-hover-bg-color);
      }
    }
  }

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__header {
    height: var(--nova-header-height);
    background-color: var(--nova-header-bg-color);
    border-bottom: 1px solid var(--nova-header-border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  &__header-left {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__collapse-btn {
    padding: 8px;
    font-size: 18px;
  }

  &__breadcrumb {
    font-size: 14px;
  }

  &__header-right {
    display: flex;
    align-items: center;
  }

  &__user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: var(--el-border-radius-base);
    transition: background-color var(--el-transition-duration);

    &:hover {
      background-color: var(--el-fill-color-light);
    }
  }

  &__content {
    flex: 1;
    background-color: var(--nova-main-bg-color);
    padding: var(--nova-main-padding);
    overflow: auto;
  }
}
</style>
