<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Lock } from '@element-plus/icons-vue'
import { useNamespace } from '@nova/shared-utils'

const ns = useNamespace('forbidden')

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('container')">
      <div :class="ns.e('icon')">
        <el-icon :size="120" color="#f56c6c">
          <Lock />
        </el-icon>
      </div>
      <h1 :class="ns.e('title')">403</h1>
      <p :class="ns.e('subtitle')">抱歉，您没有权限访问此页面</p>
      <div :class="ns.e('actions')">
        <el-button type="primary" @click="goBack">返回上页</el-button>
        <el-button @click="goHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../src/styles/variables.scss';

.nova-forbidden {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--el-fill-color-light) 0%,
    var(--el-bg-color) 100%
  );

  &__container {
    text-align: center;
    padding: 40px;
  }

  &__icon {
    margin-bottom: 24px;
  }

  &__title {
    font-size: 72px;
    font-weight: 700;
    color: var(--el-color-danger);
    margin: 0 0 16px 0;
  }

  &__subtitle {
    font-size: 18px;
    color: var(--el-text-color-secondary);
    margin: 0 0 32px 0;
  }

  &__actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: var(--nova-breakpoint-sm)) {
  .nova-forbidden {
    &__title {
      font-size: 48px;
    }

    &__subtitle {
      font-size: 16px;
    }

    &__actions {
      flex-direction: column;
      align-items: center;

      .el-button {
        width: 200px;
      }
    }
  }
}
</style>
