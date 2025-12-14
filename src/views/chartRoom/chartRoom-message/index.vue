<template>
  <el-scrollbar class="bg-dark" height="100%">
    <div class="w-350px h-full">
      <div class="messageRoom" v-for="item in ChartRoomMessage.messageRoomList">
        <el-avatar :size="50" :src="item.avatar" />
        <div class="flex-1 h-full">
          <div class="h-50% messageRoomTitle">
            {{ item.name }}
          </div>
          <div class="h-50% messageRoomText">111</div>
        </div>
      </div>
    </div>
  </el-scrollbar>
  <div class="flex-1 h-full bg-coolgray"></div>
</template>

<script setup>
import { reactive } from 'vue'
import { ChartRoomMessage } from '../config'

const config = reactive({})
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
    background-color: #ffffff50;
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
