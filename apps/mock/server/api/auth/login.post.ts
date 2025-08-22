import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  // 模拟验证逻辑
  if (username === 'admin' && password === 'admin') {
    const mockUserInfo = {
      id: '1',
      username: username,
      email: `${username}@example.com`,
      avatar: 'https://via.placeholder.com/40'
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
