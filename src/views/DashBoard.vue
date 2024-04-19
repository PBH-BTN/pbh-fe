<script setup lang="ts">
import { useRequest } from 'vue-request'
import statisticBoard from '../components/clientStatus.vue'
</script>

<template>
  <a-typography-text style="font-size: 1.2em">
    此页面展示 PeerBanHelper 自启动以来的基本数据。
  </a-typography-text>
  <br />
  <statisticBoard />
</template>
