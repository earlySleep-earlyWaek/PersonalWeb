<template>
  <div class="topBar">
    <div class="w-1/3">
      <div class="topBarTitle">RpgGame</div>
    </div>
    <div class="w-1/3 flex justify-center"></div>
    <div class="w-1/3 flex justify-end"></div>
  </div>
</template>

<style lang="scss" scoped>
.topBar {
  box-sizing: border-box;
  padding: 5px;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  background-color: #00000010;
  border-bottom: 2px #888888 solid;

  box-shadow: 0 5px 5px black;

  .topBarTitle {
    color: #fff;
    font-weight: 900;
    width: fit-content;

    background-color: black;
    border-radius: 8px;

    box-shadow:
      2px 2px 5px black,
      -2px -2px 5px black;
  }
}
</style>
