import { defineEventHandler } from "h3"

export default defineEventHandler(() => {
  return {
    userName: 'nova',
    realName: 'nova',
    email: 'nova@example.com',
    password: '123456',
    role: 'admin',
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
  }
})
