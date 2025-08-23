import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  // 模拟验证逻辑
  if (username === 'admin' && password === 'admin123456') {
    const mockUserInfo = {
      id: '1',
      username: username,
      email: `${username}@example.com`,
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
    const mockToken = `mock_token_${Date.now()}`

    return {
      success: true,
      data: {
        token: mockToken,
        userInfo: mockUserInfo
      }
    }
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: '用户名或密码错误'
    })
  }
})
