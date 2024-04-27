<template>
  <a-space direction="vertical" fill>
    <a-card title="当前状态">
      <a-grid :cols="24" :row-gap="16" class="panel">
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 6 }">
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
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 6 }">
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
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 6 }">
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
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 6 }">
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
  </a-space>
</template>
<script setup lang="ts">
import { useRequest } from 'vue-request'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { useEndpointStore } from '@/stores/endpoint'
import { getStatistic } from '@/service/banList'
import { computed, watch } from 'vue'
const autoUpdateState = useAutoUpdate()
const endpointStore = useEndpointStore()
const { data, refresh } = useRequest(getStatistic, {
  pollingInterval: computed(() => autoUpdateState.pollingInterval),
  onSuccess: autoUpdateState.renewLastUpdate
})

watch(() => endpointStore.endpoint, refresh)
</script>
