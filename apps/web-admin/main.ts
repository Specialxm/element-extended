import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './app1.vue'
import router from './router'
import { novaApp } from '@nova/core'

// 创建应用实例
const app = createApp(App)

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用插件
app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})

// 设置 Nova App
novaApp.setApp(app)
novaApp.setOptions({
  router,
  config: {
    title: 'Nova Admin',
    version: '1.0.0'
  }
})

// 初始化 Nova App
novaApp
  .initialize()
  .then(() => {
    app.mount('#app')
  })
  .catch((error) => {
    console.error('Failed to initialize Nova App:', error)
  })
