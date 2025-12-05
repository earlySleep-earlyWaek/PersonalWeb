<template>
  <div class="header flex justify-between">
    <div class="flex gap-20px w-37.5%">
      <div><el-button link> 首页</el-button></div>
      <div class="item" v-for="(item, index) in WelHeader.leftMenu" :key="index">
        <a :href="item.url" target="_blank" rel="noopener noreferrer">
          <el-button link> {{ item.label }}</el-button>
        </a>
      </div>
    </div>
    <div class="w-25%">
      <WelSearch />
    </div>
    <div class="w-37.5%">
      <div class="w-full flex justify-end gap-20px w-full">
        <div class="item" v-for="(item, index) in WelHeader.rightMenu" :key="index">
          <el-popover placement="bottom" popper-style="width:fit-content;height:fit-content;">
            <template #reference>
              <a :href="item.url" target="_blank" rel="noopener noreferrer">
                <el-button link> {{ item.label }}</el-button>
              </a>
            </template>
            <template #default>
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
</script>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  padding: 10px;
  width: 100vw;
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
</style>
