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
import { computed, type Ref } from 'vue'
const props = defineProps<{
  data: Ref<any>
  current: number
  totalPage: number
  loading: boolean
  pageSize: number
  changePage: (page: number) => void
}>()
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
const list = computed(() => props.data.value?.result)
</script>
