<!-- 消息 -->
<template>
  <div>
    <div class="button" v-for="(item, index) in data" :key="index">
      <a :href="item.url" target="_blank" rel="noopener noreferrer">
        {{ item.label }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const data = ref([
  {
    label: '回复我的',
    url: '#',
  },
  {
    label: '@我的',
    url: '#',
  },
  {
    label: '收到的赞',
    url: '#',
  },
  {
    label: '系统消息',
    url: '#',
  },
  {
    label: '我的消息',
    url: '#',
  },
])
</script>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  transition: 0.2s;
  padding: 5px;
  &:hover {
    background: #88888850;
  }
}
</style>
