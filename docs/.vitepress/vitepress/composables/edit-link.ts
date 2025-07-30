import { computed } from 'vue'
import { useData } from 'vitepress'
import { useLang } from './lang'
import { useLocale } from './locale'
import { defaultLang } from '../../../../../../../vue/3.0/element-plus/docs/.vitepress/vitepress/constant'
import {
  createCrowdinUrl,
  createGitHubUrl,
} from '../../../../../../../vue/3.0/element-plus/docs/.vitepress/vitepress/utils'
import editLinkLocale from '../../../../../../../vue/3.0/element-plus/docs/.vitepress/i18n/component/edit-link.json'

export function useEditLink() {
  const { page, theme, frontmatter } = useData()
  const lang = useLang()
  const editLink = useLocale(editLinkLocale)

  const canEditSource = computed(() => {
    return lang.value === defaultLang
  })

  const url = computed(() => {
    if (canEditSource.value) {
      const { repo, docsDir = '', docsBranch = 'dev', docsRepo = repo, editLinks } = theme.value
      const showEditLink =
        frontmatter.value.editLink != null ? frontmatter.value.editLink : editLinks
      const { relativePath } = page.value
      if (!showEditLink || !relativePath || !repo) {
        return null
      }
      return createGitHubUrl(docsRepo, docsDir, docsBranch, relativePath, '', '')
    }

    return createCrowdinUrl(lang.value)
  })
  const text = computed(() => {
    return canEditSource.value
      ? editLink.value['edit-on-github']
      : editLink.value['edit-on-crowdin']
  })

  return {
    url,
    text,
  }
}
