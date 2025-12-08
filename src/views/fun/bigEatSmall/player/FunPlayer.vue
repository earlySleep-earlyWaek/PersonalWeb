<template>
  <div ref="playArea" class="main">
    <div ref="player" class="player">玩家</div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

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
    console.log(playAreaData.clientRect)

    window.addEventListener('mousemove', handleMouseMove)
  }
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  cursor: pointer;

  position: relative;

  .player {
    --width-: 120px;
    width: var(--width-);
    height: calc(var(--width-) * (9 / 16));

    background-color: green;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
