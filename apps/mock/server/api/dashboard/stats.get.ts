export default defineEventHandler(() => {
  // 模拟统计数据
  const mockStats = {
    totalUsers: 1250,
    activeUsers: 890,
    totalArticles: 456,
    totalCategories: 23,
    todayVisits: 1234,
    weekVisits: 8765,
    monthVisits: 34567,
    totalRevenue: 98765.43
  }

  return {
    success: true,
    data: mockStats
  }
})
