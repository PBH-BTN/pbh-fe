<template>
  <a-typography>
    <a-typography-title :heading="3">规则统计</a-typography-title>
    <a-typography-paragraph>
      以下是规则统计信息，你可以通过规则命中次数（封禁次数）和运行次数来评估规则的有效性。
    </a-typography-paragraph>
  </a-typography>
  <ruleMetricsTable />
</template>
<script setup lang="ts">
import ruleMetricsTable from '@/components/ruleMetricsTable.vue'
</script>
