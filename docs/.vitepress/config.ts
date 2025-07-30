import { defineConfig } from 'vitepress'
import { mdPlugin } from './plugins/plugins'

console.log('---defineConfig---')
export default defineConfig({
  title: 'Element-Extended',
  description: '基于 Element Plus 的组件扩展库',
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
    },
    en: {
      label: 'English',
      lang: 'en-US',
    },
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/index' },
      { text: '组件', link: '/components/button' },
    ],
    sidebar: {
      '/guide/': [{ text: '指南', items: [{ text: '快速开始', link: '/guide/index' }] }],
      '/components/': [
        { text: '组件', items: [{ text: 'Button 按钮', link: '/components/button' }] },
      ],
    },
  },
  markdown: {
    config: (md) => mdPlugin(md),
    // config(md) {
    //   md.use(require('markdown-it-container'), 'DemoPreview', {
    //     validate(params) {
    //       return !!params.trim().match(/^DemoPreview\s*(.*)$/)
    //     },
    //     render(tokens, idx) {
    //       const m = tokens[idx].info.trim().match(/^DemoPreview\s*(.*)$/)
    //       if (tokens[idx].nesting === 1) {
    //         const path = m?.[1]?.trim()
    //         return `<DemoPreview path="${path}" />\n`
    //       } else {
    //         return ''
    //       }
    //     },
    //   })
    // }
  },
})
