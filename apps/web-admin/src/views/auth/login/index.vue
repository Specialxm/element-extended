<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useNamespace } from '@nova/shared-utils'
import { useUserStore } from '../../../../stores/user'
import type { FormInstance, FormRules } from 'element-plus'

// 使用 BEM 命名空间
const ns = useNamespace('login')

// 响应式数据
const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const loginForm = reactive({
  username: 'admin',
  password: 'admin123456',
  remember: false
})

// 路由相关
const router = useRouter()
const route = useRoute()

// 表单验证规则
const loginRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

// 登录方法
const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    await loginFormRef.value.validate()
    loading.value = true

    // 使用 user store 进行登录
    const userStore = useUserStore()
    const result = await userStore.login(loginForm)

    if (result.success) {
      ElMessage.success('登录成功')

      // 跳转到目标页面或首页
      const redirect = route.query.redirect as string
      router.push(redirect || '/')
    } else {
      ElMessage.error(result.error || '登录失败')
    }
  } catch (error) {
    console.error('Login failed:', error)
    ElMessage.error('登录失败，请检查输入')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('container')">
      <div :class="ns.e('form-wrapper')">
        <div :class="ns.e('header')">
          <img
            src="../../public/favicon.ico"
            alt="Logo"
            :class="ns.e('logo')"
          />
          <h1 :class="ns.e('title')">Nova Admin</h1>
          <p :class="ns.e('subtitle')">后台管理系统</p>
        </div>

        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          :class="ns.e('form')"
          @submit.prevent="handleLogin"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              size="large"
              :prefix-icon="User"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              :prefix-icon="Lock"
              show-password
              @keyup.enter="handleLogin"
            />
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="loginForm.remember"> 记住我 </el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              :class="ns.e('login-btn')"
              :loading="loading"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>

        <div :class="ns.e('footer')">
          <p>默认账号：admin / admin</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';

.nova-login {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--el-color-primary-light-8) 0%,
    var(--el-color-primary-light-9) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  &__container {
    width: 100%;
    max-width: 400px;
  }

  &__form-wrapper {
    background: var(--el-bg-color);
    border-radius: var(--el-border-radius-base);
    box-shadow: var(--el-box-shadow);
    padding: 40px;
  }

  &__header {
    text-align: center;
    margin-bottom: 40px;
  }

  &__logo {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
  }

  &__title {
    font-size: 28px;
    font-weight: 600;
    color: var(--el-color-primary);
    margin: 0 0 8px 0;
  }

  &__subtitle {
    font-size: 16px;
    color: var(--el-text-color-secondary);
    margin: 0;
  }

  &__form {
    .el-form-item {
      margin-bottom: 24px;
    }

    .el-input {
      :deep(.el-input__wrapper) {
        border-radius: var(--el-border-radius-base);
      }
    }
  }

  &__login-btn {
    width: 100%;
    height: 44px;
    font-size: 16px;
    border-radius: var(--el-border-radius-base);
  }

  &__footer {
    text-align: center;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--el-border-color-lighter);

    p {
      margin: 0;
      color: var(--el-text-color-secondary);
      font-size: 14px;
    }
  }
}

// 响应式设计
@media (max-width: var(--nova-breakpoint-sm)) {
  .nova-login {
    padding: 16px;

    &__form-wrapper {
      padding: 24px;
    }

    &__title {
      font-size: 24px;
    }

    &__subtitle {
      font-size: 14px;
    }
  }
}
</style>
