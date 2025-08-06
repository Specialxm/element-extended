/**
 * 格式化日期
 * @param date 日期对象或日期字符串
 * @param format 格式字符串，默认'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | string, format = 'YYYY-MM-DD'): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')

  return format.replace('YYYY', String(year)).replace('MM', month).replace('DD', day)
}

/**
 * 生成随机ID
 * @param length ID长度，默认8
 * @returns 随机ID字符串
 */
export function generateId(length = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}

// 在这里导出更多工具函数...
