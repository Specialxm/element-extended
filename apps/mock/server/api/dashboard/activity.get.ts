import { getQuery } from 'h3'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const limit = parseInt(query.limit as string) || 10

  // 模拟活动数据
  const mockActivities = [
    {
      id: '1',
      type: 'user_login',
      description: '用户 admin 登录系统',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      user: 'admin'
    },
    {
      id: '2',
      type: 'article_create',
      description: '用户 user1 创建了文章 "Vue3 最佳实践"',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      user: 'user1'
    },
    {
      id: '3',
      type: 'user_register',
      description: '新用户 user3 注册',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      user: 'user3'
    },
    {
      id: '4',
      type: 'category_update',
      description: '管理员更新了分类 "技术文章"',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      user: 'admin'
    }
  ]

  return {
    success: true,
    data: mockActivities.slice(0, limit)
  }
})
