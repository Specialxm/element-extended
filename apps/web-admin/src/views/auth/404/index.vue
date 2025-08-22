<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1>页面未找到</h1>
      <p>抱歉，您访问的页面不存在或已被移除。</p>

      <div class="actions">
        <button @click="goHome" class="btn btn-primary">返回首页</button>
        <button @click="goBack" class="btn btn-secondary">返回上页</button>
      </div>

      <div class="suggestions">
        <h3>您可能想要访问：</h3>
        <div class="suggestion-links">
          <router-link to="/" class="suggestion-link">首页</router-link>
          <router-link to="/dashboard" class="suggestion-link">
            仪表板
          </router-link>
          <router-link to="/test" class="suggestion-link">鉴权测试</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.not-found-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 60px 40px;
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.error-code {
  font-size: 120px;
  font-weight: 700;
  color: #667eea;
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.not-found-content h1 {
  color: #333;
  margin: 0 0 16px 0;
  font-size: 28px;
  font-weight: 600;
}

.not-found-content p {
  color: #666;
  margin: 0 0 32px 0;
  font-size: 16px;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 40px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #f8f9fa;
  color: #666;
  border: 1px solid #dee2e6;
}

.btn-secondary:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.suggestions {
  border-top: 1px solid #e9ecef;
  padding-top: 32px;
}

.suggestions h3 {
  color: #333;
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
}

.suggestion-links {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.suggestion-link {
  padding: 8px 16px;
  background: #f0f2ff;
  color: #667eea;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.suggestion-link:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .not-found-content {
    padding: 40px 20px;
  }

  .error-code {
    font-size: 80px;
  }

  .actions {
    flex-direction: column;
    align-items: center;
  }

  .suggestion-links {
    flex-direction: column;
    align-items: center;
  }
}
</style>
