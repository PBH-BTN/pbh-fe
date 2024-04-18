<script setup lang="ts">
import banlogTable from '../components/banlogTable.vue'
import { watch } from 'vue'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { usePagination } from 'vue-request'
import { getBanlogs } from '@/service/banlogs'

const autoUpdateState = useAutoUpdate()
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
  onSuccess: () => autoUpdateState.setLastUpdate(new Date())
})
const changePage = (page: number) => {
  current.value = page
}
watch(autoUpdateState, (state) => {
  if (state.autoUpdate) {
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
  <banlogTable
    :data="data"
    :total-page="totalPage"
    :current="current"
    :loading="loading"
    :page-size="pageSize"
    :change-page="changePage"
  />
</template>
