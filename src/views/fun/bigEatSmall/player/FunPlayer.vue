<template>
  <div ref="playArea" class="main">
    <div ref="player" class="player">
      {{ Math.floor((props.width * (props.width * 0.75)) / 20) }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 50,
  },
})
const width = props.width + 'px'

const playArea = ref()
const playAreaData = reactive({
  clientRect: {},
})
const player = ref()

const handleMouseMove = (e) => {
  const el = player.value

  if (true) {
    const X = e.pageX - playAreaData.clientRect.x - el.clientWidth / 2
    const Y = e.pageY - playAreaData.clientRect.y - el.clientHeight / 2

    el.style.transform = `translate(${X > 0 ? X : 0}px, ${Y > 0 ? Y : 0}px)`
  }
}

onMounted(() => {
  if (playArea.value) {
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
