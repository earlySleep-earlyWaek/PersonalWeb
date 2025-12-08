import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入Element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入组件
import Welcome from '@/views/welcome/index.vue'
import Map from '@/views/map/index.vue'
import Config from '@/views/config/index.vue'

// 引入Unocss
import 'virtual:uno.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 使用Element
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component('Welcome', Welcome)
app.component('MapView', Map)
app.component('ConfigView', Config)

app.mount('#app')
