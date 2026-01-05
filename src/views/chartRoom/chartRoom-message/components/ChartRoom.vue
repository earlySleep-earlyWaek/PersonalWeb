<template>
  <div class="room-header">
    <div class="room-name">{{ roomInfo.roomName }}</div>
    <div class="room-info">最后的消息: {{ roomInfo.lastMessageTime }}</div>
  </div>
  <div class="flex-1 flex-wrap">
    <!-- 消息显示区域 -->
    <el-scrollbar>
      <div class="message-container">
        <div v-for="(item, index) in messages" :key="index" class="w-full h-fit flex gap-10px">
          <!-- 消息卡片 -->
          <ChatCard
            :message="item"
            :is-own="item.sender === userStore.userInfo.username"
            :user-name="
              item.sender === userStore.userInfo.username
                ? userStore.userInfo.nickname
                : roomInfo.otherUser?.nickname
            "
            :avatar="testImage"
          />
        </div>
      </div>
    </el-scrollbar>

    <!-- 输入区域 -->
    <div class="inputArea">
      <div class="inputToolBar">
        <el-icon class="inputToolBarItem"><Picture /></el-icon>
        <el-icon class="inputToolBarItem"><Folder /></el-icon>
      </div>
      <div class="inputMain">
        <textarea v-model="input" :autofocus="false" />
      </div>
      <div class="inputButton">
        <el-button @click="handleSend" size="small" type="primary"> 发送 </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入依赖
import { Picture, Folder } from '@element-plus/icons-vue'
import ChatCard from './ChatCard.vue'
import { onMounted, ref } from 'vue'
import { chatHistoryApi, ChatMessage } from '@/api/chart-room'
import { testImage } from '../../config'
import { useUserStore } from '@/stores/user'

// 初始化用户存储
const userStore = useUserStore()

// 定义 props
interface Props {
  roomInfo: {
    id: number
    roomName: string
    lastMessageTime: string
    otherUser?: {
      username: string
      nikename: string
    }
  }
}

const props = withDefaults(defineProps<Props>(), {
  roomInfo: () => ({
    id: 0,
    otherUser: undefined,
  }),
})

// 定义 emits
interface Emits {
  (e: 'send-message'): void
  (e: 'update:inputText', value: string): void
}

const emit = defineEmits<Emits>()

// 响应式数据
const input = ref('')
const messages = ref<ChatMessage[]>([])

// 发送消息处理函数
const handleSend = () => {
  if (input.value.trim()) {
    emit('send-message', input.value)
    input.value = '' // 发送后清空输入框
  }
}

// 获取历史消息
const getMessages = async () => {
  try {
    const res = await chatHistoryApi.getChatHistoryByRoom(props.roomInfo.id)
    messages.value = res || []
  } catch (error) {
    console.error('获取历史消息失败:', error)
    messages.value = []
  }
}

// 组件挂载后获取消息
onMounted(() => {
  getMessages()
})
</script>

<style lang="scss" scoped>
.room-header {
  padding: 16px 20px;
  background-color: #303030;
  color: white;
  position: relative;

  .room-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 4px;
  }

  .room-info {
    font-size: 12px;
    color: #aaa;
  }
}

.message-container {
  height: calc(100vh - 280px);
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
  box-shadow:
    -8px 0 8px -8px rgba(0, 0, 0, 1) inset,
    8px 0 8px -8px rgba(0, 0, 0, 1) inset,
    0 -8px 8px -8px rgba(0, 0, 0, 1) inset,
    0 8px 8px -8px rgba(0, 0, 0, 1) inset;
}

.messageScroll {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  flex: 1 1 0%;
  height: 100%;

  box-sizing: border-box;
  padding: 20px;
}

.message {
  display: flex;
  flex-direction: column;

  justify-content: end;
}

.messageName {
  color: #888;
}

.messageBubble {
  box-sizing: border-box;
  padding: 8px;
  background-color: #ccc;

  border-radius: 8px;
  margin-top: 5px;

  height: fit-content;
}

.inputArea {
  width: 100%;
  background-color: #303030;
  display: flex;
  flex-direction: column;
}

.inputMain {
  flex: 1;
  display: flex;
  min-height: 0; /* 确保flex子项可以收缩 */

  > textarea {
    flex: 1;
    resize: none;
  }
}

.inputToolBar {
  display: flex;
  gap: 10px;

  box-sizing: border-box;
  padding: 5px;

  .inputToolBarItem {
    cursor: pointer;

    color: #fff;
    font-size: 22px;

    transition: 0.2s;
    &:hover {
      color: #2bbbbb;
    }
  }
}

textarea {
  width: 100%;
  height: 100%;

  background-color: transparent;

  border: none;
  padding: 10px;

  font-size: 22px;
  color: #fff;

  resize: none;
  outline: none; /* 取消聚焦时的默认轮廓 */
  box-sizing: border-box;

  font-family: 'SimHei', 'Microsoft YaHei', 'Heiti SC', '黑体', sans-serif;

  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #3a3a3a;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #5a5a5a;
    border-radius: 3px;

    &:hover {
      background: #7a7a7a;
    }
  }
}

.inputButton {
  // w-full flex justify-end
  width: 100%;

  display: flex;
  justify-content: end;

  box-sizing: border-box;
  padding: 10px;
}
</style>
