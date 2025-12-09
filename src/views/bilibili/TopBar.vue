<!-- 顶部导航栏 -->

<template>
  <div class="header flex justify-between">
    <div class="flex gap-20px w-37.5%">
      <div><el-button link> 首页</el-button></div>
      <div class="item" v-for="(item, index) in WelHeader.leftMenu" :key="index">
        <el-popover
          :show-arrow="false"
          placement="bottom"
          :disabled="!item.popover"
          popper-style="width:fit-content;height:fit-content;"
        >
          <template #reference>
            <a :href="item.url" target="_blank" rel="noopener noreferrer">
              <el-button link> {{ item.label }}</el-button>
            </a>
          </template>
          <template #default>
            <!-- 弹出框选择器 左边   -->
            <GameCenterPopover v-if="item.label === '游戏中心'" />
            <MatchPopover v-if="item.label === '赛事'" />
            <CartoonPopover v-if="item.label === '漫画'" />
          </template>
        </el-popover>
      </div>
    </div>
    <div class="w-25%">
      <WelSearch />
    </div>
    <div class="w-37.5%">
      <div class="w-full flex justify-end gap-20px w-full">
        <div class="item" v-for="(item, index) in WelHeader.rightMenu" :key="index">
          <el-popover
            :show-arrow="false"
            placement="bottom"
            :disabled="!item.popover"
            popper-style="width:fit-content;height:fit-content;"
          >
            <template #reference>
              <a :href="item.url" target="_blank" rel="noopener noreferrer">
                <el-button link> {{ item.label }}</el-button>
              </a>
            </template>
            <template #default>
              <!-- 弹出框选择器 右边   -->

              <BigPersonPopover v-if="item.label === '大会员'" />
              <MessagePopover v-else-if="item.label === '消息'" />
              <MomentsPopover v-else-if="item.label === '动态'" />
              <CollectPopover v-else-if="item.label === '收藏'" />
              <HistoryPopover v-else-if="item.label === '历史'" />
              <!-- <CreateCenterPopover v-else-if="item.label === '创作中心'" /> -->
            </template>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import WelSearch from './WelSearch.vue'
import { WelHeader } from './config'
import BigPersonPopover from './handerPopovers/BigPersonPopover.vue'
import MessagePopover from './handerPopovers/MessagePopover.vue'
import MomentsPopover from './handerPopovers/MomentsPopover.vue'
import CollectPopover from './handerPopovers/CollectPopover.vue'
import HistoryPopover from './handerPopovers/HistoryPopover.vue'
import GameCenterPopover from './handerPopovers/GameCenterPopover.vue'
import MatchPopover from './handerPopovers/MatchPopover.vue'
import CartoonPopover from './handerPopovers/CartoonPopover.vue'
</script>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  padding: 10px;
  width: 100vw;
  min-width: 1300px;
  background: #f8f8f8;
  z-index: 100;
  position: fixed;

  .item {
    cursor: pointer;
    :hover {
      animation: fontJump 0.2s linear forwards;
    }
  }
}

@keyframes fontJump {
  0% {
    margin-bottom: 0px;
  }
  50% {
    margin-bottom: 5px;
  }
  100% {
    margin-bottom: 0px;
  }
}
</style>
