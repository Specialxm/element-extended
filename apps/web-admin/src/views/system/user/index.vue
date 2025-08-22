<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormProps } from 'element-plus'
import {
  Search,
  Refresh,
  Plus,
  Delete,
  Download,
  Edit,
  View
} from '@element-plus/icons-vue'
import { useNamespace } from '@nova/shared-utils'
import { userAPI } from '../../../../utils/api'

// 使用 BEM 命名空间
const ns = useNamespace('user-management')

// 响应式数据
const loading = ref(false)
const submitLoading = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const selectedUsers = ref<any[]>([])
const userFormRef = ref<FormInstance | null>(null)

// 搜索表单
const searchForm = reactive({
  username: '',
  email: '',
  status: ''
})

// 用户表单
const userForm = reactive({
  id: '',
  username: '',
  email: '',
  password: '',
  role: '',
  status: 'active'
})

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 用户列表
const userList = ref([])

// 表单验证规则
const userRules: FormProps['rules'] = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

// 方法
const handleSearch = () => {
  pagination.currentPage = 1
  fetchUserList()
}

const handleReset = () => {
  Object.assign(searchForm, {
    username: '',
    email: '',
    status: ''
  })
  handleSearch()
}

const handleAdd = () => {
  dialogTitle.value = '新增用户'
  Object.assign(userForm, {
    id: '',
    username: '',
    email: '',
    password: '',
    role: '',
    status: 'active'
  })
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑用户'
  Object.assign(userForm, row)
  dialogVisible.value = true
}

const handleView = (row: any) => {
  ElMessage.info(`查看用户：${row.username}`)
}

const handleDelete = async (row: any) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除用户 "${row.username}" 吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    // 调用删除 API
    await userAPI.deleteUser(row.id)
    ElMessage.success('删除成功')
    fetchUserList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除用户失败:', error)
      ElMessage.error('删除用户失败')
    }
  }
}

const handleBatchDelete = async () => {
  if (selectedUsers.value.length === 0) {
    ElMessage.warning('请选择要删除的用户')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${selectedUsers.value.length} 个用户吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    // 调用批量删除 API
    const userIds = selectedUsers.value.map((user) => user.id)
    await userAPI.batchDeleteUsers(userIds)
    ElMessage.success('批量删除成功')
    selectedUsers.value = []
    fetchUserList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('批量删除用户失败:', error)
      ElMessage.error('批量删除用户失败')
    }
  }
}

const handleExport = () => {
  ElMessage.info('导出功能开发中...')
}

const handleSubmit = async () => {
  if (!userFormRef.value) return

  try {
    await userFormRef.value.validate()
    submitLoading.value = true

    if (userForm.id) {
      // 更新用户
      await userAPI.updateUser(userForm.id, userForm)
      ElMessage.success('更新成功')
    } else {
      // 新增用户
      await userAPI.createUser(userForm)
      ElMessage.success('新增成功')
    }

    dialogVisible.value = false
    fetchUserList()
  } catch (error) {
    console.error('提交失败:', error)
    ElMessage.error('操作失败')
  } finally {
    submitLoading.value = false
  }
}

const handleSelectionChange = (selection: any[]) => {
  selectedUsers.value = selection
}

const handleSizeChange = (size: number) => {
  pagination.pageSize = size
  pagination.currentPage = 1
  fetchUserList()
}

const handleCurrentChange = (page: number) => {
  pagination.currentPage = page
  fetchUserList()
}

const fetchUserList = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.currentPage,
      limit: pagination.pageSize,
      search: searchForm.username || searchForm.email || ''
    }

    const response = await userAPI.getUserList(params)

    if (response.data.success) {
      userList.value = response.data.data.users
      pagination.total = response.data.data.total
    }
  } catch (error) {
    console.error('获取用户列表失败:', error)
    ElMessage.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}

// 生命周期
onMounted(() => {
  fetchUserList()
})
</script>

<template>
  <div :class="ns.b()">
    <!-- 搜索区域 -->
    <el-card :class="ns.e('search-card')" shadow="hover">
      <el-form :model="searchForm" :inline="true" :class="ns.e('search-form')">
        <el-form-item label="用户名">
          <el-input
            v-model="searchForm.username"
            placeholder="请输入用户名"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="searchForm.email"
            placeholder="请输入邮箱"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择状态"
            clearable
            style="width: 120px"
          >
            <el-option label="启用" value="active" />
            <el-option label="禁用" value="inactive" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
          <el-button @click="handleReset">
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 操作区域 -->
    <el-card :class="ns.e('action-card')" shadow="hover">
      <div :class="ns.e('action-bar')">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新增用户
        </el-button>
        <el-button
          type="danger"
          :disabled="!selectedUsers.length"
          @click="handleBatchDelete"
        >
          <el-icon><Delete /></el-icon>
          批量删除
        </el-button>
        <el-button @click="handleExport">
          <el-icon><Download /></el-icon>
          导出数据
        </el-button>
      </div>
    </el-card>

    <!-- 用户列表 -->
    <el-card :class="ns.e('table-card')" shadow="hover">
      <el-table
        v-loading="loading"
        :data="userList"
        :class="ns.e('user-table')"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="role" label="角色" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="lastLoginTime" label="最后登录" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              text
              @click="handleEdit(row)"
            >
              <el-icon><Edit /></el-icon>
              编辑
            </el-button>
            <el-button
              type="success"
              size="small"
              text
              @click="handleView(row)"
            >
              <el-icon><View /></el-icon>
              查看
            </el-button>
            <el-button
              type="danger"
              size="small"
              text
              @click="handleDelete(row)"
            >
              <el-icon><Delete /></el-icon>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div :class="ns.e('pagination')">
        <el-pagination
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 用户表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="userRules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!userForm.id">
          <el-input
            v-model="userForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select
            v-model="userForm.role"
            placeholder="请选择角色"
            style="width: 100%"
          >
            <el-option label="管理员" value="admin" />
            <el-option label="编辑" value="editor" />
            <el-option label="访客" value="visitor" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="userForm.status">
            <el-radio value="active">启用</el-radio>
            <el-radio value="inactive">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="handleSubmit"
            :loading="submitLoading"
          >
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../../src/styles/variables.scss';

.nova-user-management {
  &__search-card {
    margin-bottom: 16px;
  }

  &__search-form {
    .el-form-item {
      margin-bottom: 16px;
    }
  }

  &__action-card {
    margin-bottom: 16px;
  }

  &__action-bar {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  &__table-card {
    .el-card__body {
      padding: 0;
    }
  }

  &__user-table {
    .el-table__header {
      background-color: var(--nova-table-header-bg-color);
    }
  }

  &__pagination {
    padding: 20px;
    text-align: right;
    border-top: 1px solid var(--nova-table-border-color);
  }
}

// 响应式设计
@media (max-width: var(--nova-breakpoint-md)) {
  .nova-user-management {
    &__search-form {
      .el-form-item {
        display: block;
        margin-bottom: 16px;

        .el-form-item__label {
          display: block;
          margin-bottom: 8px;
        }
      }
    }

    &__action-bar {
      flex-direction: column;

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
