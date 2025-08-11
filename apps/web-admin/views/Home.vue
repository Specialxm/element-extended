<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
// import { useUserStore } from '../stores/user'

const Navigation = defineAsyncComponent(
  () => import('../components/Navigation.vue')
)

const router = useRouter()
// const userStore = useUserStore()

// const username = computed(() => userStore.username)
// const loading = computed(() => userStore.loading)

// const handleLogout = async () => {
//   const result = await userStore.logout()
//   if (result.success) {
//     // 登出成功，跳转到登录页面
//     router.push('/login')
//   }
// }

const goToTest = () => {
  router.push('/test')
}
</script>

<template>
  <div class="home-container">
    <Navigation />

    <main class="main-content">
      <div class="welcome-card">
        <h2>欢迎来到 Nova Admin 系统</h2>
        <p>这是一个基于 Vue3 + TypeScript + Vite 的管理系统</p>
        <p>您已成功登录，可以访问受保护的页面</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <h3>用户管理</h3>
          <p>管理系统用户和权限</p>
        </div>
        <div class="feature-card">
          <h3>内容管理</h3>
          <p>管理网站内容和数据</p>
        </div>
        <div class="feature-card">
          <h3>系统设置</h3>
          <p>配置系统参数和选项</p>
        </div>
        <div class="feature-card">
          <h3>数据统计</h3>
          <p>查看系统使用统计</p>
        </div>
        <div class="feature-card">
          <h3>鉴权测试</h3>
          <p>测试鉴权功能是否正常工作</p>
          <button @click="goToTest" class="test-btn">进入测试</button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.welcome-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  margin-bottom: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.welcome-card h2 {
  color: #333;
  margin: 0 0 16px 0;
  font-size: 28px;
  font-weight: 600;
}

.welcome-card p {
  color: #666;
  margin: 8px 0;
  font-size: 16px;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  color: #333;
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
}

.feature-card p {
  color: #666;
  margin: 0 0 16px 0;
  font-size: 14px;
  line-height: 1.5;
}

.test-btn {
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.test-btn:hover {
  background: #5a6fd8;
}

@media (max-width: 768px) {
  .main-content {
    padding: 20px;
  }

  .welcome-card {
    padding: 24px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
