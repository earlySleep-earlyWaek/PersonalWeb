<!-- 轮播图区域 -->

<template>
  <div class="w-full flex">
    <div class="carouselBox">
      <el-carousel height="450px" trigger="click">
        <el-carousel-item class="carousel_item" v-for="item in MainTop.carousel" :key="item">
          <div class="w-full h-full cursor-pointer">
            <div class="h-full">
              <el-image fit="cover" class="w-full h-full" :src="item.img" />
            </div>
            <div class="text">
              <p>
                <strong>{{ item.label }}</strong>
              </p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="rightArea">
      <div class="item" v-for="item in MainTop.right">
        <VideoCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { MainTop } from './config'
import VideoCard from './index/VideoCard.vue'

const mainBox = ref(0)
const height = ref('')

onMounted(() => {
  height.value = mainBox.value.clientHeight + 'px'
})
</script>

<style lang="scss" scoped>
.carouselBox {
  width: 40%;
  padding-right: 10px;
  box-sizing: border-box;
  .el-carousel {
    border-radius: 8px;
  }
}
.carousel_item {
  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    position: fixed;
    bottom: 0px;
    height: 80px;
    padding: 10px;
    color: #fff;
    font-size: 32px;
    font: 900;
  }
}

.rightArea {
  width: 60%;

  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .item {
    width: calc(33% - 6px);
  }
}
</style>
