<template>
  <div class="w-100vw h-full flex">
    <el-scrollbar class="scroll">
      <a class="item" v-for="item in config.scrollList" :href="item.url">{{ item.label }}</a>
    </el-scrollbar>
    <div class="flex-1 w-100%">
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
  init() {
    FunConfig.list.forEach((e) => {
      const temp = e
      this.scrollList.push(temp)
    })
  },
})

onMounted(() => {
  config.init()
})
</script>

<style lang="scss" scoped>
.scroll {
  width: 250px;
  height: 100%;
  overflow: auto;
  background-color: #ececec;

  border-right: 2px solid #88888850;

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
      background-color: #88888850;
      color: black;
    }
  }
}
</style>
