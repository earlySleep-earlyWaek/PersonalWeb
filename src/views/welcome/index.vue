<template>
  <el-scrollbar ref="scrollbarRef" @scroll="config.handleScroll" class="w-100vw">
    <div class="w-full h-full flex justify-center flex-wrap">
      <div class="w-full">
        <TopBar />
      </div>
      <div class="w-80% min-w-1300px max-w-1600px h-100% mt-50px">
        <WelRouteArea class="mb-20px" />
        <MainTop class="mb-40px" />

        <div class="flex flex-wrap gap-10px">
          <div class="card" v-for="item in config.number">
            <VideoCard />
          </div>
        </div>
        <div class="w-full h-80px flex justify-center mt-20px c-#888">bilibili山寨版</div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { reactive, ref } from 'vue'

import WelRouteArea from './WelRouteArea.vue'
import MainTop from './MainTop.vue'
import TopBar from './TopBar.vue'
import VideoCard from './index/VideoCard.vue'

const scrollbarRef = ref()
const backTop = ref(false)

const config = reactive({
  showTop: false,
  number: 20,
  handleScroll(e) {
    if (e.scrollTop > 200) {
      backTop.value = true
    } else {
      backTop.value = false
    }
  },
})
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  width: calc(20% - 10px);
  margin-bottom: 10px;
}

@keyframes fontJump {
  50% {
    padding-bottom: 5px;
  }
  100% {
    padding-bottom: 0px;
  }
}
</style>
