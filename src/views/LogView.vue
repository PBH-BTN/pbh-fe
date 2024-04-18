<script setup lang="ts">
import banlogTable from '../components/banlogTable.vue'
import { ref } from 'vue'
const lastUpdate = new Date().toLocaleString()
const autoUpdate = ref(true)
</script>

<template>
  <p style="font-size: 1.2em">此页面展示 PeerBanHelper 储存的封禁历史记录信息。</p>
  <a-space size="large">
    <p><icon-clock-circle />最后更新于：{{ lastUpdate }}</p>
    <a-switch v-model="autoUpdate">
      <template #checked> 自动更新开 </template>
      <template #unchecked> 自动更新关 </template>
    </a-switch>
  </a-space>
  <banlogTable />
</template>
