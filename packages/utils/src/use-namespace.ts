import { ref } from 'vue'

export interface UseNamespaceReturn {
  b: () => string
  e: (element: string) => string
  m: (modifier: string) => string
  be: (element: string, modifier: string) => string
  is: (name: string, state: boolean | undefined) => string
  cssVar: (object: Record<string, string>) => Record<string, string>
  cssVarBlock: (object: Record<string, string>) => Record<string, string>
}

/**
 * 创建 BEM 命名空间的工具函数
 * @param block 块名
 * @param prefix 前缀，默认为 'nova'
 * @returns BEM 命名空间对象
 */
export function useNamespace(
  block: string,
  prefix = 'nova'
): UseNamespaceReturn {
  const namespace = ref(`${prefix}-${block}`)

  const b = () => namespace.value

  const e = (element: string) => {
    if (!element) return namespace.value
    return `${namespace.value}__${element}`
  }

  const m = (modifier: string) => {
    if (!modifier) return namespace.value
    return `${namespace.value}--${modifier}`
  }

  const be = (element: string, modifier: string) => {
    if (!element || !modifier) return namespace.value
    return `${namespace.value}__${element}--${modifier}`
  }

  const is = (name: string, state: boolean | undefined) => {
    if (state === undefined) return ''
    return state ? `is-${name}` : ''
  }

  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const [key, value] of Object.entries(object)) {
      styles[`--${namespace.value}-${key}`] = value
    }
    return styles
  }

  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const [key, value] of Object.entries(object)) {
      styles[`--${key}`] = value
    }
    return styles
  }

  return {
    b,
    e,
    m,
    be,
    is,
    cssVar,
    cssVarBlock
  }
}

/**
 * 创建全局命名空间
 */
export const useGlobalNamespace = () => useNamespace('admin', 'nova')
