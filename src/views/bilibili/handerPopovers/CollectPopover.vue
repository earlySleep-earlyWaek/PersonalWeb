<!-- 收藏 -->
<template>
  <div>
    <el-tabs>
      <el-tab-pane v-for="(item, index) in data" :key="index" :label="item.label">
        <el-scrollbar height="400px">
          <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const data = ref([
  {
    label: '默认收藏夹',
  },
  {
    label: '收藏夹1号',
  },
  {
    label: '收藏夹2号',
  },
])
</script>

<style lang="scss" scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
