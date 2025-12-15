<!-- 左边发言 -->

<template>
  <div class="flex gap-10px">
    <el-avatar class="mt-10px" :src="avatar" />
    <div>
      <div class="messageName">{{ userName }}</div>
      <div class="messageBubble">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  userName: {
    type: String,
    default: '昵称',
  },
  avatar: {
    type: String,
    default: '/images/logo.png',
  },
  message: {
    type: String,
    default: '消息示例',
  },
})
</script>

<style lang="scss" scoped>
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
</style>
