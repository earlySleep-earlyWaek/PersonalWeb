<template>
  <el-scrollbar class="bg-dark" height="100%">
    <div class="w-350px h-full flex flex-wrap">
      <div
        class="messageRoom"
        v-for="(item, index) in ChartRoomMessage.messageRoomList"
        @click="config.changeActivited(index)"
        :style="config.activitedStyle(index)"
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
  <div class="flex-1 flex-wrap">
    <el-scrollbar class="w-full h-[calc(100%-300px)] bg-#303030" height="100%">
      <div class="messageScroll">
        <div
          v-for="(item, index) in ChartRoomMessage.roomMessages"
          class="w-full h-fit flex gap-10px"
        >
          <ChartRightCard
            v-if="item.name == ChartRoomMessage.userInfo.userName"
            :user-name="item.name"
            :avatar="item.avatar"
            :message="item.message"
          />

          <ChartLeftCard
            v-else-if="item.name != ChartRoomMessage.userInfo.userName"
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
        <textarea v-model="config.textarea" :autofocus="false" />
      </div>
      <div class="inputButton">
        <el-button @click="config.sendMessage()" size="small" type="primary"> 发送</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ChartRoomMessage } from '../config'
import { Folder, Picture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import ChartLeftCard from './components/ChartLeftCard.vue'
import ChartRightCard from './components/ChartRightCard.vue'

const config = reactive({
  activited: null,
  textarea: '',
  changeActivited(index) {
    this.activited = index
  },
  activitedStyle(index) {
    return this.activited == index ? 'background:#ffffff30;' : ''
  },
  sendMessage() {
    ElMessage.success(this.textarea)
  },
})
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
