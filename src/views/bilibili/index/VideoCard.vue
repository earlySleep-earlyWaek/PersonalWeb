<!-- 视频播放卡片 -->

<!-- 关键数据暂时写死,待完成 -->
<template>
  <div ref="mainDiv" class="main" :style="`height:${width * 0.85}px`">
    <a>
      <div class="videoCover" @mouseenter="config.videoStart()" @mouseleave="config.videoEnd()">
        <div class="w-full" :style="`height:${imgHeight}px`">
          <el-image
            class="h-full w-full rounded-8px"
            v-show="!config.videoShow"
            src="/images/test.png"
            fit="cover"
          />

          <video
            class="h-full w-full rounded-8px"
            v-show="config.videoShow"
            src="/videos/test.mp4"
            ref="videoRef"
            preload="auto"
            muted
            loop
            :controls="false"
          >
            您的浏览器不支持 video 标签
          </video>
        </div>
      </div>
    </a>
    <div :style="`height:${textHeight}px`">
      <a>
        <div class="text p-5px w-fit">雾子solo雾子</div>
      </a>
      <a>
        <div class="text font-size-13px c-#888 flex p-5px">
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
const imgHeight = ref()
const textHeight = ref()
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
  async videoEnd() {
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
    imgHeight.value = mainDiv.value.clientWidth * (9 / 16)
    textHeight.value = mainDiv.value.clientWidth * (6 / 16)
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
}

.text {
  transition: 0.1s;
  &:hover {
    color: rgb(0, 153, 255);
  }
}
</style>
