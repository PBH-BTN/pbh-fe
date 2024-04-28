<template>
  <a-table
    :stripe="true"
    :columns="columns"
    :data="list"
    :loading="tableLoading"
    :pagination="{
      total,
      current,
      pageSize,
      showPageSize: true
    }"
    column-resizable
    @page-change="changeCurrent"
    @page-size-change="changePageSize"
  >
    <template #banAt="{ record }">
      <p>{{ d(record.banAt, 'long') }}</p>
    </template>
    <template #unbanAt="{ record }">
      <p>
        {{ record.unbanAt ? d(record.unbanAt, 'long') : t('page.banlog.banlogTable.notUnbanned') }}
      </p>
    </template>
    <template #peerAddress="{ record }">
      <a-typography-text copyable code>
        {{ record.peerIp }}:{{ record.peerPort }}
      </a-typography-text>
    </template>
    <template #peerStatus="{ record }">
      <a-space fill style="justify-content: space-between">
        <div>
          <p>{{ formatFileSize(record.peerUploaded) }}<icon-arrow-up class="green" /></p>
          <p>{{ formatFileSize(record.peerDownloaded) }}<icon-arrow-down class="red" /></p>
        </div>
        <a-tooltip :content="(record.peerProgress * 100).toFixed(2) + '%'">
          <a-progress :percent="record.peerProgress" size="mini" />
        </a-tooltip>
      </a-space>
    </template>
    <template #peerId="{ record }">
      <p>
        {{ record.peerId }}
        <a-tooltip :content="record.peerClientName">
          <icon-info-circle />
        </a-tooltip>
      </p>
    </template>
    <template #torrentSize="{ record }">
      <a-tooltip :content="`Hash: ${record.torrentInfoHash}`">
        <p>{{ formatFileSize(record.torrentSize) }}</p>
      </a-tooltip>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { useEndpointStore } from '@/stores/endpoint'
import { usePagination } from 'vue-request'
import { getBanlogs } from '@/service/banLogs'
import { formatFileSize } from '@/utils/file'
import { useI18n } from 'vue-i18n'
const forceLoading = ref(true)
const autoUpdateState = useAutoUpdate()
const endpointState = useEndpointStore()
const { t, d } = useI18n()
const { data, total, current, loading, pageSize, changeCurrent, changePageSize, refresh } =
  usePagination(getBanlogs, {
    defaultParams: [1, 10],
    pagination: {
      currentKey: 'pageIndex',
      pageSizeKey: 'pageSize',
      totalKey: 'total'
    },
    pollingInterval: computed(() => autoUpdateState.pollingInterval),
    cacheKey: (params) => `${endpointState.endpoint}-banlogs-${params?.join('-')}`,
    onSuccess: autoUpdateState.renewLastUpdate,
    onAfter: () => {
      forceLoading.value = false
    }
  })

watch([pageSize, current], () => {
  forceLoading.value = true
})

watch(() => endpointState.endpoint, refresh)

const tableLoading = computed(() => {
  return forceLoading.value || loading.value || !list.value
})

const columns = [
  {
    title: () => t('page.banlog.banlogTable.column.banTime'),
    slotName: 'banAt',
    width: 180
  },
  {
    title: () => t('page.banlog.banlogTable.column.unbanTime'),
    slotName: 'unbanAt',
    width: 180
  },
  {
    title: () => t('page.banlog.banlogTable.column.peerAddress'),
    slotName: 'peerAddress',
    width: 230
  },
  {
    title: () => t('page.banlog.banlogTable.column.peerId'),
    slotName: 'peerId',
    width: 120
  },
  {
    title: () => t('page.banlog.banlogTable.column.trafficSnapshot'),
    slotName: 'peerStatus',
    width: 150
  },
  {
    title: () => t('page.banlog.banlogTable.column.torrentName'),
    dataIndex: 'torrentName',
    ellipsis: true,
    tooltip: true
  },
  {
    title: () => t('page.banlog.banlogTable.column.torrentSize'),
    slotName: 'torrentSize',
    width: 120
  },
  {
    title: () => t('page.banlog.banlogTable.column.description'),
    dataIndex: 'description',
    ellipsis: true,
    tooltip: true
  }
]
const list = computed(() => data.value?.results)
</script>

<style scoped>
.red {
  color: red;
}
.green {
  color: green;
}
.arco-pagination {
  flex-wrap: wrap;
  gap: 10px 0;
  justify-content: end;
}
</style>
