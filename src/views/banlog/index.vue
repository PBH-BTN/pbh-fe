<script setup lang="ts">
import banlogTable from './components/banlogTable.vue'
</script>

<template>
  <a-space direction="vertical" fill>
    <a-typography-text style="font-size: 1.2em">
      {{ $t('page.banlog.description') }}
    </a-typography-text>
    <banlogTable />
  </a-space>
</template>
