<!-- 游戏中心 -->

<template>
  <div class="main">
    <div ref="leftRef" class="left">
      <el-image class="w-full !h-120px" fit="cover" src="/images/a.png" />
      <div class="w-full flex gap-10px">
        <div ref="leftBottomItem" v-for="item in 3" class="w-33% h-full">
          <el-image src="/images/a.png" />
          <div>
            {{ '游戏一号游戏一号'.slice(0, 5) }}
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="right">
      <div class="font-size-18px h-30px">新游预告</div>
      <a>
        <div v-for="item in 7" class="gameText">游戏</div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const height = ref()

onMounted(async () => {})
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  gap: 10px;

  box-sizing: border-box;
  padding: 10px;
}
.left {
  width: 200px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.line {
  border-right: 1px solid #88888850;
}
.right {
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 0px;
}
.gameText {
  box-sizing: border-box;
  padding: 5px;
  border-radius: 4px;
  width: 100%;
  height: 30px;

  &:hover {
    background: #88888850;
  }
}
</style>
