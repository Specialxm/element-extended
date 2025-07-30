import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { defaultLang } from '../../../../../../../vue/3.0/element-plus/docs/.vitepress/vitepress/constant'

export const useLang = () => {
  const route = useRoute()
  return computed(() => {
    // the first part of the first slash
    const path = route.data?.relativePath
    let lang: string

    if (path?.includes('/')) {
      lang = path.split('/').shift()! || defaultLang
    } else {
      lang = defaultLang
    }
    return lang
  })
}
