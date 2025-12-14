import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Loading',
      component: () => import('@/views/load.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home.vue'),
      children: [
        {
          path: 'welcome',
          name: 'Welcome',
          component: () => import('@/views/welcome/index.vue'),
        },
        {
          path: 'bilibili',
          name: 'Bilibili',
          component: () => import('@/views/bilibili/index.vue'),
        },
        {
          path: 'chart-room-index',
          name: 'ChartRoomIndex',
          component: () => import('@/views/chartRoom/index.vue'),
        },
        {
          path: 'chart-room',
          name: 'ChartRoom',
          component: () => import('@/views/chartRoom/app.vue'),
          children: [
            {
              path: 'message',
              name: 'Message',
              component: () => import('@/views/chartRoom/chartRoom-message/index.vue'),
            },
            {
              path: 'user',
              name: 'User',
              component: () => import('@/views/chartRoom/chartRoom-user/index.vue'),
            },
            {
              path: 'setting',
              name: 'Setting',
              component: () => import('@/views/chartRoom/chartRoom-setting/index.vue'),
            },
          ],
        },
        {
          path: 'map',
          name: 'Map',
          component: () => import('@/views/map/index.vue'),
        },
        {
          path: 'echarts',
          name: 'ECharts',
          component: () => import('@/views/echarts/index.vue'),
        },
        {
          path: 'fun',
          name: 'Fun',
          component: () => import('@/views/fun/index.vue'),
          children: [
            {
              path: 'welcome',
              name: 'FunWelcome',
              component: () => import('@/views/fun/welcome.vue'),
            },
            {
              path: 'big-small',
              name: 'BigSmall',
              component: () => import('@/views/fun/bigEatSmall/index.vue'),
            },
            {
              path: 'clicker',
              name: 'Clicker',
              component: () => import('@/views/fun/clicker/index.vue'),
            },
            {
              path: 'breakfast',
              name: 'Breakfast',
              component: () => import('@/views/fun/breakfast/index.vue'),
            },
          ],
        },
        {
          path: 'test',
          name: 'Test',
          component: () => import('@/views/test/index.vue'),
        },
        {
          path: 'config',
          name: 'Config',
          component: () => import('@/views/config/index.vue'),
        },
      ],
    },
  ],
})

export default router
