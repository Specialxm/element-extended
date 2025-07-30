import { computed } from 'vue'
import { useData } from 'vitepress'
import { createGitHubUrl } from '../../../../../../../vue/3.0/element-plus/docs/.vitepress/vitepress/utils'

import type { Ref } from 'vue'

export const useSourceCode = (path: Ref<string>) => {
  const { theme } = useData()

  const demoUrl = computed(() => {
    const { repo, docsDir = '', docsBranch = 'dev', docsRepo = repo } = theme.value

    return createGitHubUrl(docsRepo, docsDir, docsBranch, path.value)
  })

  return demoUrl
}
