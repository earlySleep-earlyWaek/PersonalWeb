import { reactive, watch } from 'vue'

export const localConfig = reactive({
  option: {
    accordion: true,
    tileLayer: true,
  },
})

watch(
  localConfig,
  () => {
    console.log('配置修改')
  },
  { deep: true },
)
