<template>
  <a-table
    stripe="true"
    :columns="columns"
    :data="list"
    :loading="loading"
    :pagination="{
      total: totalPage * pageSize,
      current
    }"
    @page-change="changePage"
  >
    <template #peerSpeed="{ record }">
      <p>
        {{ formatFileSize(record.peerUploaded) }}<icon-arrow-up class="green" />{{
          formatFileSize(record.peerDownloaded)
        }}<icon-arrow-down class="red" />
      </p>
    </template>
    <template #torrentName="{ record }">
      <a-tooltip :content="record.torrentInfoHash">
        <p>{{ record.torrentName }}</p>
      </a-tooltip>
    </template>
    <template #torrentSize="{ record }">
      <p>{{ formatFileSize(record.torrentSize) }}</p>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { watch } from 'vue'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { usePagination } from 'vue-request'
import { getBanlogs } from '@/service/banlogs'

function formatFileSize(fileSize: number) {
  let temp
  if (fileSize < 1024) {
    return fileSize + 'B'
  } else if (fileSize < 1024 * 1024) {
    temp = fileSize / 1024
    temp = temp.toFixed(2)
    return temp + 'KB'
  } else if (fileSize < 1024 * 1024 * 1024) {
    temp = fileSize / (1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'MB'
  } else {
    temp = fileSize / (1024 * 1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'GB'
  }
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
    title: 'Peer speed',
    slotName: 'peerSpeed'
  },
  {
    title: 'Peer Progress',
    dataIndex: 'peerProgress'
  },
  {
    title: 'Torrent Name',
    slotName: 'torrentName'
  },
  {
    title: 'Torrent Size',
    slotName: 'torrentSize'
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

<style scoped>
.red {
  color: red;
}
.green {
  color: green;
}
</style>
