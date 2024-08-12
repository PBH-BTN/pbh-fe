<template>
  <div>
    <a-typography>
      <a-typography-paragraph>
        {{ $t('page.ruleMetrices.description') }}
      </a-typography-paragraph>
    </a-typography>
    <ruleMetricsTable />
  </div>
</template>
<script setup lang="ts">
import ruleMetricsTable from './components/ruleMetricsTable.vue'
</script>
