<template>
  <el-scrollbar class="bg-dark" height="100%">
    <div class="w-350px h-full flex flex-wrap">
      <div
        class="messageRoom"
        v-for="(item, index) in rooms"
        :key="index + 'a'"
        @click="handleItemClick(index, item)"
        :style="activitedStyle(index)"
      >
        <el-avatar :size="50" :src="testImage" />

        <div class="flex-1 h-full">
          <div class="h-50% messageRoomTitle">
            {{ item.otherUser.nickname }}
          </div>
          <div class="h-50% messageRoomText">
            {{ item.lastMessage }}
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { chatRoomApi } from '@/api/chart-room'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import { testImage } from '../../config'
const userStore = useUserStore()

const rooms = ref([])
const getRooms = async () => {
  const res = await chatRoomApi.getRoomsByUserId(userStore.userInfo.userId)
  rooms.value = res.data
  console.log(res)
}

onMounted(() => getRooms())

// 定义 emits
const emits = defineEmits(['chatRoomChanged'])

// 响应式数据
const activited = ref(-1)

// 点击处理函数
const handleItemClick = (index, item) => {
  activited.value = index
  emits('chatRoomChanged', item)
}

// 样式计算函数
const activitedStyle = (index) => {
  return activited.value == index ? 'background:#ffffff30;' : ''
}
</script>

<style lang="scss" scoped>
.messageRoom {
  width: 100%;
  height: 80px;
  border-radius: 8px;

  box-sizing: border-box;
  padding: 10px;

  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;

  transition: 0.2s;
  &:hover {
    background-color: #ffffff30;
  }
}

.messageRoomTitle {
  color: #fff;
  font-size: 15px;
  font-weight: 600;
}

.messageRoomText {
  color: #888;
}
</style>
