import mdContainer from 'markdown-it-container'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import externalLinkIcon from './external-link-icon'
import tableWrapper from './table-wrapper'
import tooltip from './tooltip'
import tag from './tag'
import headers from './headers'
import createDemoContainer from './demo'
import { ApiTableContainer } from './api-table'
import type { MarkdownRenderer } from 'vitepress'

export const mdPlugin = (md: MarkdownRenderer) => {
  md.use(headers)
  md.use(externalLinkIcon)
  md.use(tableWrapper)
  md.use(tooltip)
  md.use(tag)
  console.log('---mdContainer---')
  md.use(mdContainer, 'demo', createDemoContainer(md))
  md.use(ApiTableContainer)
  md.use(groupIconMdPlugin as unknown as (md: MarkdownRenderer) => void)
}
