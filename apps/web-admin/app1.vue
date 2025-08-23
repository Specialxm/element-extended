<script setup lang="ts">
// 使用 router-view 来显示路由内容
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import './src/styles/variables.scss';

#app {
  font-family: var(--el-font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-size: var(--el-font-size-base);
  line-height: var(--el-font-line-height-primary);
  color: var(--el-text-color-primary);
  background-color: var(--el-bg-color-page);
}

button {
  font-family: inherit;
}

input {
  font-family: inherit;
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--el-fill-color-lighter);
}

::-webkit-scrollbar-thumb {
  background: var(--el-border-color);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--el-border-color-dark);
}
</style>
