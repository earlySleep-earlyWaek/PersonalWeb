<!-- 消息卡片组件 -->
<template>
  <div class="chat-card" :class="{ 'is-own': isOwn }">
    <template v-if="!isOwn">
      <!-- 他人消息在左边，头像-气泡顺序 -->
      <el-avatar class="mt-10px" :size="40" :src="avatar" />
      <div class="message-content">
        <div class="message-name">{{ userName }}</div>
        <div class="message-bubble other-bubble">
          {{ message.content }}
        </div>
      </div>
    </template>

    <template v-else>
      <!-- 自己消息在右边，气泡-头像顺序 -->
      <div class="message-content">
        <div class="message-name text-right">{{ userName }}</div>
        <div class="message-bubble own-bubble">
          {{ message.content }}
        </div>
      </div>
      <el-avatar class="mt-10px" :size="40" :src="avatar" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ChatMessage } from '@/api/chart-room'

interface Props {
  message: ChatMessage
  isOwn: boolean
  userName: string
  avatar: string
}

withDefaults(defineProps<Props>(), {
  userName: '昵称',
  avatar: '/images/logo.png',
})
</script>

<style lang="scss" scoped>
.chat-card {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  width: 100%;

  &.is-own {
    display: flex;
    justify-content: end;
  }
}

.text-right {
  text-align: right;
}

.message-content {
  max-width: 70%;
}

.message-name {
  color: #888;
  font-size: 12px;
  margin-bottom: 4px;
}

.message-bubble {
  box-sizing: border-box;
  padding: 12px 16px;
  background-color: #f0f0f0;
  border-radius: 18px;
  margin-top: 2px;
  word-wrap: break-word;
  word-break: break-all;
}

.own-bubble {
  background-color: #2bbbbb;
  color: white;
  border-radius: 18px 4px 18px 18px !important; /* 自己的消息气泡圆角调整 */
}

.other-bubble {
  border-radius: 4px 18px 18px 18px !important; /* 他人消息气泡圆角调整 */
}
</style>
