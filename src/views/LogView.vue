<script setup lang="ts">
import banlogTable from '../components/banlogTable.vue'
import { ref, watch } from 'vue'
import { usePagination } from 'vue-request'
import { getBanlogs } from '@/service/banlogs'

const lastUpdate = ref(new Date().toLocaleString())
const autoUpdate = ref(true)
const { data, totalPage, current, loading, pageSize, run, cancel } = usePagination(getBanlogs, {
  defaultParams: [
    {
      pageIndex: 0,
      pageSize: 5
    }
  ],
  pagination: {
    currentKey: 'pageIndex',
    pageSizeKey: 'pageSize',
    totalKey: 'total'
  },
  pollingWhenOffline: true,
  pollingInterval: 3000,
  onSuccess: () => {
    lastUpdate.value = new Date().toLocaleString()
  }
})
const changePage = (page: number) => {
  current.value = page
}
watch(autoUpdate, (value) => {
  if (value) {
    run({
      pageIndex: 0,
      pageSize: 5
    })
  } else {
    cancel()
  }
})
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
  <banlogTable
    :data="data"
    :total-page="totalPage"
    :current="current"
    :loading="loading"
    :page-size="pageSize"
    :change-page="changePage"
  />
</template>
