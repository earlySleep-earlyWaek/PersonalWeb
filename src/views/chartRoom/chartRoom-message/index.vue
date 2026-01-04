<template>
  <DialogList
    @chat-room-changed="handleChatRoomChanged"
    :messageRoomList="ChartRoomMessage.messageRoomList"
  />
  <div v-if="activedChartInfo.id != -1" class="flex-1 flex-wrap bg-#303030">
    <ChartRoom :current-user="userInfo.name" :roomMessages="ChartRoomMessage.roomMessages" />
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
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const userInfo = ref<any>({
  name: userStore.userInfo.username,
})

interface chatRoom {
  id: number
  name: string
  avatar: string
}

const activedChartInfo = ref<chatRoom>({
  id: -1,
  name: '',
  avatar: '',
})

const handleChatRoomChanged = (room: any) => {
  activedChartInfo.value = {
    id: room.id,
    name: room.name,
    avatar: room.avatar,
  }
}
</script>

<style lang="scss" scoped></style>
