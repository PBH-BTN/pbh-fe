<template>
  <a-space direction="vertical" fill>
    <a-card :title="t('page.dashboard.statics.currentStatus')">
      <a-grid :cols="24" :row-gap="16" class="panel">
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 6 }">
          <a-statistic
            :title="t('page.dashboard.statics.checked')"
            :value="current?.checkCounter"
            :value-from="previous.checkCounter"
            animation
            show-group-separator
          >
            <template #suffix>
              <a-typography-text
                >&nbsp;{{ t('page.dashboard.statics.times') }}
              </a-typography-text></template
            >
          </a-statistic>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 6 }">
          <a-statistic
            :title="t('page.dashboard.statics.banPeer')"
            :value="current?.peerBanCounter"
            :value-from="previous.peerBanCounter"
            animation
            show-group-separator
          >
            <template #suffix
              ><a-typography-text>&nbsp;{{ t('page.dashboard.statics.times') }} </a-typography-text>
            </template>
          </a-statistic>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 6 }">
          <a-statistic
            :title="t('page.dashboard.statics.unbanPeer')"
            :value="current?.peerUnbanCounter"
            :value-from="previous.peerUnbanCounter"
            animation
            show-group-separator
          >
            <template #suffix>
              <a-typography-text>&nbsp;{{ t('page.dashboard.statics.times') }} </a-typography-text>
            </template>
          </a-statistic>
        </a-grid-item>
        <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 6 }">
          <a-statistic
            :title="t('page.dashboard.statics.currentBan')"
            :value="current?.banlistCounter"
            :value-from="previous.banlistCounter"
            animation
            show-group-separator
          >
            <template #suffix>
              <a-typography-text>&nbsp;{{ t('page.dashboard.statics.number') }} </a-typography-text>
            </template>
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
import { getStatistic } from '@/service/clientStatus'
import type { Statistic } from '@/api/model/statistic'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { isEqual } from 'lodash'
const { t } = useI18n()
const autoUpdateState = useAutoUpdate()
const endpointStore = useEndpointStore()
const previous = ref<Statistic>({
  checkCounter: 0,
  peerBanCounter: 0,
  peerUnbanCounter: 0,
  banlistCounter: 0
})
const current = ref<Statistic>(previous.value)
const { refresh } = useRequest(getStatistic, {
  pollingInterval: computed(() => autoUpdateState.pollingInterval),
  onSuccess: (data) => {
    const tempPrevious = current.value
    current.value = data // 先刷新
    if (!isEqual(data, tempPrevious)) previous.value = tempPrevious
    autoUpdateState.renewLastUpdate()
  },
  cacheKey: () => `${endpointStore.endpoint}-statistic`
})

watch(() => endpointStore.endpoint, refresh)
</script>
