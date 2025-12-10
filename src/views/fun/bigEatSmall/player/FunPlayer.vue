<template>
  <div ref="playArea" class="main">
    <div ref="player" class="player">
      {{ size }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { bsGetSize, bsPlayer } from '../config'

const props = defineProps({
  width: {
    type: Number,
    default: 50,
  },
})
const width = props.width + 'px'
let helfWidth = props.width / 2
let helfHeight = props.width * 0.375
const size = ref()

const playArea = ref()
const playAreaData = reactive({
  clientRect: {},
})
const player = ref()

const handleMouseMove = (e) => {
  const el = player.value

  let X = e.pageX - el.clientWidth / 2
  let Y = e.pageY - el.clientHeight / 2

  let moveX = X > playAreaData.clientRect.x ? X - playAreaData.clientRect.x : 0
  let moveY = Y > playAreaData.clientRect.y ? Y - playAreaData.clientRect.y : 0

  X = X > playAreaData.clientRect.x ? X : 0

  // 保存玩家位置信息
  bsPlayer.topLeft = [X, Y]
  bsPlayer.topRight = [X + el.clientWidth, Y]
  bsPlayer.bottomLeft = [X, Y + el.clientHeight]
  bsPlayer.bottomRight = [X + el.clientWidth, Y + el.clientHeight]

  el.style.transform = `translate(${moveX}px, ${moveY}px)`
}

window.addEventListener('click', (e) => {
  console.log([e.pageX, e.pageY])
  console.log(bsPlayer.topLeft)
  console.log(JSON.parse(JSON.stringify(bsPlayer)))
})

onMounted(() => {
  if (playArea.value) {
    size.value = bsGetSize(props.width)
    bsPlayer.size = size.value
    playAreaData.clientRect = playArea.value.getBoundingClientRect()
    window.addEventListener('mousemove', handleMouseMove)
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  cursor: pointer;

  position: fixed;
}
.player {
  --width-: v-bind(width);
  width: var(--width-);
  height: calc(var(--width-) * 0.75);

  background-color: green;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 5px 2px black;
}
</style>
