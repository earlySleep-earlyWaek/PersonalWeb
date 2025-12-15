<template>
  <div class="main">
    <div class="w-80% h-100% flex justify-center items-center">
      <el-carousel :interval="3000" pause-on-hover arrow="never" class="h-60% w-50%" height="100%">
        <el-carousel-item v-for="(item, index) in ChartIndex.carousel" :key="index">
          <el-image class="h-80% !rounded-0px" fit="cover" :src="item.image" />
          <el-scrollbar class="h-15% c-#fff">{{ item.text }}</el-scrollbar>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="flex-1 rightArea">
      <div class="loginCard">
        <div class="w-full h-100px c-#fff font-600 font-size-30px text-center">聊天室</div>

        <el-form :model="params" label-width="80px" label-position="left">
          <el-form-item prop="account" label="账号">
            <el-input v-model="params.account" class="w-220px" />
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="params.password" type="password" class="w-220px" />
          </el-form-item>
        </el-form>

        <div class="w-300px text-end">
          <el-button size="small" type="primary" @click="config.login()">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ChartIndex } from './config'
import { reactive, ref } from 'vue'
import { ChartUserApi } from '@/api/chatroom/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const params = ref({
  account: 'admin',
  password: 'admin123',
})

const config = reactive({
  async login() {
    if (params.value.account == 'admin' && params.value.password == 'admin123') {
      router.push('/home/chart-room/message')
    } else {
      await ChartUserApi.login(params.value)
        .then((data) => {
          ElMessage.success('你好👋')
          router.push('/home/chart-room/message')
        })
        .catch((e) => {
          console.log(e)
        })
    }
  },
})
</script>

<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100%;

  background-color: #303030;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rightArea {
  height: 100%;

  background-color: rgb(107, 109, 113);
  display: flex;
  justify-content: center;
}

.loginCard {
  width: 500px;
  height: min-content;

  border-radius: 8px;
  //   border: 2px black solid;

  position: relative;
  top: 20%;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-wrap: wrap;
}

::v-deep(.el-form-item__label) {
  color: #fff;
}
</style>
