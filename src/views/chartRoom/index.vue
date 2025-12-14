<template>
  <div class="main">
    <div class="leftArea">
      <div class="text-center font-600 font-size-18px cursor-default c-#fff">聊</div>
      <div class="leftAreaAvatar">
        <el-avatar :size="30" src="/images/logo.png" />
      </div>
      <div
        class="leftAreaItem"
        :style="config.activedItemStyle('message')"
        @click="config.handleActivitedClick('message')"
      >
        <el-icon><ChatDotRound /></el-icon>
      </div>
      <div
        class="leftAreaItem"
        :style="config.activedItemStyle('user')"
        @click="config.handleActivitedClick('user')"
      >
        <el-icon><User /></el-icon>
      </div>
      <div
        class="leftAreaItem"
        :style="config.activedItemStyle('setting')"
        @click="config.handleActivitedClick('setting')"
      >
        <el-icon><Setting /></el-icon>
      </div>
    </div>
    <div class="flex-1 flex">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ChatDotRound, Setting, User } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const config = reactive({
  activatedItem: 'message',
  handleActivitedClick(name) {
    this.activatedItem = name
    router.push(name)
  },
  activedItemStyle(name) {
    return name == this.activatedItem ? 'background-color:#88888850' : ''
  },
})
</script>

<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100%;

  background-color: green;

  display: flex;
}

.leftArea {
  // w-60px h-full bg-#22222f flex flex-wrap
  width: 60px;
  height: 100%;

  background-color: #22222f;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 10px;
}

.leftAreaAvatar {
  cursor: pointer;
  text-align: center;
}

.leftAreaItem {
  box-sizing: border-box;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 8px;

  cursor: pointer;
  text-align: center;

  color: #fff;
  font-size: 25px;

  transition: 0.1s;
  &:hover {
    background-color: #ffffff50 !important;
  }
}
</style>
