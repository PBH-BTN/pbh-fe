<script setup lang="ts">
import banlogTable from './components/banlogTable.vue'
</script>

<template>
  <a-typography-text style="font-size: 1.2em">
    此页面展示 PeerBanHelper 储存的封禁历史记录信息。
  </a-typography-text>
  <banlogTable />
</template>
