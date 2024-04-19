<template>
  <a-table
    :stripe="true"
    :columns="columns"
    :data="list"
    :loading="loading"
    :pagination="{
      total: totalPage * pageSize,
      current
    }"
    @page-change="changePage"
  >
    <template #banAt="{ record }">
      <p>{{ new Date(record.banAt).toLocaleString() }}</p>
    </template>
    <template #unbanAt="{ record }">
      <p>{{ record.unbanAt ? new Date(record.unbanAt).toLocaleString() : '未解封' }}</p>
    </template>
    <template #peerAddress="{ record }">
      <a-typography-text copyable code>
        {{ record.peerIp }}:{{ record.peerPort }}
      </a-typography-text>
    </template>
    <template #peerStatus="{ record }">
      <a-space>
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
import { computed } from 'vue'
import { watch } from 'vue'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { usePagination } from 'vue-request'
import { getBanlogs } from '@/service/banlogs'

function formatFileSize(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  if (i >= sizes.length) return 'Too large'
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
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

const columns = [
  {
    title: '封禁时间',
    slotName: 'banAt',
    width: 175
  },
  {
    title: '解封时间',
    slotName: 'unbanAt',
    width: 175
  },
  {
    title: 'Peer 地址',
    slotName: 'peerAddress',
    width: 230
  },
  {
    title: 'Peer Id',
    slotName: 'peerId',
    width: 120
  },
  {
    title: '流量快照',
    slotName: 'peerStatus',
    width: 150
  },
  {
    title: '种子名',
    dataIndex: 'torrentName',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '大小',
    slotName: 'torrentSize',
    width: 120
  },
  {
    title: '描述',
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
</style>
