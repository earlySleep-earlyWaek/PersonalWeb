<!-- 动态 -->

<template>
  <div>
    <div class="w-300px flex justify-between">
      <strong>正在直播</strong>
      <el-button link> 查看更多<strong>></strong> </el-button>
    </div>
    <el-scrollbar class="w-300px" height="80px" :always="true">
      <div class="scrollbar-flex-content">
        <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p>
      </div>
    </el-scrollbar>
    <el-divider content-position="center">最新动态</el-divider>
    <el-scrollbar height="200px">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item2">{{ item }}</p>
    </el-scrollbar>

    <el-divider content-position="center">历史动态</el-divider>
    <el-scrollbar height="200px">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item2">{{ item }}</p>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  transition: 0.2s;
  padding: 5px;
  &:hover {
    background: #88888850;
  }
}

.scrollbar-flex-content {
  display: flex;
  width: fit-content;
}

.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}

.scrollbar-demo-item2 {
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
