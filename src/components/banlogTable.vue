<template>
  <a-table :columns="columns" :data="data" :pagination="pagination" />
</template>
<script setup lang="ts">
import { useBanLogsStore } from '@/stores/banlogs'
import { ref } from 'vue'
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
const banlog = useBanLogsStore()
await banlog.getBanlogs()
const data = ref(banlog.banLogsResult?.result)
const pagination = ref({
  pageSize: 5
})
</script>
