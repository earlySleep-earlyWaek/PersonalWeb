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
          <div v-if="item.name != ChartRoomMessage.userInfo.name" class="flex gap-10px">
            <el-avatar class="mt-10px" :src="item.avatar" />
            <div>
              <div class="messageName">{{ item.name }}</div>
              <div class="messageBubble">
                {{ item.message }}
              </div>
            </div>
          </div>

          <div
            v-if="item.name == ChartRoomMessage.userInfo.name"
            class="w-full flex gap-10px justify-end"
          >
            <div>
              <div class="messageName">{{ item.name }}</div>
              <div class="messageBubble">
                {{ item.message }}
              </div>
            </div>
            <el-avatar class="mt-10px" :src="item.avatar" />
          </div>
        </div>
      </div>
    </el-scrollbar>

    <div class="inputArea">
      <div class="inputToolBar">
        <el-icon class="inputToolBarItem"><Picture /></el-icon>
        <el-icon class="inputToolBarItem"><Folder /></el-icon>
      </div>
      <div class="flex-1"></div>
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
import { ChartUserApi } from '@/api/chatroom/user'

const config = reactive({
  activited: null,
  changeActivited(index) {
    this.activited = index
  },
  activitedStyle(index) {
    return this.activited == index ? 'background:#ffffff30;' : ''
  },
  sendMessage() {
    ChartUserApi.add()
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

.inputButton {
  // w-full flex justify-end
  width: 100%;

  display: flex;
  justify-content: end;

  box-sizing: border-box;
  padding: 10px;
}
</style>
