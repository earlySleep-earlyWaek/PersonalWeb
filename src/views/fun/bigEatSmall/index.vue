<template>
  <div>
    <div class="h-50px">
      <el-button @click="handleGameStart()">开始</el-button>
    </div>
    <div ref="PlayAreaRef" class="main">
      <FunPlayer />
      <FunEnemy v-for="item in enemyList" />
    </div>
  </div>
</template>

<script setup>
import FunPlayer from './player/FunPlayer.vue'
import FunEnemy from './enemy/FunEnemy.vue'
import { onMounted, ref } from 'vue'
import { funPlayArea } from './config'

const PlayAreaRef = ref()

const enemyList = ref([])

const enemyCount = 999
const addEnemy = () => {
  enemyList.value.push([''])

  if (enemyList.value.length < enemyCount)
    setTimeout(() => {
      addEnemy()
    }, 2000)
}

const handleGameStart = () => {
  addEnemy()
}

onMounted(() => {
  if (PlayAreaRef.value) {
    const ClientRect = PlayAreaRef.value.getBoundingClientRect()
    funPlayArea.left = ClientRect.left
    funPlayArea.right = ClientRect.right
    funPlayArea.top = ClientRect.top
    funPlayArea.bottom = ClientRect.bottom
  }
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
