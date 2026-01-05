<template>
  <DialogList
    @chat-room-changed="handleChatRoomChanged"
  />
  <div v-if="activedRoomInfo.id != -1" class="flex-1 flex-wrap bg-#303030">
    <ChartRoom :room-info="activedRoomInfo" />
  </div>

  <div v-else class="flex-1 flex justify-center items-center bg-#303030">
    <h3 class="c-#ccc font-900 font-size-72px">Welcome</h3>
  </div>
</template>

<script lang="ts" setup>
import { ChartRoomMessage } from '../config'
import DialogList from './components/DialogList.vue'
import ChartRoom from './components/ChartRoom.vue'
import { ref } from 'vue'

interface chatRoom {
  id: number
  roomName: string
  otherUser: any
}

const activedRoomInfo = ref<chatRoom>({
  id: -1,
  roomName: '',
  otherUser: {},
})

const handleChatRoomChanged = (room: any) => {
  activedRoomInfo.value.id = room.id
  activedRoomInfo.value.roomName = room.roomName
  activedRoomInfo.value.otherUser = room.otherUser
}
</script>

<style lang="scss" scoped></style>
