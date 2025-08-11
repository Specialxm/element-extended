// 通用工具函数

/**
 * 格式化日期
 * @param date 日期对象或日期字符串
 * @param format 格式化字符串
 * @returns 格式化后的日期字符串
 */
export const formatDate = (
  date: Date | string,
  format: string = 'YYYY-MM-DD'
): string => {
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 生成随机ID
 * @param length ID长度
 * @returns 随机ID字符串
 */
export const generateId = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间
 * @returns 防抖后的函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param wait 等待时间
 * @returns 节流后的函数
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0

  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= wait) {
      lastCall = now
      func(...args)
    }
  }
}

/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 拷贝后的对象
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as T
  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}

/**
 * 获取URL参数
 * @param name 参数名
 * @returns 参数值
 */
export const getUrlParam = (name: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}

/**
 * 设置URL参数
 * @param name 参数名
 * @param value 参数值
 */
export const setUrlParam = (name: string, value: string): void => {
  const url = new URL(window.location.href)
  url.searchParams.set(name, value)
  window.history.replaceState({}, '', url.toString())
}

/**
 * 移除URL参数
 * @param name 参数名
 */
export const removeUrlParam = (name: string): void => {
  const url = new URL(window.location.href)
  url.searchParams.delete(name)
  window.history.replaceState({}, '', url.toString())
}

/**
 * 验证邮箱格式
 * @param email 邮箱地址
 * @returns 是否有效
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 验证手机号格式
 * @param phone 手机号
 * @returns 是否有效
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

/**
 * 验证密码强度
 * @param password 密码
 * @returns 强度等级 (0-4)
 */
export const getPasswordStrength = (password: string): number => {
  let strength = 0

  if (password.length >= 8) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  return strength
}

/**
 * 获取密码强度描述
 * @param strength 强度等级
 * @returns 强度描述
 */
export const getPasswordStrengthText = (strength: number): string => {
  const descriptions = ['很弱', '弱', '一般', '强', '很强']
  return descriptions[strength] || '未知'
}

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @returns 格式化后的文件大小
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns 是否复制成功
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    }
  } catch (error) {
    console.error('复制失败：', error)
    return false
  }
}

/**
 * 下载文件
 * @param url 文件URL
 * @param filename 文件名
 */
export const downloadFile = (url: string, filename?: string): void => {
  const link = document.createElement('a')
  link.href = url
  link.download = filename || ''
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * 显示加载状态
 * @param loading 是否显示加载
 * @param text 加载文本
 */
export const showLoading = (
  loading: boolean,
  text: string = '加载中...'
): void => {
  // 这里可以集成具体的UI组件库的加载状态
  if (loading) {
    console.log('显示加载状态：', text)
  } else {
    console.log('隐藏加载状态')
  }
}

/**
 * 显示消息提示
 * @param message 消息内容
 * @param type 消息类型
 * @param duration 显示时长
 */
export const showMessage = (
  message: string,
  type: 'success' | 'warning' | 'error' | 'info' = 'info',
  duration: number = 3000
): void => {
  // 这里可以集成具体的UI组件库的消息提示
  console.log(`[${type.toUpperCase()}] ${message}`)

  // 简单的原生提示
  const div = document.createElement('div')
  div.textContent = message
  div.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 6px;
    color: white;
    font-size: 14px;
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `

  // 根据类型设置背景色
  const colors = {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  }
  div.style.backgroundColor = colors[type]

  document.body.appendChild(div)

  // 自动移除
  setTimeout(() => {
    if (div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }, duration)
}

// 添加CSS动画
const style = document.createElement('style')
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`
document.head.appendChild(style)
