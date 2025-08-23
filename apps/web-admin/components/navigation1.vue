<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useMenuStore } from '../stores/menu'

const router = useRouter()
const userStore = useUserStore()
const menuStore = useMenuStore()

const handleLogout = async () => {
  const result = await userStore.logout()
  if (result.success) {
    router.push('/login')
  }
}
</script>

<template>
  <nav class="navigation">
    <div class="nav-container">
      <div class="nav-brand">
        <h2>Nova Admin</h2>
      </div>

      <div class="nav-menu">
        <!-- 动态生成菜单 -->
        <template v-for="menu in menuStore.filteredMenus" :key="menu.id">
          <router-link
            v-if="!menu.children"
            :to="menu.path"
            class="nav-link"
            active-class="active"
          >
            {{ menu.title }}
          </router-link>
          <div v-else class="nav-dropdown">
            <span class="nav-link dropdown-toggle">{{ menu.title }}</span>
            <div class="dropdown-menu">
              <router-link
                v-for="child in menu.children"
                :key="child.id"
                :to="child.path"
                class="dropdown-item"
                active-class="active"
              >
                {{ child.title }}
              </router-link>
            </div>
          </div>
        </template>
      </div>

      <div class="nav-user">
        <span class="username">{{ userStore.username }}</span>
        <button
          @click="handleLogout"
          class="logout-btn"
          :disabled="userStore.loading"
        >
          {{ userStore.loading ? '登出中...' : '登出' }}
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navigation {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.nav-brand h2 {
  margin: 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
}

.nav-menu {
  display: flex;
  gap: 24px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.nav-link:hover {
  color: #333;
  background: #f5f5f5;
}

.nav-link.active {
  color: #667eea;
  background: #f0f2ff;
}

.nav-dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dropdown-toggle::after {
  content: '▼';
  font-size: 10px;
  margin-left: 4px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
}

.nav-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  padding: 8px 16px;
  color: #666;
  text-decoration: none;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: #f5f5f5;
  color: #333;
}

.dropdown-item.active {
  color: #667eea;
  background: #f0f2ff;
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 16px;
}

.username {
  color: #666;
  font-size: 14px;
}

.logout-btn {
  padding: 8px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.logout-btn:hover:not(:disabled) {
  background-color: #c0392b;
}

.logout-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    height: auto;
    padding: 16px 0;
    gap: 16px;
  }

  .nav-menu {
    gap: 16px;
  }
}
</style>
