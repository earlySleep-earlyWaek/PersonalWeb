<!-- 大会员特权 -->

<template>
  <div>
    <div class="flex">
      <div class="w-300px">
        <a :href="'#'" target="_blank" rel="noopener noreferrer">
          <div class="button w-fit"><strong>大会员特权</strong></div>
        </a>
        <div class="flex flex-wrap gap-5px">
          <div class="box1" v-for="(item, index) in data" :key="index">
            <div class="button">
              <el-image class="image" :src="item.img" />
              <a :href="item.url" target="_blank" rel="noopener noreferrer">
                {{ item.label }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="w-80px">
        <el-image src="/images/image-loading.png" />
      </div>
    </div>
    <div class="down">
      <div>
        <div>您的大会员已过期</div>
        <div>立即开通继续享受大会员特权</div>
      </div>
      <div>
        <el-badge type="warning" :offset="[-50, -5]" value="限时优惠">
          <el-button type="danger" size="large">成为大会员</el-button>
        </el-badge>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const data = ref([
  {
    label: '热剧抢先看',
    img: '/images/image-loading.png',
    url: '#',
  },
  {
    label: '会员免费看',
    img: '/images/image-loading.png',
    url: '#',
  },
  {
    label: '4K超清画质',
    img: '/images/image-loading.png',
    url: '#',
  },
  {
    label: '会员专属装扮',
    img: '/images/image-loading.png',
    url: '#',
  },
])
</script>

<style lang="scss" scoped>
.box1 {
  width: 45%;
  .image {
    margin-right: 5px;
    width: 24px;
    height: 24px;
  }
}

.button {
  cursor: pointer;
  transition: 0.2s;
  font-size: 15px;
  display: flex;
  align-items: center;

  &:hover {
    color: pink;
  }
}

.down {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #ffecf1;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 20px;
  color: pink;
}
</style>
