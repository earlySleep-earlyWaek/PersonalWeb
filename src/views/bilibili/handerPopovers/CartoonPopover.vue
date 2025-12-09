<template>
  <div class="main">
    <div class="leftCard">
      <a class="item" v-for="(item, index) in source">
        <el-image fit="cover" :src="item.image" />
        <div class="text">{{ item.label }}</div>
      </a>
    </div>
    <div class="line"></div>
    <div class="rightArea">
      <div class="title">人气漫画</div>
      <a v-for="(item, index) in cartoons">
        <div class="listItem">
          <div
            class="font-600"
            :style="`color:${index == 0 ? 'red' : index == 1 ? 'green' : index == 2 ? 'blue' : 'black'}`"
          >
            {{ index + 1 }}
          </div>
          {{ item.label.slice(0, 7) }}
          {{ item.label.length > 8 ? '...' : '' }}
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { CartoonPopoverData } from './config'

const source = ref([])
const cartoons = ref([])

const init = () => {
  CartoonPopoverData.left.forEach((e) => {
    const temp = e
    source.value.push(temp)
  })

  CartoonPopoverData.right.forEach((e) => {
    const temp = e
    cartoons.value.push(temp)
  })
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.main {
  --image-width: 160px;
  --text-height: 25px;

  display: flex;
  gap: 10px;
  .leftCard {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: calc(var(--image-width) * 2 + 10px);

    .item {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      width: var(--image-width);

      .el-image {
        width: var(--image-width);
        height: calc(var(--image-width) * (9 / 16));
      }
      .text {
        height: var(--text-height);
      }
    }
  }

  .rightArea {
    --title-height: 30px;
    .title {
      height: var(--title-height);
      font-size: 18px;
    }

    .listItem {
      display: flex;
      gap: 10px;

      width: 160px;
      height: calc(
        ((var(--image-width) * (9 / 16) + var(--text-height)) * 2 - var(--title-height)) / 6
      );

      box-sizing: border-box;
      padding: 5px;
      border-radius: 8px;

      &:hover {
        background-color: #88888850;
      }
    }
  }
}

.line {
  border-right: 1px solid #88888850;
}
</style>
