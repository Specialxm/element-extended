import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Vue Library',
  description: '一个 Vue 3 组件库',
  themeConfig: {
    nav: [{ text: '组件', link: '/packages/components/button' }],
    sidebar: {
      '/components/': [
        {
          text: '基础组件',
          items: [{ text: 'Button 按钮', link: '/packages/components/button' }],
        },
      ],
    },
  },
})
