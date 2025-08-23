<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { isLoggedIn } from '../../utils/auth'

const router = useRouter()
const userStore = useUserStore()

const isLoggedInResult = ref(false)

const checkAuth = () => {
  isLoggedInResult.value = isLoggedIn()
  console.log('认证状态检查:', {
    store: {
      token: !!userStore.token,
      userInfo: !!userStore.userInfo,
      isLoggedIn: userStore.isLoggedIn
    },
    utils: {
      isLoggedIn: isLoggedIn()
    }
  })
}

const goToLogin = () => {
  router.push('/login')
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const logout = async () => {
  await userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="test-page">
    <h1>测试页面</h1>
    <div class="auth-status">
      <h3>认证状态</h3>
      <p>Token: {{ !!userStore.token ? '已设置' : '未设置' }}</p>
      <p>用户信息: {{ !!userStore.userInfo ? '已设置' : '未设置' }}</p>
      <p>登录状态: {{ userStore.isLoggedIn ? '已登录' : '未登录' }}</p>
      <p>isLoggedIn(): {{ isLoggedInResult ? '已登录' : '未登录' }}</p>
    </div>

    <div class="actions">
      <el-button @click="checkAuth">检查认证状态</el-button>
      <el-button @click="goToLogin">跳转登录页</el-button>
      <el-button @click="goToDashboard">跳转仪表盘</el-button>
      <el-button @click="logout">登出</el-button>
    </div>
  </div>
</template>

<style scoped>
.test-page {
  padding: 20px;
}

.auth-status {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.actions {
  margin-top: 20px;
}

.actions .el-button {
  margin-right: 10px;
}
</style>
