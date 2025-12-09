<!-- 搜索栏组件 -->

<template>
  <div class="search relative">
    <el-input
      v-model="Input.text"
      @focus="Input.handleFocus()"
      @blur="Input.handleBlur()"
      :suffix-icon="Search"
      placeholder="X^X 仅展示"
    />
    <div
      class="h-200px w-[calc(100%-20px)] bg-white absolute p-10px"
      v-show="Input.isFocus || HotSearch.isFocus"
      @mousemove="HotSearch.handleMouseMove()"
      @mouseleave="HotSearch.handleBlur()"
    >
      <div><strong>热搜</strong></div>
      <div class="w-full flex flex-wrap">
        <div class="search_item" v-for="(item, index) in data.hotSearch" :key="index">
          {{ `${index + 1}.${item}` }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
import { reactive } from 'vue'

const config = reactive({})

const data = reactive({
  hotSearch: [
    '热搜第一条',
    '终极白昼',
    '斗破苍穹',
    '武动乾坤',
    '喜之郎与灰太羊',
    '无敌的我',
    '难道是',
    '莫非',
    '难道',
    '结束了',
  ],
})

const Input = reactive({
  text: '',
  isFocus: false,
  handleFocus() {
    this.isFocus = true
  },
  handleBlur() {
    this.isFocus = false
  },
})

const HotSearch = reactive({
  isFocus: false,
  handleMouseMove() {
    this.isFocus = true
    window.removeEventListener('mousedown', HotSearch.hide)
  },
  handleBlur() {
    window.addEventListener('mousedown', HotSearch.hide)
  },
  hide() {
    HotSearch.isFocus = false
    window.removeEventListener('mousedown', HotSearch.hide)
  },
})
</script>

<style lang="scss" scoped>
.search {
  z-index: 100;
  .search_item {
    width: calc(50% - 10px);
    padding: 5px;
    cursor: pointer;
    &:hover {
      background: #88888850;
    }
  }
}
</style>
