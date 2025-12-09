<template>
  <div class="main">
    <div class="topBar">注:个人练手项目 除了尝试复刻一些网站以外 也会写一些巩固技术的小项目</div>
    <div class="showArea">
      <div>
        <el-image class="w-256px h-256px" fit="cover" src="/images/image-loading.png" />
        <div class="text-center font-600 font-size-48px">你好</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100%;

  display: flex;
  flex-direction: column;

  .topBar {
    width: 100%;
    background-color: #00000050;

    display: flex;
    align-items: center;

    box-sizing: border-box;
    padding: 5px;
  }

  .showArea {
    display: flex;
    flex: 1;

    justify-content: center;
    align-items: center;

    background-color: bisque;
  }
}
</style>
