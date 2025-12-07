<template>
  <div class="main flex gap-10px">
    <div class="left">
      <el-image class="w-100%" fit="cover" src="/images/test.png" />

      <div class="flex gap-10px w-full h-80px">
        <el-image class="w-50%" fit="cover" src="/images/test.png" />
        <el-image class="w-50%" fit="cover" src="/images/test.png" />
      </div>
    </div>
    <div class="line"></div>
    <div class="right">
      <div class="rightList">
        <div class="title">热门赛事</div>
        <div class="items">
          <a
            v-for="(item, index) in hotMatch"
            @mouseenter="changeHover('热门赛事', index)"
            @mouseleave="changeHover('热门赛事', index)"
          >
            <div class="item">
              <strong :style="`color:${index == 0 ? 'red' : index == 1 ? 'green' : 'blue'}`">{{
                index + 1
              }}</strong>
              {{ item.label }}
              <el-button class="absolute right-0" v-if="item.hover" size="small">
                看直播
              </el-button>
            </div>
          </a>
        </div>
      </div>
      <div class="rightList">
        <div class="title">精彩预告</div>
        <div class="items">
          <a
            v-for="(item, index) in advance"
            @mouseenter="changeHover('精彩预告', index)"
            @mouseleave="changeHover('精彩预告', index)"
          >
            <div class="item">
              <strong :style="`color:${index == 0 ? 'red' : index == 1 ? 'green' : 'blue'}`">{{
                index + 1
              }}</strong>
              {{ item.label }}
              <el-button class="absolute right-0" v-if="item.hover" size="small">观看</el-button>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { MatchPopoverData } from './config'

const hotMatch = ref([])
const advance = ref([])

const init = () => {
  MatchPopoverData.hotMatch.forEach((e) => {
    const temp = e
    temp.hover = false
    hotMatch.value.push(temp)
  })

  MatchPopoverData.advance.forEach((e) => {
    const temp = e
    temp.hover = false
    advance.value.push(temp)
  })
}

const changeHover = (type, index) => {
  if (type == '热门赛事') {
    hotMatch.value[index].hover = !hotMatch.value[index].hover
  } else {
    advance.value[index].hover = !advance.value[index].hover
  }
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.main {
  .left {
    width: 300px;
  }

  .line {
    border-right: 1px solid #88888850;
  }

  .right {
    width: 200px;

    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    .rightList {
      box-sizing: border-box;
      padding: 5px;
      width: 100%;

      .title {
        width: 100%;
        font-size: 18px;
        font: 500;
        height: 30px;
      }

      .items {
        height: calc(100% - 30px);

        .item {
          font-size: 13px;
          width: 100%;
          height: 33%;

          position: relative;
        }
      }
    }
  }
}

.el-image {
  border-radius: 8px;
}
</style>
