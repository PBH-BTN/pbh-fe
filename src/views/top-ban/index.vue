<template>
  <a-typography-text style="font-size: 1.2em">
    此页面展示 PeerBanHelper 储存的封禁历史记录信息。
  </a-typography-text>

  <a-typography>
    <a-typography-title :heading="3">被封禁频率最高的{{ topNumber }}个 IP 地址</a-typography-title>
    <a-typography-paragraph>
      这是从数据库中记录的近14天的封禁历史中分析得来的数据。如果某些 IP
      地址持续被多次封禁，则可以考虑使用系统防火墙屏蔽这些 IP，或者向其他人分享这些恶意 IP
      地址，以帮助更多人改善他们的屏蔽规则。
    </a-typography-paragraph>
  </a-typography>
  <a-space fill direction="vertical">
    <a-space>
      <a-typography-text>只展示前</a-typography-text>
      <a-select v-model="topNumber" :trigger-props="{ autoFitPopupMinWidth: true }">
        <a-option :value="10">10</a-option>
        <a-option :value="20">20</a-option>
        <a-option :value="30">30</a-option>
        <a-option :value="40">40</a-option>
        <a-option :value="50">50</a-option>
      </a-select>
      <a-typography-text>个</a-typography-text>
    </a-space>
    <top50Table :top-number="topNumber" />
  </a-space>
</template>

<script setup lang="ts">
import top50Table from './components/top50Table.vue'
import { ref } from 'vue'
const topNumber = ref(50)
</script>
