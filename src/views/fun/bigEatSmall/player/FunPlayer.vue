<template>
  <div ref="playArea" class="main">
    <div ref="player" class="player">
      {{ props.width }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { DivKillerGetSize, DivKillerPlayer } from '../config'

const props = defineProps({
  width: {
    type: Number,
    default: 50,
  },
})

const width = ref()
const size = ref()
width.value = props.width + 'px'

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
  DivKillerPlayer.topLeft = [X, Y]
  DivKillerPlayer.topRight = [X + el.clientWidth, Y]
  DivKillerPlayer.bottomLeft = [X, Y + el.clientHeight]
  DivKillerPlayer.bottomRight = [X + el.clientWidth, Y + el.clientHeight]

  el.style.transform = `translate(${moveX}px, ${moveY}px)`
}

// const handleClick = (e) => {
//   console.log([e.pageX, e.pageY])
// }

onMounted(() => {
  if (playArea.value) {
    size.value = DivKillerGetSize(props.width)
    DivKillerPlayer.size = props.width
    playAreaData.clientRect = playArea.value.getBoundingClientRect()
    window.addEventListener('mousemove', handleMouseMove)

    // window.addEventListener('click', handleClick)
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})

watch(
  () => props.width,
  () => {
    width.value = props.width + 'px'
    DivKillerPlayer.size = props.width
  },
)
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
  font-size: larger;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 5px 2px black;
}
</style>
