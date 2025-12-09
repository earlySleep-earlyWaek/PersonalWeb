<!-- 频道导航区 -->

<template>
  <div class="routeArea">
    <div class="w-10% flex justify-center">
      <div class="w-70% flex justify-between">
        <div class="flex flex-wrap justify-center items-center w-min h-fll cursor-pointer">
          <el-image class="w-42px h-42px" src="/images/image-loading.png" />
          <div class="-mt-10px"><strong>动态</strong></div>
        </div>
        <div class="flex flex-wrap justify-center items-center w-min h-fll cursor-pointer">
          <el-image class="w-42px h-42px" src="/images/image-loading.png" />
          <div class="-mt-10px"><strong>热门</strong></div>
        </div>
      </div>
    </div>
    <div ref="mainDiv" class="middle flex-1 flex flex-wrap gap-10px">
      <a
        v-for="(item, index) in WelRoute.middle.slice(0, buttonNum - 1)"
        :key="index"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <el-button v-if="index < buttonNum" :style="`width:${buttonWidth}px`">
          {{ item.label }}
        </el-button>
      </a>
      <a class="w-min" v-if="WelRoute.middle.length > buttonNum">
        <el-popover popper-style="width:fit-content;" placement="bottom">
          <template #reference>
            <el-button :style="`width:${buttonWidth}px`">更多</el-button>
          </template>
          <template #default>
            <div class="flex gap-10px">
              <a
                v-for="(item, index) in WelRoute.middle.slice(
                  buttonNum - 1,
                  WelRoute.middle.length,
                )"
                :key="index"
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <el-button link class="w-50px">{{ item.label }}</el-button>
              </a>
            </div>
          </template>
        </el-popover>
      </a>
    </div>
    <div class="w-300px">
      <div class="w-full flex gap-10px flex-wrap">
        <a v-for="(item, index) in WelRoute.end" :key="index" class="w-80px">
          <el-button link size="large">
            <el-icon>
              <Edit />
            </el-icon>
            {{ item.label }}
          </el-button>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { WelRoute } from './config'
import '@element-plus/icons-vue'

const mainDiv = ref(null)
const buttonNum = ref(0)
const buttonWidth = ref(0.0)
const config = reactive({
  buttonWidth: 0,
  getMainDivWidth() {
    // 动态计算按钮宽度,实现自适应渲染
    buttonNum.value = Math.floor((mainDiv.value.clientWidth / 100) * 2)
    if (buttonNum.value % 2) {
      buttonNum.value -= 1
    }
    buttonWidth.value = Math.floor(mainDiv.value.clientWidth / Math.floor(buttonNum.value / 2) - 10)
  },
})

onMounted(() => {
  config.getMainDivWidth()
  if (mainDiv.value) {
    window.addEventListener('resize', config.getMainDivWidth)
  }
})
onUnmounted(() => {
  if (mainDiv.value) {
    window.removeEventListener('resize', config.getMainDivWidth)
  }
})
</script>

<style lang="scss" scoped>
.routeArea {
  width: 100%;
  display: flex;

  div {
    padding: 5px;
  }
}

.middle {
  border-right: 1px solid #88888850;
}
</style>
