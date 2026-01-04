<template>
  <el-scrollbar class="bg-dark" height="100%">
    <div class="w-350px h-full flex flex-wrap">
      <div
        class="messageRoom"
        v-for="(item, index) in messageRoomList"
        :key="item.id"
        @click="handleItemClick(index, item)"
        :style="activitedStyle(index)"
      >
        <el-avatar :size="50" :src="item.avatar" />

        <div class="flex-1 h-full">
          <div class="h-50% messageRoomTitle">
            {{ item.name }}
          </div>
          <div class="h-50% messageRoomText">
            {{ item.message }}
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { ref } from 'vue'

// 定义 props
const props = defineProps({
  messageRoomList: {
    type: Array,
    default: () => [],
  },
  activeIndex: {
    type: Number,
    default: null,
  },
})

// 定义 emits
const emits = defineEmits(['itemClick'])

// 响应式数据
const activited = ref(props.activeIndex)

// 点击处理函数
const handleItemClick = (index, item) => {
  activited.value = index
  emits('itemClick', index, item)
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
