<template>
  <a-row
    justify="center"
    align="stretch"
    :wrap="true"
    :gutter="[
      { xs: 12, sm: 12, md: 12, lg: 12, xl: 24 },
      { xs: 12, sm: 12, md: 12, lg: 12, xl: 24 }
    ]"
  >
    <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
      <banLine />
    </a-col>
    <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
      <fieldPie />
    </a-col>
    <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
      <trends />
    </a-col>
    <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
      <traffic />
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import banLine from './components/banLine.vue'
import fieldPie from './components/fieldPie.vue'
import trends from './components/trends.vue'
import traffic from './components/traffic.vue'
</script>

<style>
.chart {
  height: 50vh;
}
</style>
