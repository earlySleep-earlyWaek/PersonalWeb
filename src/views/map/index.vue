<template>
  <div class="h-full w-100vw">
    <div class="h-[calc(100%-250px)] flex">
      <div class="w-255px h-full">
        <MapTreeSelect />
      </div>
      <div id="container" class="flex-1 h-full"></div>
    </div>
    <div>
      <ToolArea />
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import MapTreeSelect from './MapTreeSelect.vue'
import ToolArea from './ToolArea.vue'
import { localConfig } from '@/localStorage/config'
import { ElMessage } from 'element-plus'
import { systemConfig } from '../config/config'

const config = reactive({
  option: {
    type: '点',
  },
  init() {
    TileLayer.init()
  },
})

const TileLayer = reactive({
  inc: null,
  option: {
    zooms: [2, 30],
    visible: true,
  },
  init() {
    this.inc = new AMap.TileLayer.Satellite(this.option)
    this.optionChange()
    this.inc.setMap(Map.inc)
  },
  optionChange() {
    if (localConfig.option.tileLayer) {
      this.inc.show()
    } else {
      this.inc.hide()
    }
  },
})

const Map = reactive({
  inc: null,
  option: {
    viewMode: '2D',
    zoom: 18,
    showLabel: false,
    center: [116.397428, 39.90923],
  },
  async init() {
    try {
      // 等待加载，高兼容：优先使用返回值，否则从 window 读取
      const loaded = await AMapLoader.load({
        key: systemConfig.gis.key,
        version: '2.0',
        plugins: ['AMap.Scale'],
      })
      const AMapLib = loaded || window.AMap
      if (!AMapLib) throw new Error('AMap 未加载成功')

      this.inc = new AMapLib.Map('container', this.option)
      this.handleCenter()
      config.init()
    } catch (e) {
      console.error('AMap 初始化失败：', e)
    }
  },
  changeOption() {},
  handleCenter() {
    this.inc.on('click', () => {
      if (config.option.type == '点') {
        ElMessage('点')
      }
    })
  },
})

watch(localConfig, () => {
  TileLayer.optionChange()
})

onMounted(async () => {
  await nextTick()
  if (systemConfig.gis.key) {
    Map.init()
  } else {
    ElMessage.error('请先去设置中配置高德地图key')
  }
})
</script>
