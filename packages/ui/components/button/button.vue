<template>
  <button :class="bemClass" :disabled="disabled" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

defineOptions({
  name: 'NovaButton',
})

type ButtonType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
type ButtonSize = 'small' | 'medium' | 'large'

interface Props {
  /** 按钮类型 */
  type?: ButtonType
  /** 按钮尺寸 */
  size?: ButtonSize
  /** 是否禁用 */
  disabled?: boolean
  /** 原生button类型 */
  nativeType?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  nativeType: 'button',
})

// BEM命名规范实现
const bemClass = computed(() => {
  return [
    'nova-button',
    `nova-button--${props.type}`,
    `nova-button--${props.size}`,
    {
      'nova-button--disabled': props.disabled,
    },
  ]
})
</script>

<style scoped>
/* 基础样式变量定义 */
:root {
  /* 颜色变量 */
  --nova-button-primary-color: #fff;
  --nova-button-primary-bg: #42b883;
  --nova-button-primary-border: #42b883;

  --nova-button-secondary-color: #333;
  --nova-button-secondary-bg: #f5f5f5;
  --nova-button-secondary-border: #e0e0e0;

  /* 尺寸变量 */
  --nova-button-small-padding: 6px 12px;
  --nova-button-medium-padding: 8px 16px;
  --nova-button-large-padding: 12px 24px;

  /* 边框变量 */
  --nova-button-border-width: 1px;
  --nova-button-border-radius: 4px;

  /* 字体变量 */
  --nova-button-font-size: 14px;
}

/* 基础按钮样式 */
.nova-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: var(--nova-button-border-width) solid var(--nova-button-border);
  border-radius: var(--nova-button-border-radius);
  background-color: var(--nova-button-bg);
  color: var(--nova-button-color);
  font-size: var(--nova-button-font-size);
  cursor: pointer;
  transition: all 0.2s ease;
}

/* 尺寸修饰符 */
.nova-button--small {
  padding: var(--nova-button-small-padding);
}

.nova-button--medium {
  padding: var(--nova-button-medium-padding);
}

.nova-button--large {
  padding: var(--nova-button-large-padding);
}

/* 类型修饰符 */
.nova-button--primary {
  --nova-button-color: var(--nova-button-primary-color);
  --nova-button-bg: var(--nova-button-primary-bg);
  --nova-button-border: var(--nova-button-primary-border);
}

.nova-button--secondary {
  --nova-button-color: var(--nova-button-secondary-color);
  --nova-button-bg: var(--nova-button-secondary-bg);
  --nova-button-border: var(--nova-button-secondary-border);
}

/* 状态修饰符 */
.nova-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

/* 交互效果 */
.nova-button:not(.nova-button--disabled):hover {
  opacity: 0.9;
}

.nova-button:not(.nova-button--disabled):active {
  transform: translateY(1px);
}
</style>
