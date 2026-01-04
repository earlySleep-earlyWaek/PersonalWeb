<template>
  <el-dialog v-model="config.diaVisible" width="400" :show-close="false">
    <template #header>
      <div class="text-center font-size-25px font-900">注册</div>
    </template>

    <el-form
      ref="formRef"
      :rules="config.rules"
      :model="params"
      label-position="left"
      label-width="80px"
    >
      <el-form-item prop="userName" label="昵称">
        <el-input v-model="params.username" clearable />
      </el-form-item>
      <el-form-item prop="account" label="账号">
        <el-input v-model="params.account" clearable />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="params.password" clearable show-password />
      </el-form-item>
      <el-form-item prop="passwordAgain" label="确认密码">
        <el-input v-model="params.passwordAgain" clearable show-password />
      </el-form-item>
      <el-form-item prop="verifyCode" label="验证码">
        <div class="flex items-center gap-2">
          <el-input
            v-model="params.verifyCode"
            clearable
            placeholder="请输入验证码"
            maxlength="4"
            @keyup.enter="handleSubmit"
          />
          <!-- 验证码图片 -->
          <div
            class="verify-code-img"
            @click="refreshVerifyCode"
            :style="{ backgroundImage: `url(${verifyCodeImg})` }"
            title="点击刷新验证码"
          ></div>
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="w-full text-end">
        <el-button type="success" @click="handleSubmit" :loading="config.loading"> 注册 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { reactive, ref, onMounted } from 'vue'
import { userApi } from '@/api/user'
import { useRouter } from 'vue-router'
import {
  generateVerifyCode,
  createVerifyCodeImage,
  validateVerifyCode,
} from '@/utils/verifyCodeUtils'

// 路由
const router = useRouter()

// Ref
const formRef = ref(null)

// 当前验证码
const currentVerifyCode = ref('')
// 验证码图片URL
const verifyCodeImg = ref('')

// 刷新验证码
const refreshVerifyCode = () => {
  const code = generateVerifyCode()
  currentVerifyCode.value = code
  verifyCodeImg.value = createVerifyCodeImage(code)
}

// 配置对象
const config = reactive({
  diaVisible: false,
  loading: false, // 新增：加载状态
  rules: {
    userName: [
      {
        required: true,
        message: '请输入昵称',
        trigger: 'blur',
        whitespace: true, // 禁止纯空格
      },
      {
        min: 2,
        max: 15,
        message: '昵称长度必须为2-15位',
        trigger: 'blur',
      },
      {
        pattern: /^[^\s]+$/, // 不能包含空格
        message: '昵称不能包含空格',
        trigger: 'blur',
      },
    ],
    // 账号：5-16位，不能为空且长度符合要求
    account: [
      {
        required: true,
        message: '请输入账号',
        trigger: 'blur',
        whitespace: true,
      },
      {
        min: 5,
        max: 16,
        message: '账号长度必须为5-16位',
        trigger: 'blur',
      },
      {
        pattern: /^[a-zA-Z0-9_]+$/, // 限制账号只能是字母/数字/下划线
        message: '账号只能包含字母、数字和下划线',
        trigger: 'blur',
      },
    ],
    // 密码：6-16位，不能为空且长度符合要求
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
        whitespace: true,
      },
      {
        min: 6,
        max: 16,
        message: '密码长度必须为6-16位',
        trigger: 'blur',
      },
      {
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, // 至少包含一个字母和一个数字
        message: '密码至少包含一个字母和一个数字',
        trigger: 'blur',
      },
    ],
    // 重复密码：不能为空 + 与密码一致校验
    passwordAgain: [
      {
        required: true,
        message: '请再次输入密码',
        trigger: 'blur',
        whitespace: true,
      },
      {
        validator: (rule, value, callback) => {
          if (!value) return callback() // 为空时不校验（交给required规则）

          if (value !== params.password) {
            callback(new Error('两次输入的密码不一致'))
          } else {
            callback() // 校验通过
          }
        },
        trigger: ['blur', 'change'], // 失焦和值变化时都校验
      },
    ],
    // 验证码校验规则
    verifyCode: [
      {
        required: true,
        message: '请输入验证码',
        trigger: 'blur',
        whitespace: true,
      },
      {
        validator: (rule, value, callback) => {
          if (!value) return callback()

          // 使用工具函数验证验证码
          if (!validateVerifyCode(value, currentVerifyCode.value)) {
            callback(new Error('验证码输入错误'))
          } else {
            callback()
          }
        },
        trigger: ['blur', 'change'],
      },
    ],
  },
})

const params = reactive({
  account: '',
  password: '',
  passwordAgain: '',
  username: '',
  verifyCode: '', // 验证码字段
})
// 处理注册提交
const handleSubmit = async () => {
  // 验证所有字段
  try {
    await formRef.value.validate()
  } catch (error) {
    ElMessage.warning('表单校验失败，请检查输入内容')
    return
  }

  config.loading = true

  try {
    // 执行注册逻辑
    const userData = {
      username: params.account,
      nickname: params.username,
      password: params.password,
    }

    await userApi.createUser(userData)
    ElMessage.success('注册成功！')

    // 提交成功后重置表单和验证码
    formRef.value.resetFields()
    refreshVerifyCode()

    // 关闭对话框
    config.diaVisible = false
  } catch (error) {
    // console.error('注册失败:', error)
    // 根据错误信息显示相应的提示
    if (error.response?.data?.message?.includes('账号已存在')) {
      const username =
        error.response.data.message.split(': ')[1]?.replace(')', '') || params.account
      ElMessage.warning(`账号 ${username} 已存在，请更换账号名`)
    } else {
      ElMessage.error('注册失败，请稍后重试')
    }
  } finally {
    config.loading = false
  }
}

const open = () => {
  config.diaVisible = true
  // 打开弹窗时重置表单并刷新验证码
  if (formRef.value) {
    formRef.value.resetFields()
  }
  refreshVerifyCode()
}

// 初始化验证码
onMounted(() => {
  refreshVerifyCode()
})

defineExpose({
  open,
})
</script>

<style scoped>
.verify-code-img {
  width: 150px;
  height: 40px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  background-size: cover;
  background-position: center;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.gap-2 {
  gap: 8px;
}

.font-size-25px {
  font-size: 25px;
}

.font-900 {
  font-weight: 900;
}
</style>
