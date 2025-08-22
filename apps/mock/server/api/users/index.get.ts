import { getQuery } from 'h3'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 10
  const search = (query.search as string) || ''

  // 模拟用户数据
  const mockUsers = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      createTime: '2024-01-01T00:00:00Z',
      lastLoginTime: '2024-12-01T10:00:00Z'
    },
    {
      id: '2',
      username: 'user1',
      email: 'user1@example.com',
      role: 'user',
      status: 'active',
      createTime: '2024-01-02T00:00:00Z',
      lastLoginTime: '2024-12-01T09:00:00Z'
    },
    {
      id: '3',
      username: 'user2',
      email: 'user2@example.com',
      role: 'user',
      status: 'inactive',
      createTime: '2024-01-03T00:00:00Z',
      lastLoginTime: '2024-11-30T15:00:00Z'
    }
  ]

  // 模拟搜索过滤
  let filteredUsers = mockUsers
  if (search) {
    filteredUsers = mockUsers.filter(
      (user) => user.username.includes(search) || user.email.includes(search)
    )
  }

  // 模拟分页
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedUsers = filteredUsers.slice(start, end)

  return {
    success: true,
    data: {
      users: paginatedUsers,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit)
      }
    }
  }
})
