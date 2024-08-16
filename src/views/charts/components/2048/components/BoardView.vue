<template>
  <div class="board" tabIndex="1">
    <div v-for="(r_item, r_i) in board.cells" :key="r_i">
      <cell v-for="(_, c_i) in r_item" :key="c_i"></cell>
    </div>
    <tile-view v-for="(tile, i) in tiles" :tile="tile" :key="i"> </tile-view>
    <game-end-overlay :board="board as any" :onrestart="onRestart"></game-end-overlay>
  </div>
</template>

<script lang="ts" setup>
import Cell from './Cell.vue'
import TileView from './TileView.vue'
import GameEndOverlay from './GameEndOverlay.vue'
import { Board } from '../board'
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'

const board = ref(new Board())
const handleKeyDown = (event: KeyboardEvent) => {
  if (board.value.hasWon()) {
    return
  }
  if (event.keyCode >= 37 && event.keyCode <= 40) {
    event.preventDefault()
    var direction = event.keyCode - 37
    board.value.move(direction)
  }
}
const onRestart = () => {
  board.value = new Board()
}
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
const tiles = computed(() => {
  return board.value.tiles.filter((tile) => tile.value != 0)
})
</script>
