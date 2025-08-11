<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const goHome = () => {
  router.push('/')
}

const handleLogout = async () => {
  const result = await userStore.logout()
  if (result.success) {
    router.push('/login')
  }
}
</script>

<template>
  <div class="test-container">
    <div class="test-card">
      <h2>鉴权测试页面</h2>
      <p>如果您能看到这个页面，说明您已经成功登录！</p>

      <div class="user-info">
        <h3>当前用户信息：</h3>
        <p><strong>用户名：</strong>{{ userStore.username }}</p>
        <p>
          <strong>用户ID：</strong>
          {{ userStore.userInfo ? userStore.userInfo.id : 'N/A' }}
        </p>
        <p>
          <strong>邮箱：</strong>
          {{ userStore.userInfo ? userStore.userInfo.email : 'N/A' }}
        </p>
        <p>
          <strong>登录状态：</strong>
          {{ userStore.isLoggedIn ? '已登录' : '未登录' }}
        </p>
      </div>

      <div class="actions">
        <button @click="goHome" class="btn btn-primary">返回首页</button>
        <button @click="handleLogout" class="btn btn-danger">登出</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.test-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.test-card h2 {
  color: #333;
  margin: 0 0 20px 0;
  font-size: 28px;
  font-weight: 600;
}

.test-card p {
  color: #666;
  margin: 16px 0;
  font-size: 16px;
  line-height: 1.6;
}

.user-info {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 24px;
  margin: 24px 0;
  text-align: left;
}

.user-info h3 {
  color: #333;
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
}

.user-info p {
  margin: 8px 0;
  color: #555;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background: #c0392b;
  transform: translateY(-2px);
}
</style>
