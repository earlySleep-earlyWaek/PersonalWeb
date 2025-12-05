<template>
  <el-tabs v-model="config.tabsSelect" type="card">
    <el-tab-pane name="工具" label="工具"> </el-tab-pane>
    <el-tab-pane label="覆盖层"> 111</el-tab-pane>
    <el-tab-pane label="占位"> 111</el-tab-pane>
  </el-tabs>

  <div class="-mt-15px">
    <div v-show="config.tabsSelect === '工具'">
      <el-tabs type="card">
        <el-tab-pane label="点">
          <div class="flex gap-20px p-5px">
            <div
              class="flex flex-wrap gap-20px"
              :style="`width:${ToolAreaConfig.markerSelect.length * 190}px;`"
            >
              <div
                class="toolItem flex w-270px"
                v-for="(items, index) in ToolAreaConfig.markerSelect"
                :key="index"
                :label="items.label"
              >
                <div class="label">{{ items.label }}:</div>
                <el-select v-model="MarkerConfig.selects[items.type]" class="w-220px">
                  <el-option
                    v-for="(item, index) in items.option"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="toolItem flex">
              <div class="label">备注:</div>
              <el-input class="w-220px" type="textarea" :rows="4" v-model="MarkerConfig.detail" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="线">222 </el-tab-pane>
        <el-tab-pane label="面"> 111</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { ToolAreaConfig } from './config'

const emits = defineEmits(['marker', 'line', 'area'])

const config = reactive({
  tabsSelect: '工具',
  markerDetail: '',
  init() {
    MarkerConfig.init()
  },
})

const MarkerConfig = reactive({
  selects: {
    type: '',
    aaa: '',
    bbb: '',
  },
  detail: '',
  init() {
    ToolAreaConfig.markerSelect.forEach((e) => {
      this.selects[e.type] = e.option[0].value
    })
  },
})

onMounted(() => {
  config.init()
})
</script>

<style lang="scss" scoped>
.toolItem {
  .label {
    width: 70px;
    margin-right: 10px;
  }
}
</style>
