<template>
  <a-table
    :columns="columns"
    :data="list"
    :pagination="{
      total: totalPage * pageSize,
      current
    }"
    @page-change="(page: number) => (current = page)"
  />
</template>
<script setup lang="ts">
import { usePagination } from 'vue-request'
import { computed } from 'vue'
import { getBanlogs } from '@/service/banlogs'

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
const { data, current, totalPage, loading, pageSize } = usePagination(getBanlogs, {
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
  }
})
const list = computed(() => data.value?.result)
</script>
