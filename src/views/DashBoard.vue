<script setup lang="ts">
import BanList from '@/components/banList.vue'
import ClientStatus from '../components/clientStatus.vue'
</script>

<template>
  <a-space direction="vertical" fill>
    <a-typography-text style="font-size: 1.2em">
      此页面展示 PeerBanHelper 自启动以来的基本数据。
    </a-typography-text>

    <ClientStatus />
    <a-divider />
    <BanList />
  </a-space>
</template>
