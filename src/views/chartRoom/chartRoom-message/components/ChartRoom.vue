<template>
  <div class="flex-1 flex-wrap">
    <el-scrollbar class="w-full h-[calc(100%-300px)] bg-#303030" height="100%">
      <div class="messageScroll">
        <div v-for="(item, index) in roomMessages" :key="index" class="w-full h-fit flex gap-10px">
          <ChartRightCard
            v-if="item.name === currentUser"
            :user-name="item.name"
            :avatar="item.avatar"
            :message="item.message"
          />

          <ChartLeftCard
            v-else
            :user-name="item.name"
            :avatar="item.avatar"
            :message="item.message"
          />
        </div>
      </div>
    </el-scrollbar>

    <div class="inputArea">
      <div class="inputToolBar">
        <el-icon class="inputToolBarItem"><Picture /></el-icon>
        <el-icon class="inputToolBarItem"><Folder /></el-icon>
      </div>
      <div class="flex-1">
        <textarea v-model="inputText" :autofocus="false" />
      </div>
      <div class="inputButton">
        <el-button @click="handleSend" size="small" type="primary"> 发送</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ChartRightCard, ChartLeftCard } from './components'

import { Picture, Folder } from '@element-plus/icons-vue'
import ChartRightCard from './ChartRightCard.vue'
import ChartLeftCard from './ChartLeftCard.vue'
import { ref } from 'vue'

// 定义 props
const props = defineProps({
  roomMessages: {
    type: Array,
    default: () => [],
  },
  currentUser: {
    type: String,
    default: '',
  },
})

const inputText = ref('')

// 定义 emits
const emits = defineEmits(['send-message', 'update:inputText'])

// 发送消息处理函数
const handleSend = () => {
  emits('send-message', props.inputText)
}
</script>

<style lang="scss" scoped>
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
  //w-full h-300px
  width: 100%;
  height: 300px;
  background-color: #303030;

  border-top: 1px solid #88888850;

  display: flex;
  flex-direction: column;
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
