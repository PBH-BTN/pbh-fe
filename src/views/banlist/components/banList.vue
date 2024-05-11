<template>
  <a-space direction="vertical" fill>
    <a-typography-title :heading="3">{{ t('page.banlist.banlist') }}</a-typography-title>
    <br />
    <a-space class="list-header" wrap>
      <a-typography-text>{{ t('page.banlist.banlist.description') }}</a-typography-text>
      <a-input-search
        :style="{ width: '250px' }"
        :placeholder="t('page.banlist.banlist.searchPlaceHolder')"
        @search="handleSearch"
        allow-clear
        search-button
      />
    </a-space>
    <a-list
      :virtualListProps="{
        height: virtualListHeight
      }"
      ref="banlist"
      @reach-bottom="loadMore"
      :scrollbar="false"
      :data="list"
    >
      <template #item="{ item, index }">
        <a-list-item
          :style="{ marginBottom: index === list.length - 1 && loadingMore ? '50px' : undefined }"
        >
          <a-descriptions
            :column="{ xs: 1, md: 2, xl: 3 }"
            :layout="(['inline-vertical', 'horizontal'] as const)[descriptionLayout]"
          >
            <template #title>
              <a-space wrap>
                <a-typography-text bold copyable>
                  {{ item.banMetadata.peer.address.ip }}:{{ item.banMetadata.peer.address.port }}
                </a-typography-text>
                <a-typography-text code>
                  {{ item.banMetadata.peer.clientName }}
                </a-typography-text>
              </a-space>
            </template>
            <a-descriptions-item
              v-if="item.banMetadata.reverseLookup !== 'N/A'"
              :label="t('page.banlist.banlist.listItem.reserveDNSLookup')"
              :span="1"
            >
              {{ item.banMetadata.reverseLookup }}
            </a-descriptions-item>
            <a-descriptions-item :label="t('page.banlist.banlist.listItem.banTime')" :span="1">
              {{ d(item.banMetadata.banAt, 'long') }}
            </a-descriptions-item>
            <a-descriptions-item :label="t('page.banlist.banlist.listItem.expireTime')" :span="1">
              {{ d(item.banMetadata.unbanAt, 'long') }}
            </a-descriptions-item>
            <a-descriptions-item :label="t('page.banlist.banlist.listItem.location')" :span="2">
              {{ item.banMetadata.torrent.name }}
            </a-descriptions-item>
            <a-descriptions-item :label="t('page.banlist.banlist.listItem.snapshot')" :span="1">
              <icon-arrow-up class="green" />
              {{ formatFileSize(item.banMetadata.peer.uploaded) }}
              <icon-arrow-down class="red" />
              {{ formatFileSize(item.banMetadata.peer.downloaded) }}
              - {{ (item.banMetadata.peer.progress * 100).toFixed(2) }}%
            </a-descriptions-item>
            <a-descriptions-item :label="t('page.banlist.banlist.listItem.reason')" :span="3">
              {{ item.banMetadata.description }}
            </a-descriptions-item>
            <a-descriptions-item
              v-if="item.banMetadata.geo"
              :label="t('page.banlist.banlist.listItem.geo')"
              :span="1"
            >
              <CountryFlag :iso="item.banMetadata.geo?.iso" mode="squared" />
              {{ `${item.banMetadata.geo?.countryRegion} ${item.banMetadata.geo?.city ?? ''}` }}
              <a-tooltip
                :content="`${item.banMetadata.geo?.latitude},${item.banMetadata.geo?.longitude}`"
              >
                <icon-location />
              </a-tooltip>
            </a-descriptions-item>
            <a-descriptions-item
              v-if="item.banMetadata.asn"
              :label="t('page.banlist.banlist.listItem.asn')"
              :span="2"
            >
              <a-space>
                <a-typography-text> {{ item.banMetadata.asn?.asOrganization }}</a-typography-text>
                <a-tag :color="getColor(item.banMetadata.asn?.asn.toString())">{{
                  item.banMetadata.asn?.asn
                }}</a-tag>
                <a-tooltip :content="item.banMetadata.asn?.asNetwork">
                  <icon-info-circle />
                </a-tooltip>
              </a-space>
            </a-descriptions-item>
          </a-descriptions>
        </a-list-item>
      </template>
      <template #scroll-loading>
        <a-empty v-if="list.length === 0" :style="{ height: `${virtualListHeight}px` }" />
        <div style="position: absolute; transform: translateY(-50%)" v-if="loadingMore">
          <a-typography-text v-if="bottom">{{
            t('page.banlist.banlist.bottomReached')
          }}</a-typography-text>
          <a-spin v-else />
        </div>
      </template>
    </a-list>
  </a-space>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-request'
import { computed, onMounted, ref, watch } from 'vue'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { useEndpointStore } from '@/stores/endpoint'
import { getBanList } from '@/service/banList'
import { formatFileSize } from '@/utils/file'
import type { BanList } from '@/api/model/banlist'
import { useI18n } from 'vue-i18n'
import { useResponsiveState } from '@arco-design/web-vue/es/grid/hook/use-responsive-state'
import { useWindowSize } from '@vueuse/core'
import { getColor } from '@/utils/color'
import CountryFlag from 'vue3-country-flag-icon'
import 'vue3-country-flag-icon/dist/CountryFlag.css' // import stylesheet
const { height } = useWindowSize()
const banlist = ref()
const autoUpdateState = useAutoUpdate()
const endpointState = useEndpointStore()
const bottom = ref(false)
const limit = ref(5)
const step = 5
const loadingMore = ref(false)
const { t, d } = useI18n()

let firstGet = true
async function getMoreBanList(): Promise<BanList[]> {
  if (firstGet || !data.value) {
    firstGet = false
    return getBanList(step)
  }
  if (data.value.length > limit.value - step) {
    // refresh the new data
    const newData: BanList[] = []
    let match = false
    // load more data until the limit or get the same data with the top one
    while (newData.length < limit.value && !match) {
      const moreData = await getBanList(step, newData[newData.length - 1]?.banMetadata.banAt)
      for (const item of moreData) {
        if (item.banMetadata.randomId !== data.value[0].banMetadata.randomId) {
          newData.push(item)
        } else {
          match = true
          break
        }
      }
    }
    if (match) {
      limit.value = data.value.length + newData.length
      return newData.concat(data.value)
    } else {
      return newData
    }
  }
  return data.value
}

const { data, refresh, run } = useRequest(getMoreBanList, {
  pollingInterval: computed(() => autoUpdateState.pollingInterval),
  onSuccess: autoUpdateState.renewLastUpdate,
  manual: true
})
const handleSearch = (value: string) => {
  if (value) {
    const index = data.value?.map((item) => item.address).findIndex((item) => item.includes(value))
    if (index !== -1) {
      banlist.value?.scrollIntoView({ index: index, align: 'auto' })
    }
  }
}

const loadMore = async () => {
  if (!data.value) return
  limit.value = data.value.length + step
  loadingMore.value = true
  bottom.value = false
  if (data.value.length <= limit.value) {
    const newData: BanList[] = []
    while (newData.length + data.value.length < limit.value && !bottom.value) {
      const moreData = await getBanList(
        step,
        (newData[newData.length - 1] || data.value[data.value.length - 1])?.banMetadata.banAt
      )
      if (moreData.length < step) {
        bottom.value = true
      }
      newData.push(...moreData)
    }
    data.value = data.value.concat(newData)
  }
  setTimeout(
    () => {
      loadingMore.value = false
    },
    bottom.value ? 1000 : 0
  )
}

watch(
  () => endpointState.endpoint,
  () => {
    limit.value = step
    data.value = undefined
    refresh()
  }
)

onMounted(run)

const list = computed(() => data.value ?? [])

const descriptionLayout = useResponsiveState(
  ref({
    xs: 0,
    md: 1
  }),
  1
)
const virtualListMaxHeight = useResponsiveState(
  ref({
    xs: 1500,
    md: 1000,
    xl: 800
  }),
  800
)
const virtualListHeight = computed(() => Math.min(virtualListMaxHeight.value, height.value - 200))
</script>

<style scoped lang="less">
.red {
  color: red;
}
.green {
  color: green;
}
.list-header {
  display: flex;
  justify-content: space-between;
}
</style>
