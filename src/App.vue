<template>
  <div class="app-container">
    <h1>Monorepo工程化项目</h1>
    <p>这是一个基于Vue3+TypeScript+Vite的Monorepo工程化案例</p>
    <MButton type="primary">测试组件库</MButton>
    <p>随机ID: {{ randomId }}</p>
    <p>当前日期: {{ formattedDate }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import aaa, { MButton } from '@nova/ui'
import { formatDate, generateId } from '@nova/shared'

console.log(aaa, '---aaa---')

export default defineComponent({
  name: 'App',
  components: { MButton },
  setup() {
    return {
      randomId: generateId(),
      formattedDate: formatDate(new Date(), 'YYYY年MM月DD日'),
    }
  },
})
</script>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
</style>
