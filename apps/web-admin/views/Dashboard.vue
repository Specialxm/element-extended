<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useUserStore } from '../stores/user'

const Navigation = defineAsyncComponent(
  () => import('../components/Navigation.vue')
)
const userStore = useUserStore()
</script>

<template>
  <div class="dashboard-container">
    <Navigation />

    <main class="dashboard-content">
      <div class="dashboard-header">
        <h1>仪表板</h1>
        <p>欢迎回来，{{ userStore.username }}！这里是您的系统概览。</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <h3>总用户数</h3>
            <p class="stat-number">1,234</p>
            <span class="stat-change positive">+12%</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <h3>今日访问</h3>
            <p class="stat-number">567</p>
            <span class="stat-change positive">+8%</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-content">
            <h3>收入</h3>
            <p class="stat-number">¥89,123</p>
            <span class="stat-change positive">+15%</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">⚠️</div>
          <div class="stat-content">
            <h3>待处理</h3>
            <p class="stat-number">23</p>
            <span class="stat-change negative">-5%</span>
          </div>
        </div>
      </div>

      <div class="charts-section">
        <div class="chart-card">
          <h3>访问趋势</h3>
          <div class="chart-placeholder">
            <p>图表区域</p>
            <small>这里可以集成真实的图表库，如 ECharts 或 Chart.js</small>
          </div>
        </div>

        <div class="chart-card">
          <h3>用户分布</h3>
          <div class="chart-placeholder">
            <p>图表区域</p>
            <small>这里可以集成真实的图表库，如 ECharts 或 Chart.js</small>
          </div>
        </div>
      </div>

      <div class="recent-activity">
        <h3>最近活动</h3>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon">👤</div>
            <div class="activity-content">
              <p><strong>新用户注册</strong></p>
              <small>用户 "john_doe" 刚刚注册了账户</small>
            </div>
            <span class="activity-time">2分钟前</span>
          </div>

          <div class="activity-item">
            <div class="activity-icon">📝</div>
            <div class="activity-content">
              <p><strong>内容更新</strong></p>
              <small>管理员更新了首页内容</small>
            </div>
            <span class="activity-time">15分钟前</span>
          </div>

          <div class="activity-item">
            <div class="activity-icon">🔒</div>
            <div class="activity-content">
              <p><strong>权限变更</strong></p>
              <small>用户 "admin" 的权限已更新</small>
            </div>
            <span class="activity-time">1小时前</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 40px;
}

.dashboard-header h1 {
  color: #333;
  margin: 0 0 16px 0;
  font-size: 32px;
  font-weight: 600;
}

.dashboard-header p {
  color: #666;
  margin: 0;
  font-size: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-icon {
  font-size: 32px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2ff;
  border-radius: 12px;
}

.stat-content h3 {
  color: #666;
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 500;
}

.stat-number {
  color: #333;
  margin: 0 0 4px 0;
  font-size: 24px;
  font-weight: 600;
}

.stat-change {
  font-size: 12px;
  font-weight: 500;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.chart-card h3 {
  color: #333;
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
}

.chart-placeholder {
  height: 200px;
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
}

.chart-placeholder p {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.chart-placeholder small {
  font-size: 12px;
  color: #999;
}

.recent-activity {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.recent-activity h3 {
  color: #333;
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.activity-icon {
  font-size: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 8px;
}

.activity-content {
  flex: 1;
}

.activity-content p {
  margin: 0 0 4px 0;
  color: #333;
  font-size: 14px;
}

.activity-content small {
  color: #666;
  font-size: 12px;
}

.activity-time {
  color: #999;
  font-size: 12px;
}

@media (max-width: 768px) {
  .dashboard-content {
    padding: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .charts-section {
    grid-template-columns: 1fr;
  }

  .stat-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
