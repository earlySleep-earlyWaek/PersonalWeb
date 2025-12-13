<template>
  <div ref="BossRef" class="boss" :style="config.bossStyle">{{ config.width }}</div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { DivKiller, DivKillerCollisionDet, DivKillerPlayer, funPlayArea } from '../config'

const BossRef = ref(null)
const config = reactive({
  width: 0,
  speed: 5,
  bossStyle: '',
  position: [],

  init() {
    this.width = Number(DivKillerPlayer.size) * 1.1

    this.bossStyle = `width:${this.width}px;height:${this.width * 0.75}px`
  },
  move() {
    // 1. 获取BOSS和玩家的中心坐标（你原有的坐标逻辑）
    let ClientRect = BossRef.value.getBoundingClientRect()
    let [bossX, bossY] = [ClientRect.left + this.width / 2, ClientRect.top + this.width * 0.325]
    const [playerX, playerY] = [
      DivKillerPlayer.topLeft[0] + Number(DivKillerPlayer.size) / 2,
      DivKillerPlayer.topLeft[1] + Number(DivKillerPlayer.size) * 0.325,
    ]

    // 2. 计算方向差值
    const dx = playerX - bossX
    const dy = playerY - bossY

    // 3. 计算距离（避免除以0）
    const distance = Math.sqrt(dx * dx + dy * dy)
    // if (distance < 10) return // 距离过近时停止移动（避免抖动）

    // 4. 归一化方向向量 + 按速度计算步进值
    const moveX = (dx / distance) * this.speed
    const moveY = (dy / distance) * this.speed

    // 5. 更新BOSS位置
    bossX += moveX
    bossY += moveY

    // 6. 应用新位置到DOM（关键：需设置BOSS的定位方式为absolute/fixed）
    BossRef.value.style.position = 'absolute' // 确保定位生效
    BossRef.value.style.left = `${bossX - this.width / 2}px` // 修正中心偏移
    BossRef.value.style.top = `${bossY - this.width * 0.325}px`

    ClientRect = BossRef.value.getBoundingClientRect()

    const bossPos = {
      topLeft: [ClientRect.left, ClientRect.top],
      topRight: [ClientRect.left + this.width, ClientRect.top],
      bottomLeft: [ClientRect.left, ClientRect.top + this.width * 0.75],
      bottomRight: [ClientRect.left + this.width, ClientRect.top + this.width * 0.75],
    }

    if (DivKiller.status) {
      if (DivKillerCollisionDet(bossPos)) {
        emits('gameover')
      } else if (DivKiller.status) {
        setTimeout(() => this.move(), 25)
      }
    }
  },
})

const emits = defineEmits(['gameover'])
const startMove = () => {
  BossRef.value.style.top = funPlayArea.top + 'px'
  BossRef.value.style.left = funPlayArea.left + 'px'
  config.move()
}

onMounted(() => {
  config.init()
})

defineExpose({
  startMove,
})
</script>

<style lang="scss" scoped>
.boss {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 32px;

  animation: backColor 2s linear infinite;

  background-color: rgb(0, 255, 0);
  box-shadow: 0px 5px 5px black;
}

@keyframes backColor {
  0% {
    color: rgb(0, 0, 0);
  }
  50% {
    color: rgb(255, 255, 255);
  }
  100% {
    color: rgb(0, 0, 0);
  }
}
</style>
