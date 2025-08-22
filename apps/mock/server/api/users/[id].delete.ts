import { getRouterParam } from 'h3'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  // 模拟删除用户
  return {
    success: true,
    message: `用户 ${id} 删除成功`
  }
})
