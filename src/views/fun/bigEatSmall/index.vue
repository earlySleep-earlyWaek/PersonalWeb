<template>
  <div>
    <div class="topBar">
      <div class="w-33% flex"></div>
      <div class="w-33% flex justify-center">
        <el-tag size="large" type="success">分数:{{ 1111111 }}</el-tag>
      </div>
      <div class="w-33% flex justify-end">
        <el-button type="default"> 规则 </el-button>
        <el-button :type="config.starting ? 'danger' : 'success'" @click="handleGameStart()">
          {{ config.starting ? '结束' : '开始' }}
        </el-button>
      </div>
    </div>
    <div ref="PlayAreaRef" class="main">
      <FunPlayer :width="200" class="z-100" />
      <FunEnemy class="z-10" :width="item.width" v-for="item in enemyList" />
    </div>
  </div>
</template>

<script setup>
import FunPlayer from './player/FunPlayer.vue'
import FunEnemy from './enemy/FunEnemy.vue'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { funPlayArea } from './config'

const config = reactive({
  starting: false,
  handleStatusChange() {
    this.starting = !this.starting
  },
})

const PlayAreaRef = ref()
const enemyList = ref([])

const addEnemy = () => {
  const enemyData = {
    width: Math.floor(Math.random() * 200 + 50),
  }
  enemyList.value.push(enemyData)
  if (config.starting) {
    setTimeout(() => addEnemy(), 2000)
  }
}

const handleGameStart = () => {
  if (!config.starting) {
    setTimeout(() => addEnemy(), 2000)
  }
  config.handleStatusChange()
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

onUnmounted(() => {})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  // cursor: none;

  box-shadow: inset 5px 5px 5px black;
}
.topBar {
  box-sizing: border-box;
  padding: 5px;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  background-color: #00000010;
  border-bottom: 2px #888888 solid;
  box-shadow: 0 5px 5px black;
}
</style>
