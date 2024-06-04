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
    <a-col v-if="!data || data?.length === 0" :xs="24" :sm="12" :md="8" :lg="6">
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
      <a-card :title="t('page.dashboard.clientStatus.card.title')" hoverable style="height: 290px">
        <a-typography>
          <a-typography-title>
            {{ client.name }}
          </a-typography-title>
          <a-typography-paragraph>
            <a-space>
              <a-typography-text>
                {{ t('page.dashboard.clientStatus.card.type') }}:</a-typography-text
              >
              <a-typography-text code>{{ client.type }}</a-typography-text>
              <a-tooltip :content="client.endpoint">
                <icon-info-circle />
              </a-tooltip>
            </a-space>
          </a-typography-paragraph>
          <a-typography-paragraph>
            {{ t('page.dashboard.clientStatus.card.status') }}:
            <a-typography-text :type="getStatusSafe(client)[0]">
              <icon-check-circle-fill v-if="client.lastStatus == ClientStatusEnum.HEALTHY" />
              <icon-close-circle-fill v-if="client.lastStatus == ClientStatusEnum.ERROR" />
              <icon-exclamation-circle-fill v-if="client.lastStatus == ClientStatusEnum.UNKNOWN" />
              {{ t(getStatusSafe(client)[1]) }}
            </a-typography-text>
          </a-typography-paragraph>
          <a-typography-paragraph v-if="client.lastStatus === ClientStatusEnum.HEALTHY">
            {{ t('page.dashboard.clientStatus.card.status.torrentNumber') }}
            {{ client.activeTorrents }}
            <a-tooltip :content="t('page.dashboard.torrentList.tips')">
              <button @click="() => torrentList?.showModal(client.name)">
                <icon-eye />
              </button>
            </a-tooltip>
          </a-typography-paragraph>

          <a-typography-paragraph v-if="client.lastStatus === ClientStatusEnum.HEALTHY">
            {{ t('page.dashboard.clientStatus.card.status.peerNumber') }}
            {{ client.activePeers }}</a-typography-paragraph
          >
        </a-typography>
      </a-card>
    </a-col>
  </a-row>
  <TorrentListModal ref="torrentList" />
</template>
<script setup lang="ts">
import { getClientStatus, getDownloaders } from '@/service/downloaders'
import { ClientStatusEnum, type ClientStatus } from '@/api/model/clientStatus'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { useEndpointStore } from '@/stores/endpoint'
import { useRequest } from 'vue-request'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDownloader } from '@/stores/downloader'
import TorrentListModal from './torrentListModal.vue'
const { t } = useI18n()
const statusMap: Record<ClientStatusEnum, [string, string]> = {
  [ClientStatusEnum.HEALTHY]: ['success', 'page.dashboard.clientStatus.card.status.normal'],
  [ClientStatusEnum.ERROR]: ['warning', 'page.dashboard.clientStatus.card.status.error'],
  [ClientStatusEnum.UNKNOWN]: ['danger', 'page.dashboard.clientStatus.card.status.unknown']
}
const downloaderStore = useDownloader()

const getStatusSafe = (status: ClientStatus | undefined): string[] =>
  statusMap[status?.lastStatus ?? ClientStatusEnum.UNKNOWN] ?? statusMap[ClientStatusEnum.UNKNOWN]

const autoUpdateState = useAutoUpdate()
const endpointState = useEndpointStore()
const downloader = useRequest(getDownloaders, {
  onSuccess: downloaderStore.updateDownloaders,
  cacheKey: () => `${endpointState.endpoint}-downloader`
})
const { data, refresh } = useRequest(getClientStatus, {
  pollingInterval: computed(() => autoUpdateState.pollingInterval),
  onSuccess: autoUpdateState.renewLastUpdate,
  cacheKey: () => `${endpointState.endpoint}-clientStatus`,
  ready: () => !downloader.loading.value
})

watch(() => endpointState.endpoint, refresh)

const torrentList = ref<InstanceType<typeof TorrentListModal>>()
</script>
<style scoped>
h1 {
  margin-top: 0;
}
button {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
