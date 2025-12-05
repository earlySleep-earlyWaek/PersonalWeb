<template>
  <el-tree
    class="w-full h-[calc(100%-200px)] bg-transparent"
    :data="menu"
    :props="defaultProps"
    :accordion="config.accordion"
    @node-click="config.handleNodeClick()"
  />
  <div class="h-200px w-min p-5px overflow-auto">
    <div><strong>设置</strong></div>
    <el-checkbox @change="config.handlecheckbox()" v-model="config.accordion"
      >手风琴模式</el-checkbox
    >
    <el-checkbox @change="config.handlecheckbox()" v-model="config.tileLayer">实景图</el-checkbox>
    <!-- <el-button @click="config.test">测试</el-button> -->
  </div>
</template>

<script setup>
import { localConfig } from '@/localStorage/config'
import { ElMessage } from 'element-plus'
import { onMounted, reactive } from 'vue'

const emits = defineEmits([''])

const config = reactive({
  accordion: true,
  tileLayer: true,
  showLabel: true,
  init() {
    this.accordion = localConfig.option.accordion
    this.tileLayer = localConfig.option.tileLayer
  },
  handlecheckbox() {
    localConfig.option.accordion = this.accordion
    localConfig.option.tileLayer = this.tileLayer
  },
  handleNodeClick(data, node, event) {
    if (node.isLeaf) {
      const type = node.parent.data.type
      switch (type) {
        case '基点': {
          ElMessage('基点')
          break
        }
        case '点': {
          ElMessage('点')
          break
        }
        case '线': {
          ElMessage('线')
          break
        }
        case '面': {
          ElMessage('面')
          break
        }
        case '预设': {
          ElMessage('预设')
          break
        }
        default: {
          ElMessage.error('节点类型未知')
        }
      }
    }
  },
  test() {
    console.log(localConfig.option)
  },
})

const menu = [
  {
    label: '基点',
    type: '基点',
    children: [
      {
        label: '原点',
        lnglat: [116.397428, 39.90923],
      },
    ],
  },
  {
    label: '覆盖层',
    type: '覆盖层',
    children: [
      {
        label: '点',
        type: '点',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: '线',
        type: '线',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
      {
        label: '面',
        type: '面',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: '预设',
    type: '预设',
    children: [
      {
        label: '默认',
      },
    ],
  },
]
const defaultProps = {
  children: 'children',
  label: 'label',
}

onMounted(() => {
  config.init()
})
</script>
