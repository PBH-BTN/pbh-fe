<template>
  <div class="overlay" v-show="show">
    <p class="message">{{ contents }}</p>
    <button class="tryAgain" @click="restart">Try again</button>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue'
import type { Board } from '../board'

const props = defineProps<{
  board: Board
  onrestart: () => void
}>()
const { board } = toRefs(props)
const show = computed(() => {
  return board.value.hasWon() || board.value.hasLost()
})
const contents = computed(() => {
  if (board.value.hasWon()) {
    return 'Good Job!'
  } else if (board.value.hasLost()) {
    return 'Game Over'
  } else {
    return ''
  }
})
const restart = () => {
  props.onrestart && props.onrestart()
}
</script>
