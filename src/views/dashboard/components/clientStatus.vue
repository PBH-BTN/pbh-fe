<template>
  <a-typography-title :heading="3">{{ t('page.dashboard.clientStatus.title') }}</a-typography-title>
  <a-row
    justify="start"
    :wrap="true"
    :gutter="[
      { xs: 8, sm: 8, md: 8, lg: 24, xl: 32 },
      { xs: 8, sm: 8, md: 8, lg: 24, xl: 32 }
    ]"
  >
    <!-- 骨架屏 -->
    <a-col v-if="!data" :xs="24" :sm="12" :md="8" :lg="6">
      <a-card hoverable>
        <a-skeleton :animation="true">
          <a-space direction="vertical" :style="{ width: '100%' }" size="large">
            <a-skeleton-line />
            <a-skeleton-line />
            <a-skeleton-line />
            <a-skeleton-line />
          </a-space>
        </a-skeleton>
      </a-card>
    </a-col>
    <!-- client 卡片 -->
    <a-col v-else :xs="24" :sm="12" :md="8" :lg="6" v-for="client in data" :key="client.name">
      <a-card :title="t('page.dashboard.clientStatus.card.title')" hoverable>
        <a-typography>
          <a-tooltip :content="client.endpoint">
            <a-typography-paragraph style="font-size: 2em">
              <b>{{ client.name }}</b>
            </a-typography-paragraph>
          </a-tooltip>
          <a-typography-paragraph>
            {{ t('page.dashboard.clientStatus.card.status') }}:
            <a-typography-text :type="getStatusSafe(client)[0]"
              ><icon-check-circle-fill v-if="client.status == ClientStatusEnum.HEALTHY" />
              <icon-close-circle-fill v-if="client.status == ClientStatusEnum.ERROR" />
              <icon-exclamation-circle-fill v-if="client.status == ClientStatusEnum.UNKNOWN" />
              {{ t(getStatusSafe(client)[1]) }}</a-typography-text
            >
          </a-typography-paragraph>

          <a-typography-paragraph>
            {{ t('page.dashboard.clientStatus.card.status.torrentNumber') }}
            {{ client.torrents }}</a-typography-paragraph
          >

          <a-typography-paragraph>
            {{ t('page.dashboard.clientStatus.card.status.peerNumber') }}
            {{ client.peers }}</a-typography-paragraph
          >
        </a-typography>
      </a-card>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
import { getClientStatus } from '@/service/clientStatus'
import { ClientStatusEnum, type ClientStatus } from '@/api/model/clientStatus'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { useEndpointStore } from '@/stores/endpoint'
import { useRequest } from 'vue-request'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const statusMap = new Map([
  [ClientStatusEnum.HEALTHY, ['success', 'page.dashboard.clientStatus.card.status.normal']],
  [ClientStatusEnum.ERROR, ['warning', 'page.dashboard.clientStatus.card.status.error']],
  [ClientStatusEnum.UNKNOWN, ['danger', 'page.dashboard.clientStatus.card.status.unknown']]
])
const getStatusSafe = (status: ClientStatus | undefined): string[] => {
  if (status === undefined) {
    return statusMap.get(ClientStatusEnum.UNKNOWN)!!
  }
  if (!statusMap.has(status.status)) {
    return statusMap.get(ClientStatusEnum.UNKNOWN)!!
  }
  return statusMap.get(status.status)!!
}
const autoUpdateState = useAutoUpdate()
const endpointState = useEndpointStore()
const { data, refresh } = useRequest(getClientStatus, {
  pollingInterval: computed(() => autoUpdateState.pollingInterval),
  onSuccess: autoUpdateState.renewLastUpdate,
  cacheKey: () => `${endpointState.endpoint}-clientStatus`
})

watch(() => endpointState.endpoint, refresh)
</script>
