<template>
  <a-typography-text
    >共检查 {{ data?.checkCounter }} 次，封禁 {{ data?.peerBanCounter }} 次 Peers，解除已到期的封禁
    {{ data?.peerUnbanCounter }} 次。 当前共有
    {{ (data?.peerBanCounter ?? 0) - (data?.peerUnbanCounter ?? 0) }} 个 Peer
    处于封禁状态。以下是封禁列表（按时间倒序排列）</a-typography-text
  >
</template>
<script setup lang="ts">
import { useRequest } from 'vue-request'
import { watch } from 'vue'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { getStatistic } from '@/service/banList'
const autoUpdateState = useAutoUpdate()
const { data, run, cancel } = useRequest(getStatistic, {
  pollingWhenOffline: true,
  pollingInterval: 3000,
  onSuccess: () => {
    autoUpdateState.setLastUpdate(new Date())
  }
})
watch(autoUpdateState, (state) => {
  if (state.autoUpdate) {
    run()
  } else {
    cancel()
  }
})
</script>
