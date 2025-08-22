<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNamespace } from '@nova/shared-utils'
import { dashboardAPI } from '../../../utils/api'
import { ElMessage } from 'element-plus'

// 使用 BEM 命名空间
const ns = useNamespace('dashboard')

// 类型定义
interface StatItem {
  title: string
  value: string
  icon: string
  color: string
}

interface ActivityItem {
  id: string | number
  content: string
  time: string
  type: 'primary' | 'success' | 'warning' | 'info'
}

interface QuickAction {
  name: string
  type: 'primary' | 'success' | 'warning' | 'info'
  icon: string
  path: string
}

interface DashboardStats {
  totalUsers?: number
  totalArticles?: number
  todayVisits?: number
  totalRevenue?: number
}

interface DashboardActivity {
  id: string | number
  description: string
  timestamp: string | number
  type: string
}

interface ApiResponse<T> {
  data: {
    success: boolean
    data: T
  }
}

// 响应式数据
const chartPeriod = ref<string>('7')
const router = useRouter()
const loading = ref<boolean>(false)

// 统计数据
const stats = ref<StatItem[]>([
  {
    title: '总用户数',
    value: '0',
    icon: 'User',
    color: '#409eff'
  },
  {
    title: '总文章数',
    value: '0',
    icon: 'Document',
    color: '#67c23a'
  },
  {
    title: '总访问量',
    value: '0',
    icon: 'View',
    color: '#e6a23c'
  },
  {
    title: '收藏数',
    value: '0',
    icon: 'Star',
    color: '#f56c6c'
  }
])

// 最近活动
const recentActivities = ref<ActivityItem[]>([])

// 快捷操作
const quickActions = ref<QuickAction[]>([
  {
    name: '新增用户',
    type: 'primary',
    icon: 'Plus',
    path: '/system/user'
  },
  {
    name: '系统设置',
    type: 'success',
    icon: 'Setting',
    path: '/settings'
  },
  {
    name: '文件上传',
    type: 'warning',
    icon: 'Upload',
    path: '/upload'
  }
])

// 获取统计数据
const fetchStats = async (): Promise<void> => {
  try {
    loading.value = true
    const response: ApiResponse<DashboardStats> = await dashboardAPI.getStats()

    if (response.data.success) {
      const data = response.data.data

      // 更新统计数据
      stats.value[0].value = data.totalUsers?.toLocaleString() || '0'
      stats.value[1].value = data.totalArticles?.toLocaleString() || '0'
      stats.value[2].value = data.todayVisits?.toLocaleString() || '0'
      stats.value[3].value = data.totalRevenue?.toLocaleString() || '0'
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
    ElMessage.error('获取统计数据失败')
  } finally {
    loading.value = false
  }
}

// 获取最近活动
const fetchRecentActivities = async (): Promise<void> => {
  try {
    const response: ApiResponse<DashboardActivity[]> =
      await dashboardAPI.getRecentActivity(5)

    if (response.data.success) {
      recentActivities.value = response.data.data.map(
        (activity: DashboardActivity): ActivityItem => ({
          id: activity.id,
          content: activity.description,
          time: new Date(activity.timestamp).toLocaleString('zh-CN'),
          type: getActivityType(activity.type)
        })
      )
    }
  } catch (error) {
    console.error('获取最近活动失败:', error)
    ElMessage.error('获取最近活动失败')
  }
}

// 根据活动类型获取对应的类型标识
const getActivityType = (
  type: string
): 'primary' | 'success' | 'warning' | 'info' => {
  const typeMap: Record<string, 'primary' | 'success' | 'warning' | 'info'> = {
    user_login: 'primary',
    article_create: 'success',
    user_register: 'info',
    category_update: 'warning'
  }
  return typeMap[type] || 'info'
}

// 方法
const handleQuickAction = (action: QuickAction): void => {
  if (action.path) {
    router.push(action.path)
  }
}

// 生命周期
onMounted((): void => {
  fetchStats()
  fetchRecentActivities()
})
</script>

<template>
  <div :class="ns.b()">
    <!-- 统计卡片 -->
    <div :class="ns.e('stats')">
      <el-row :gutter="20">
        <el-col :span="6" v-for="stat in stats" :key="stat.title">
          <el-card :class="ns.e('stat-card')" shadow="hover">
            <div :class="ns.e('stat-content')">
              <div
                :class="ns.e('stat-icon')"
                :style="{ backgroundColor: stat.color }"
              >
                <el-icon :size="24" color="white">
                  <component :is="stat.icon" />
                </el-icon>
              </div>
              <div :class="ns.e('stat-info')">
                <div :class="ns.e('stat-value')">{{ stat.value }}</div>
                <div :class="ns.e('stat-title')">{{ stat.title }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 图表区域 -->
    <div :class="ns.e('charts')">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card :class="ns.e('chart-card')" shadow="hover">
            <template #header>
              <div :class="ns.e('card-header')">
                <span>访问趋势</span>
                <el-select
                  v-model="chartPeriod"
                  size="small"
                  style="width: 100px"
                >
                  <el-option label="7天" value="7" />
                  <el-option label="30天" value="30" />
                  <el-option label="90天" value="90" />
                </el-select>
              </div>
            </template>
            <div :class="ns.e('chart-container')">
              <div :class="ns.e('chart-placeholder')">
                <el-icon :size="48" color="#909399">
                  <TrendCharts />
                </el-icon>
                <p>图表区域 - 可集成 ECharts 等图表库</p>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card :class="ns.e('chart-card')" shadow="hover">
            <template #header>
              <div :class="ns.e('card-header')">
                <span>用户分布</span>
              </div>
            </template>
            <div :class="ns.e('chart-container')">
              <div :class="ns.e('chart-placeholder')">
                <el-icon :size="48" color="#909399">
                  <PieChart />
                </el-icon>
                <p>饼图区域 - 可集成 ECharts 等图表库</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 最近活动 -->
    <div :class="ns.e('activities')">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-card :class="ns.e('activity-card')" shadow="hover">
            <template #header>
              <div :class="ns.e('card-header')">
                <span>最近活动</span>
                <el-button type="primary" size="small" text>查看全部</el-button>
              </div>
            </template>
            <el-timeline>
              <el-timeline-item
                v-for="activity in recentActivities"
                :key="activity.id"
                :timestamp="activity.time"
                :type="activity.type"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card :class="ns.e('quick-card')" shadow="hover">
            <template #header>
              <div :class="ns.e('card-header')">
                <span>快捷操作</span>
              </div>
            </template>
            <div :class="ns.e('quick-actions')">
              <el-button
                v-for="action in quickActions"
                :key="action.name"
                :type="action.type"
                :icon="action.icon"
                size="large"
                style="width: 100%; margin-bottom: 12px"
                @click="handleQuickAction(action)"
              >
                {{ action.name }}
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../src/styles/variables.scss';

.nova-dashboard {
  &__stats {
    margin-bottom: 24px;
  }

  &__stat-card {
    .el-card__body {
      padding: 20px;
    }
  }

  &__stat-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__stat-icon {
    width: 60px;
    height: 60px;
    border-radius: var(--el-border-radius-base);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__stat-info {
    flex: 1;
  }

  &__stat-value {
    font-size: 24px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin-bottom: 4px;
  }

  &__stat-title {
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }

  &__charts {
    margin-bottom: 24px;
  }

  &__chart-card {
    .el-card__body {
      padding: 20px;
    }
  }

  &__card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
  }

  &__chart-container {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__chart-placeholder {
    text-align: center;
    color: var(--el-text-color-secondary);

    p {
      margin: 16px 0 0 0;
      font-size: 14px;
    }
  }

  &__activities {
    margin-bottom: 24px;
  }

  &__activity-card {
    .el-card__body {
      padding: 20px;
    }
  }

  &__quick-card {
    .el-card__body {
      padding: 20px;
    }
  }

  &__quick-actions {
    .el-button {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

// 响应式设计
@media (max-width: var(--nova-breakpoint-lg)) {
  .nova-dashboard {
    &__stats {
      .el-col {
        margin-bottom: 16px;
      }
    }

    &__charts {
      .el-col {
        margin-bottom: 16px;
      }
    }

    &__activities {
      .el-col {
        margin-bottom: 16px;
      }
    }
  }
}

@media (max-width: var(--nova-breakpoint-md)) {
  .nova-dashboard {
    &__stats {
      .el-col {
        span: 6;
      }
    }
  }
}
</style>
