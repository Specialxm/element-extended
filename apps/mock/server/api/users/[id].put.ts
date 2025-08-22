import { readBody, getRouterParam } from 'h3'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { username, email, role, status } = body

  // 模拟更新用户
  const updatedUser = {
    id,
    username,
    email,
    role,
    status,
    createTime: new Date().toISOString(),
    lastLoginTime: new Date().toISOString()
  }

  return {
    success: true,
    data: updatedUser,
    message: '用户更新成功'
  }
})
