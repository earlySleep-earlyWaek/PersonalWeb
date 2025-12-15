<template>
  <div ref="playerRef" class="player"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RpgPlayerController } from '../functions/playerController'

const playerRef = ref(null)

onMounted(() => {
  RpgPlayerController.setPlayer(playerRef.value)
})
</script>

<style lang="scss" scoped>
.player {
  position: relative;
  width: 50px;
  height: 50px;

  background-color: #000;
}
</style>
