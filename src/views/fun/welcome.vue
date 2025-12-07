<template>
  <div class="main">
    <div class="item">
      <el-image src="/images/a.png" />
      <div class="font-size-24px flex justify-center"><strong>欢迎</strong></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .item {
    height: fit-content;
    width: fit-content;

    .el-image {
      height: 250px;
    }
  }
}
</style>
