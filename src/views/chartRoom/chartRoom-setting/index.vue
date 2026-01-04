<template>
  <div class="w-full h-full pl-20px pr-20px bg-dark">
    <h3 class="c-white">设置</h3>
    <el-scrollbar class="w-full" :style="{ height: 'calc(100% - 130px)' }"> </el-scrollbar>
    <div class="fixed bottom-0px right-20px flex h-50px">
      <el-button type="danger" @click="logout">退出</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const logout = () => {
  userStore.logout()
}
</script>
