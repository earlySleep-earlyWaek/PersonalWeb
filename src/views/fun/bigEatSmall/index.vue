<template>
  <div>
    <div class="topBar">
      <div class="w-33% flex gap-10px items-center c-#333">
        <span>生成速度:</span>
        <el-input
          :disabled="config.starting"
          class="w-60px"
          v-model="config.createSpeed"
          placeholder="生成速度"
        />
        <span>玩家大小:</span>
        <el-input
          :disabled="config.starting"
          class="w-60px"
          v-model="config.playerSize"
          placeholder="生成速度"
        />
      </div>
      <div class="w-33% flex justify-center gap-10px">
        <el-tag size="large" type="success">分数:{{ config.point }}</el-tag>
        <el-tag size="large" type="warning">时间:{{ config.timer }}s</el-tag>
      </div>
      <div class="w-33% flex justify-end">
        <el-button @click="config.ruleDia()" type="default"> 规则 </el-button>
        <el-button :type="config.starting ? 'danger' : 'success'" @click="config.handleGameStart()">
          {{ config.starting ? '结束' : '开始' }}
        </el-button>
      </div>
    </div>
    <div ref="PlayAreaRef" class="main">
      <FunPlayer :width="Number(config.playerSize)" class="z-100" />
      <FunEnemy
        @gameover="config.handleGameOver()"
        @ated="config.handleAte()"
        class="z-10"
        :width="Number(item.width)"
        :direction="item.direction"
        :position="item.position"
        v-for="item in enemyList"
      />
    </div>
  </div>

  <el-dialog v-model="config.pointDia" width="450px" :show-close="false">
    <div class="text-center font-600 c-red font-size-45px">游戏结束</div>
    <div class="text-center font-300 c-green font-size-18px">最终得分:{{ config.point }}分</div>
    <div class="text-center font-300 c-yellow font-size-18px">生存时间:{{ config.timer }}秒</div>
  </el-dialog>
</template>

<script setup>
import FunPlayer from './player/FunPlayer.vue'
import FunEnemy from './enemy/FunEnemy.vue'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { DivKiller, funPlayArea } from './config'

const config = reactive({
  point: 0,
  starting: false,
  pointDia: false,
  createSpeed: 300,
  timer: 0,
  playerSize: 100,

  handleAte() {
    this.point += 5
  },
  handleGameStart() {
    if (!this.starting) {
      this.point = 0
      this.starting = true
      DivKiller.status = !DivKiller.status
      setTimeout(() => {
        this.Timer()
        addEnemy()
      }, 3000)
    } else {
      this.starting = false
      DivKiller.status = !DivKiller.status
    }
  },
  handleGameOver() {
    this.starting = !this.starting
    this.showPointDia()
  },
  showPointDia() {
    this.pointDia = !this.pointDia
  },
  ruleDia() {
    this.showPointDia()
  },
  Timer() {
    this.timer += 1
    if (this.starting) {
      setTimeout(() => this.Timer(), 1000)
    }
  },
})

const PlayAreaRef = ref()
const enemyList = ref([])

const addEnemy = () => {
  const flag = Math.random()
  let w = Math.floor(Math.random() * 50 + 75)
  let p = 0
  let d = 0

  const positionY = Math.floor(
    Math.random() * (funPlayArea.bottom - w * 0.75 * 0.5) + funPlayArea.top,
  )

  if (flag < 0.5) {
    p = [-w, positionY]
    d = '右'
  } else {
    p = [funPlayArea.right + w, positionY]
    d = '左'
  }

  const enemyData = {
    width: w,
    position: p,
    direction: d,
  }

  enemyList.value.push(enemyData)
  if (config.starting) {
    setTimeout(() => addEnemy(), config.createSpeed)
  }
}

onMounted(() => {
  if (PlayAreaRef.value) {
    const ClientRect = PlayAreaRef.value.getBoundingClientRect()
    funPlayArea.left = ClientRect.left
    funPlayArea.right = ClientRect.right
    funPlayArea.top = ClientRect.top
    funPlayArea.bottom = window.screen.availHeight - 81
  }
})

onUnmounted(() => {})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: calc(100vh - 81px);
  cursor: none;
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
