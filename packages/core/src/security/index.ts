import DOMPurify from 'dompurify'

export class SecurityManager {
  // XSS 防护 - 清理 HTML 内容
  sanitizeHTML(html: string): string {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
      ALLOWED_ATTR: ['href', 'target']
    })
  }

  // XSS 防护 - 清理文本内容
  sanitizeText(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  }

  // 验证 URL 安全性
  validateURL(url: string): boolean {
    try {
      const urlObj = new URL(url)
      // 只允许 http 和 https 协议
      return ['http:', 'https:'].includes(urlObj.protocol)
    } catch {
      return false
    }
  }

  // 验证文件类型
  validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type)
  }

  // 验证文件大小
  validateFileSize(file: File, maxSize: number): boolean {
    return file.size <= maxSize
  }

  // 生成安全的随机字符串
  generateSecureToken(length: number = 32): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // 检查密码强度
  checkPasswordStrength(password: string): {
    score: number
    feedback: string[]
  } {
    const feedback: string[] = []
    let score = 0

    // 长度检查
    if (password.length >= 8) {
      score += 1
    } else {
      feedback.push('密码长度至少8位')
    }

    // 包含数字
    if (/\d/.test(password)) {
      score += 1
    } else {
      feedback.push('密码应包含数字')
    }

    // 包含小写字母
    if (/[a-z]/.test(password)) {
      score += 1
    } else {
      feedback.push('密码应包含小写字母')
    }

    // 包含大写字母
    if (/[A-Z]/.test(password)) {
      score += 1
    } else {
      feedback.push('密码应包含大写字母')
    }

    // 包含特殊字符
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1
    } else {
      feedback.push('密码应包含特殊字符')
    }

    return { score, feedback }
  }

  // 防止 SQL 注入（简单检查）
  preventSQLInjection(input: string): boolean {
    const sqlKeywords = [
      'SELECT',
      'INSERT',
      'UPDATE',
      'DELETE',
      'DROP',
      'CREATE',
      'ALTER',
      'EXEC',
      'EXECUTE',
      'UNION',
      'SCRIPT',
      '--',
      '/*',
      '*/'
    ]

    const upperInput = input.toUpperCase()
    return !sqlKeywords.some((keyword) => upperInput.includes(keyword))
  }
}

// 导出单例实例
export const securityManager = new SecurityManager()
