<template>
  <div class="gamePlace">
    <RpgTopBar />
    <div ref="RpgPlaceRef" class="flex-1">
      <RpgPlayer />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import RpgPlayer from './components/RpgPlayer.vue'
import RpgTopBar from './RpgTopBar.vue'
import { RpgPlace } from './config'

const RpgPlaceRef = ref(null)

onMounted(() => {
  RpgPlace.setPlace(RpgPlaceRef.value.getBoundingClientRect())
})
</script>

<style lang="scss" scoped>
.gamePlace {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
}
</style>
