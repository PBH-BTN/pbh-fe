<template>
  <a-table
    :columns="columns"
    :data="list"
    :loading="loading"
    :pagination="{
      total: totalPage * pageSize,
      current
    }"
    @page-change="changePage"
  />
</template>
<script setup lang="ts">
import { computed } from 'vue'
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

const columns = [
  {
    title: 'Ban at',
    dataIndex: 'banAt'
  },
  {
    title: 'Unban at',
    dataIndex: 'unbanAt'
  },
  {
    title: 'Peer Ip',
    dataIndex: 'peerIp'
  },
  {
    title: 'Peer Port',
    dataIndex: 'peerPort'
  },
  {
    title: 'PeerId',
    dataIndex: 'peerId'
  },
  {
    title: 'Peer Client Name',
    dataIndex: 'peerClientName'
  },
  {
    title: 'Peer Uploaded',
    dataIndex: 'peerUploaded'
  },
  {
    title: 'Peer Downloaded',
    dataIndex: 'peerDownloaded'
  },
  {
    title: 'Peer Progress',
    dataIndex: 'peerProgress'
  },
  {
    title: 'Torrent Info Hash',
    dataIndex: 'torrentInfoHash'
  },
  {
    title: 'Torrent Name',
    dataIndex: 'torrentName'
  },
  {
    title: 'Torrent Size',
    dataIndex: 'torrentSize'
  },
  {
    title: 'Module',
    dataIndex: 'module'
  },
  {
    title: 'Description',
    dataIndex: 'description'
  }
]
const list = computed(() => data.value?.result)
</script>
