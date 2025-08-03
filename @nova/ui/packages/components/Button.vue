<template>
  <button class="my-button">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup></script>

<style scoped>
.my-button {
  padding: 10px 20px;
  background-color: #42b883;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
