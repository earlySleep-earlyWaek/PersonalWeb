<template>
  <div class="main">
    <div class="topBar">
      <div class="w-33% flex gap-10px items-center c-#333">
        <span>时长:</span>
        <el-input
          :disabled="starting"
          class="w-60px"
          v-model="config.time"
          placeholder="游戏时长"
        />
        <span>初始速度:</span>
        <el-input
          :disabled="starting"
          class="w-60px"
          v-model="config.speed"
          placeholder="游戏时长"
        />
        <span>最小面积:</span>
        <el-input :disabled="starting" class="w-60px" v-model="minSize" placeholder="游戏时长" />
      </div>
      <div class="w-33% flex justify-center gap-10px">
        <el-tag size="large" type="success">得分:{{ Math.floor(point) }}</el-tag>
        <el-tag size="large" type="warning"
          >速度:{{
            starting ? (speed / 1000).toFixed(2) : (config.speed / 1000).toFixed(2)
          }}s/个</el-tag
        >
        <el-tag size="large" type="danger"> 剩余时间:{{ starting ? time : config.time }}s </el-tag>
      </div>
      <div class="w-33% flex justify-end">
        <el-button @click="config.dia = true">规则</el-button>
        <el-button
          :type="starting ? 'danger' : 'success'"
          @click="starting ? endGame() : startGame()"
        >
          {{ starting ? '停止' : '开始' }}
        </el-button>
      </div>
    </div>

    <div ref="gameRef" class="gamePlace">
      <FunCircle
        v-for="(item, index) in circleList"
        :key="index"
        :x="item.x"
        :y="item.y"
        :radious="item.radious"
        :point="item.point"
        :time="item.time"
        :speed="speed"
        @clicked="handleClick"
      />
    </div>
  </div>

  <el-dialog v-model="config.dia" :show-close="false" width="500px">
    <el-input type="textarea" v-model="config.rule" :disabled="true" />
  </el-dialog>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import FunCircle from './components/FunCircle.vue'

const config = reactive({
  time: 60,
  speed: 1000,
  dia: false,
  rule: `左边是参数设置,中间是积分显示和计时器,右边是功能按钮\n开始游戏后,点击出现的〇`,
})

const gameRef = ref(null)
const height = ref()
const width = ref()
const circleList = ref([])

const speed = ref()
let radious = 100
const minSize = ref(50)
const time = ref()
const point = ref(0)

const starting = ref(false)

const timer = () => {
  time.value--
  if (time.value > 0) {
    setTimeout(() => timer(), 1000)
  }
}

const addCircle = () => {
  setTimeout(() => {
    const x = Math.floor(Math.random() * (width.value - 100 * 2) + 100)
    const y = Math.floor(Math.random() * (height.value - 100 * 2) + 100)
    const rad = Math.floor(Math.random() * radious) + Number(minSize.value)
    const point = (2 - speed.value / 1000) * (radious + Number(minSize.value) - rad) * 0.1

    console.log(point)

    circleList.value.push({
      x: x,
      y: y,
      radious: rad,
      point: point,
      time: time.value,
    })

    if (time.value > 0) {
      if (radious > 30) {
        radious -= 3
      }
      if (speed.value > 500) {
        speed.value -= 10
      }
      addCircle()
    } else {
      starting.value = false
    }
  }, speed.value)
}

const startGame = () => {
  starting.value = true
  speed.value = config.speed
  radious = 100
  time.value = config.time
  point.value = 0
  timer()
  addCircle()
}

const endGame = () => {
  time.value = 1
}

const handleClick = (p) => {
  point.value += p
}

onMounted(() => {
  width.value = gameRef.value.clientWidth
  height.value = gameRef.value.clientHeight

  time.value = config.time
  speed.value = config.speed
})

watch(starting, () => {
  if (starting.value) {
    gameRef.value.style.boxShadow = 'inset 0 0 50px rgba(0, 255, 0, 0.5)'
  } else {
    gameRef.value.style.boxShadow = 'inset 0 0 50px rgba(0, 0, 0, 0.5)'
  }
})

watch(time, () => {
  if (time.value == 30) {
    gameRef.value.style.boxShadow = 'inset 0 0 50px rgba(255, 255, 0, 0.5)'
  } else if (time.value == 10) {
    gameRef.value.style.boxShadow = 'inset 0 0 50px rgba(255, 0, 0, 0.5)'
  }
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;

  .gamePlace {
    position: relative;
    flex: 1;

    transition: 1s;

    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
  }
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
