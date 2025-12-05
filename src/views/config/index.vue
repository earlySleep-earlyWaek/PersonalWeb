<template>
  <div>
    <el-form>
      <el-form-item label="高德key">
        <el-input class="w-220px" v-model="config.gis.key" />
        <el-button @click="config.gisSave()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { nextTick, onMounted, reactive } from 'vue'
import { systemConfig } from './config'
import { ElMessage } from 'element-plus'

const config = reactive({
  gis: {},
  init() {
    this.gis = systemConfig.gis
  },
  gisSave() {
    systemConfig.gis = this.gis
    systemConfig.save()
    ElMessage.success('请手动刷新浏览器')
  },
})

onMounted(async () => {
  await nextTick()
  config.init()
})
</script>
