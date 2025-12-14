<template>
  <div class="h-full">
    <div class="h-[calc(100%-420px)] backWall">
      <div class="w-full h-20px">
        <el-tag type="success">{{ tableWidth }}</el-tag>
      </div>
    </div>
    <div class="tableArea">
      <div ref="tableAreaRef" class="w-95% h-80% flex flex-wrap justify-center items-center">
        <div class="card" v-for="item in 16">
          <div class="cardItem">
            <div>馒头</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

const tableAreaRef = ref(null)
const tableWidth = ref()
const tableHeight = ref()

const config = reactive({
  init() {
    tableWidth.value = Math.floor(tableAreaRef.value.clientWidth / 8) + 'px'
    tableHeight.value = Math.floor(tableAreaRef.value.clientHeight / 2) + 'px'

    console.log(tableAreaRef.value.clientWidth)
    console.log(tableWidth.value)
  },
})

onMounted(() => {
  if (tableAreaRef.value) {
    config.init()
  }
})
</script>

<style lang="css" scoped>
.backWall {
  background-color: #000;
  /* background-image: url('/images/wall1.png'); */
}
.tableArea {
  height: 400px;
  width: 100%;

  box-sizing: border-box;
  box-shadow:
    inset 20px 20px 5px black,
    inset -20px 0px 5px black;

  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: v-bind(tableWidth);
  height: v-bind(tableHeight);

  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  padding: 5px;
}

.cardItem {
  box-sizing: border-box;
  padding: 10px;

  background-color: #00000050;
}
</style>
