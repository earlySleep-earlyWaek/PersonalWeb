<template>
  <!-- Canvas 容器，占满父元素 -->
  <canvas ref="starCanvas" class="star-sky" :width="canvasWidth" :height="canvasHeight"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, reactive } from 'vue'

// Canvas 元素引用
const starCanvas = ref(null)
// Canvas 尺寸（响应式）
const canvasWidth = ref(0)
const canvasHeight = ref(0)
// 星星数组和动画帧ID（用于销毁）
let stars = []
let animationId = null

// 星星配置（可通过 props 传入，这里先写死）
const config = reactive({
  numStars: 800, // 星星数量
  baseSpeed: 0.005, // 基础闪烁速度
})

// 星星类
class Star {
  constructor() {
    this.x = Math.random() * canvasWidth.value
    this.y = Math.random() * canvasHeight.value
    this.radius = Math.random() * 1.5 + 0.3 // 星星大小
    this.opacity = Math.random() // 初始透明度
    this.fadeSpeed = Math.random() * config.baseSpeed + 0.001 // 闪烁速度
    this.direction = Math.random() > 0.5 ? 1 : -1 // 闪烁方向
  }

  // 绘制星星
  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.fill()
  }

  // 更新星星状态（闪烁）
  update(ctx) {
    this.opacity += this.fadeSpeed * this.direction
    // 边界反转
    if (this.opacity > 1 || this.opacity < 0) {
      this.direction *= -1
      this.opacity = Math.max(0, Math.min(1, this.opacity))
    }
    this.draw(ctx)
  }
}

// 初始化星星
function initStars() {
  stars = []
  const ctx = starCanvas.value?.getContext('2d')
  if (!ctx) return

  for (let i = 0; i < config.numStars; i++) {
    stars.push(new Star())
  }
}

// 动画循环
function animate() {
  const ctx = starCanvas.value?.getContext('2d')
  if (!ctx) return

  // 清空画布
  ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
  // 更新所有星星
  stars.forEach((star) => star.update(ctx))
  // 持续动画
  animationId = requestAnimationFrame(animate)
}

// 适配窗口大小
function resizeCanvas() {
  if (starCanvas.value) {
    canvasWidth.value = starCanvas.value.offsetWidth
    canvasHeight.value = starCanvas.value.offsetHeight
    // 解决Canvas模糊问题（高清屏适配）
    const dpr = window.devicePixelRatio || 1
    starCanvas.value.width = canvasWidth.value * dpr
    starCanvas.value.height = canvasHeight.value * dpr
    const ctx = starCanvas.value.getContext('2d')
    ctx.scale(dpr, dpr)
  }
  initStars() // 重置星星位置
}

// 生命周期：挂载后初始化
onMounted(() => {
  if (starCanvas.value) {
    resizeCanvas()
    animate()
    // 监听窗口大小变化
    window.addEventListener('resize', resizeCanvas)
  }
})

// 生命周期：卸载前销毁资源
onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  cancelAnimationFrame(animationId) // 停止动画循环
  stars = [] // 清空星星数组
})
</script>

<style scoped>
.star-sky {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000; /* 深空底色 */
  pointer-events: none; /* 避免遮挡页面交互 */
}
</style>
