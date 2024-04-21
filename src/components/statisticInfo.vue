<template>
  <a-space direction="vertical">
    <a-card title="当前状态">
      <a-grid :cols="24" :row-gap="16" class="panel">
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }">
          <a-statistic
            title="共检查"
            :value="data?.checkCounter"
            :value-from="data?.checkCounter"
            animation
            show-group-separator
          >
            <template #suffix> 次 </template>
          </a-statistic>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }">
          <a-statistic
            title="封禁Peers"
            :value="data?.peerBanCounter"
            :value-from="data?.peerBanCounter"
            animation
            show-group-separator
          >
            <template #suffix> 次 </template>
          </a-statistic>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }">
          <a-statistic
            title="解除已到期的封禁"
            :value="data?.peerUnbanCounter"
            :value-from="data?.peerUnbanCounter"
            animation
            show-group-separator
          >
            <template #suffix> 次 </template>
          </a-statistic>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }">
          <a-statistic
            title="当前处于封禁状态Peer"
            :value="(data?.peerBanCounter ?? 0) - (data?.peerUnbanCounter ?? 0)"
            :value-from="(data?.peerBanCounter ?? 0) - (data?.peerUnbanCounter ?? 0)"
            animation
            show-group-separator
          >
            <template #suffix> 个 </template>
          </a-statistic>
        </a-grid-item>
      </a-grid>
    </a-card>
    <a-typography-text>以下是封禁列表（按时间倒序排列）</a-typography-text>
  </a-space>
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
