import { computed } from 'vue'
import navbarLocale from '../../../../../../../vue/3.0/element-plus/docs/.vitepress/i18n/component/navbar.json'
import { useLang } from './lang'

export function useNavbarLocale() {
  const lang = useLang()

  return computed<Record<string, string>>(() => navbarLocale[lang.value])
}
