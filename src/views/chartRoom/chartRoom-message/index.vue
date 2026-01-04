<template>
  <DialogList :messageRoomList="ChartRoomMessage.messageRoomList" />
  <ChartRoom v-if="false" :roomMessages="ChartRoomMessage.roomMessages" />
  <div v-else class="flex-1 flex justify-center items-center bg-#303030">
    <h3 class="c-#ccc font-900 font-size-72px">Welcome</h3>
  </div>
</template>

<script setup>
import { ChartRoomMessage } from '../config'
import DialogList from './components/DialogList.vue'
import ChartRoom from './components/ChartRoom.vue'
</script>

<style lang="scss" scoped></style>
