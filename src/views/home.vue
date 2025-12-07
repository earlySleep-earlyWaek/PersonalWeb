<template>
  <div class="w-1600px h-100vh fixed left-0 top-0">
    <el-tabs v-model="config.activeTab" @click="config.go()" type="card">
      <el-tab-pane name="welcome" label="Bili山寨版(开发中)" />
      <el-tab-pane name="map" label="地图(暂停)" />
      <el-tab-pane name="echarts" label="数据统计(预设)" />
      <el-tab-pane name="fun" label="小创意(预设)" />
      <el-tab-pane name="test" label="组件测试" />
      <el-tab-pane name="config" label="设置" />
    </el-tabs>

    <div class="w-full h-full -mt-15px">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { systemConfig } from '@/views/config/config'
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const config = reactive({
  activeTab: 'welcome',
  go() {
    switch (this.activeTab) {
      case 'welcome': {
        router.push('/home/welcome')
        break
      }
      case 'map': {
        router.push('/home/map')
        break
      }
      case 'echarts': {
        router.push('/home/echarts')
        break
      }
      case 'fun': {
        router.push('/home/fun/welcome')
        break
      }
      case 'test': {
        router.push('/home/test')
        break
      }
      case 'config': {
        router.push('/home/config')
        break
      }
    }
  },
})

onMounted(() => {
  systemConfig.init()
})
</script>

<style lang="scss" scoped>
.main_view {
  width: 100%;
  height: 100%;
}
</style>
