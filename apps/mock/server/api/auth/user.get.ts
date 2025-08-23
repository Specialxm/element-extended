import { getHeader } from 'h3'

export default defineEventHandler((event) => {
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: '未授权访问'
    })
  }

  // 模拟用户信息
  const mockUserInfo = {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    avatar: 'https://via.placeholder.com/40',
    role: 'admin',
    permissions: [
      'dashboard',
      'system',
      'users',
      'roles',
      'menus',
      'content',
      'articles',
      'categories',
      'monitor',
      'online_users',
      'operation_logs'
    ]
  }

  return {
    success: true,
    data: mockUserInfo
  }
})
