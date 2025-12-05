<template>
  <div ref="mainDiv" class="main" :style="`height:${width * 0.85}px`">
    <a>
      <div class="videoCover" @mouseenter="config.videoStart()" @mouseleave="config.videoEnd()">
        <el-image
          v-show="!config.videoShow"
          lazy
          class="media el-image"
          :style="`height:${width * (9 / 16)}px`"
          fit="cover"
          src="/images/test.png"
        />

        <video
          v-show="config.videoShow"
          ref="videoRef"
          src="/videos/test.mp4"
          class="media"
          :style="`height:${width * (9 / 16)}px`"
          preload="auto"
          muted
          loop
          :controls="false"
        >
          您的浏览器不支持 video 标签
        </video>
      </div>
    </a>
    <div class="p-5px -mt-10px">
      <a>
        <div class="text w-fit">雾子solo雾子</div>
      </a>
    </div>

    <div class="fixed bottom-0px p-5px">
      <a>
        <div class="text font-size-13px c-#888 flex">
          <div>作者</div>
          <div>2025年12月5日</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, reactive, ref } from 'vue'

const mainDiv = ref(null)
const width = ref(0)
const videoRef = ref(null)

const video = videoRef

const config = reactive({
  videoShow: false,
  async videoStart() {
    config.videoShow = true

    await nextTick()
    if (!videoRef.value) return

    try {
      await videoRef.value.play()
    } catch (err) {
      config.videoShow = false
    }
  },
  videoEnd() {
    if (videoRef.value) {
      videoRef.value.pause()
      videoRef.value.currentTime = 0
      config.videoShow = false
    }
  },
})

onMounted(() => {
  if (mainDiv.value) {
    width.value = mainDiv.value.clientWidth
  }
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  transform: scale(1);
  box-sizing: border-box;
}

.videoCover {
  position: relative;
  width: 100%;
  /* 确保容器高度稳定（与内联样式配合），避免切换时跳动 */
  .media {
    border-radius: 8px;
  }
  .el-image {
    /* el-image 内部类名可能不同，这里确保圆角 */
    border-radius: 8px;
  }
}

.text {
  transition: 0.1s;
  &:hover {
    color: rgb(0, 153, 255);
  }
}
</style>
