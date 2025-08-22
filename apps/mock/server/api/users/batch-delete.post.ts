import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userIds } = body

  // 模拟批量删除用户
  return {
    success: true,
    message: `成功删除 ${userIds.length} 个用户`,
    data: {
      deletedCount: userIds.length,
      deletedIds: userIds
    }
  }
})
