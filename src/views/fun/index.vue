<template>
  <div class="w-100vw h-full flex">
    <el-scrollbar class="scroll">
      <div
        class="item"
        v-for="item in config.scrollList"
        @click="config.handleClick(item)"
        :style="
          `background-color:${item.label == config.active ? '#c4c4c4' : 'transparent'};` +
          `color:${item.label == config.active ? 'black' : '#00000090'};`
        "
      >
        {{ item.label }}
      </div>
    </el-scrollbar>
    <div class="flex-1 w-100% bg-coolGray">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { FunConfig } from './config'
import { useRouter } from 'vue-router'

const router = useRouter()

const config = reactive({
  scrollList: [],
  active: '',
  init() {
    FunConfig.list.forEach((e) => {
      const temp = e
      this.scrollList.push(temp)
    })
    this.active = this.scrollList[0].label
  },
  handleClick(item) {
    this.active = item.label
    router.push(item.url)
  },
})

onMounted(() => {
  config.init()
})
</script>

<style lang="scss" scoped>
.scroll {
  z-index: 99;

  width: 250px;
  height: 100%;
  overflow: auto;
  background-color: #ececec;

  border-right: 2px solid #c4c4c4;

  .item {
    box-sizing: border-box;
    padding: 5px;
    border-radius: 8px;

    height: 50px;
    cursor: pointer;

    font-size: 18px;
    font-weight: 600;
    color: #00000090;

    display: flex;
    align-items: center;

    transition: 0.1s;

    &:hover {
      background-color: #88888850 !important;
    }
  }
}
</style>
