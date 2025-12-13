<template>
  <div ref="enemyRef" class="enemy font-900 font-size-25px">
    {{ props.width }}
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  DivKillerGetSize as DivKillerGetSize,
  DivKillerPlayer,
  DivKillerCollisionDet,
  funPlayArea,
  DivKiller,
} from '../config'

const enemyRef = ref()

const props = defineProps({
  position: {
    type: Array,
    default: [1000, 800],
  },
  width: {
    type: Number,
    default: 120,
  },
  direction: {
    type: String,
    default: '左',
  },
})

const emits = defineEmits(['ated', 'gameover'])

const startX = ref()
const startY = ref()
const width = ref()
const size = ref()

startX.value = props.position[0] + 'px'
startY.value = props.position[1] + 'px'
width.value = props.width + 'px'

let coordinates = []
let offsetX = 0 // 偏移量
let speed = 5 // 速度

const enemyMove = () => {
  if (DivKiller.status) {
    // const X = coordinates[0] + offsetX - funPlayArea.left
    const X = coordinates[0] + offsetX
    const Y = props.position[1]

    const enemyDet = {
      topLeft: [X, Y],
      topRight: [X + props.width, Y],
      bottomLeft: [X, Y + props.width * 0.75],
      bottomRight: [X + props.width, Y + props.width * 0.75],
    }

    if (DivKillerCollisionDet(enemyDet)) {
      if (props.width <= DivKillerPlayer.size) {
        enemyRef.value.remove()
        enemyRef.value = null
        emits('ated')
        return
      } else {
        DivKiller.status = false
        enemyRef.value.remove()
        enemyRef.value = null
        emits('gameover')
        return
      }
    }

    if (props.direction == '右') {
      if (X < funPlayArea.right + 150) {
        enemyRef.value.style.left = `${X}px`

        offsetX += speed
        setTimeout(() => {
          enemyMove()
        }, 20)
      } else {
        console.log('销毁')
        enemyRef.value.remove()
      }
    } else {
      if (X > funPlayArea.left - 150) {
        enemyRef.value.style.left = `${X}px`

        offsetX += speed
        setTimeout(() => {
          enemyMove()
        }, 20)
      } else {
        console.log('销毁')
        enemyRef.value.remove()
      }
    }
  } else {
    enemyRef.value.remove()
    enemyRef.value = null
  }
}

onMounted(() => {
  if (props.direction == '右') {
    speed = 5
  } else {
    speed = -speed
  }

  if (enemyRef.value) {
    const enemy = enemyRef.value.getBoundingClientRect()
    coordinates = [enemy.left, enemy.top]
    size.value = DivKillerGetSize(props.width)
    enemyMove()
  }
})
</script>

<style lang="scss" scoped>
.enemy {
  --enemy-width: v-bind(width);

  width: var(--enemy-width);
  height: calc(var(--enemy-width) * 0.75);
  // border: 1px solid black;
  border-radius: 4px;

  background-color: red;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  left: v-bind(startX);
  top: v-bind(startY);

  box-shadow: 0px 5px 5px black;
}
</style>
