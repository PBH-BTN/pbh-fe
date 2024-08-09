<template>
  <div>
    <a-typography-text style="font-size: 1.2em">
      {{ $t('page.topban.description') }}
    </a-typography-text>

    <a-typography>
      <a-typography-title :heading="3">{{
        $t('page.topban.title', { topNumber })
      }}</a-typography-title>
      <a-typography-paragraph>
        {{ $t('page.topban.usage') }}
      </a-typography-paragraph>
    </a-typography>
    <a-space fill direction="vertical">
      <a-space>
        <a-typography-text>{{ $t('page.topban.onlyShow') }}</a-typography-text>
        <a-select v-model="topNumber" :trigger-props="{ autoFitPopupMinWidth: true }">
          <a-option :value="10">10</a-option>
          <a-option :value="20">20</a-option>
          <a-option :value="30">30</a-option>
          <a-option :value="40">40</a-option>
          <a-option :value="50">50</a-option>
        </a-select>
        <a-typography-text>{{ $t('page.topban.onlyShow.number') }}</a-typography-text>
      </a-space>
      <top50Table :top-number="topNumber" />
    </a-space>
  </div>
</template>

<script setup lang="ts">
import top50Table from './components/top50Table.vue'
import { ref } from 'vue'
const topNumber = ref(50)
</script>
