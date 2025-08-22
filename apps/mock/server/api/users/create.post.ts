import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, email, password, role, status } = body

  // 模拟创建用户
  const newUser = {
    id: Date.now().toString(),
    username,
    email,
    role,
    status,
    createTime: new Date().toISOString(),
    lastLoginTime: null
  }

  return {
    success: true,
    data: newUser,
    message: '用户创建成功'
  }
})
