<template>
  <div class="bg">
    <StarBackgroud />
  </div>
  <div class="center_box">
    <div class="flex flex-wrap justify-center">
      <div class="w-full flex justify-center p-25px">
        <el-image class="image w-full" src="images/image-loading.png" />
      </div>
      <div class="w-full flex justify-center c-#fff">
        <strong class="title">王某人的个人网站</strong>
      </div>
      <div class="load"></div>

      <div class="w-full flex justify-center mt-30px">
        <router-link to="/home/welcome">
          <el-button class="start" link type="primary" :disabled="config.start">点击进入</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import StarBackgroud from './commounts/StarBackgroud.vue'
const config = reactive({
  start: true,
})

const timeoutRoute = async () => {
  setTimeout(() => {
    config.start = false
  }, 2000)
}
onMounted(() => {
  timeoutRoute()
})
</script>

<style lang="scss" scoped>
.bg {
  position: fixed;
  z-index: -1;

  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.center_box {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  --image-size: 128px;
  height: var(--image-size);
  width: var(--image-size);
  animation: spin 1.5s linear forwards;
}

.title {
  animation: fontColor 2s linear infinite;
}

.load {
  width: 256px;

  &::after {
    content: '';
    color: #fff;

    display: flex;
    justify-content: center;

    position: absolute;
    width: inherit;
    height: 25px;
    background: #18cbf8;
    transform-origin: left center; /* 从左侧开始缩放 */
    animation: loading 1.5s linear forwards;
  }
}

.start {
  animation: startFont 1s linear infinite;
  animation-delay: 1.5s;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading {
  0% {
    transform: scaleX(0); /* 初始宽度0 */
    content: '';
  }
  99% {
    content: '';
  }
  100% {
    transform: scaleX(1); /* 宽度100% */
    content: '加载完成';
  }
}

@keyframes fontColor {
  0% {
    color: red;
  }
  25% {
    color: yellow;
  }
  75% {
    color: blue;
  }
  100% {
    color: red;
  }
}

@keyframes startFont {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
