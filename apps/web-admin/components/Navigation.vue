<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

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
        <router-link to="/" class="nav-link" active-class="active">
          首页
        </router-link>
        <router-link to="/test" class="nav-link" active-class="active">
          鉴权测试
        </router-link>
        <router-link to="/dashboard" class="nav-link" active-class="active">
          仪表板
        </router-link>
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
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #333;
  background: #f5f5f5;
}

.nav-link.active {
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
