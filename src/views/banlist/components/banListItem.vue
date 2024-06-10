<template>
  <a-descriptions
    :column="{ xs: 3, md: 6, xl: 12 }"
    size="medium"
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
    <a-descriptions-item :label="t('page.banlist.banlist.listItem.banTime')" :span="4">
      {{ d(item.banMetadata.banAt, 'long') }}
    </a-descriptions-item>
    <a-descriptions-item :label="t('page.banlist.banlist.listItem.expireTime')" :span="4">
      {{ d(item.banMetadata.unbanAt, 'long') }}
    </a-descriptions-item>
    <a-descriptions-item :label="t('page.banlist.banlist.listItem.snapshot')" :span="4">
      <icon-arrow-up class="green" />
      {{ formatFileSize(item.banMetadata.peer.uploaded) }}
      <icon-arrow-down class="red" />
      {{ formatFileSize(item.banMetadata.peer.downloaded) }}
      - {{ (item.banMetadata.peer.progress * 100).toFixed(2) }}%
    </a-descriptions-item>
    <a-descriptions-item :label="t('page.banlist.banlist.listItem.location')" :span="12">
      <a-typography-text style="margin-bottom: 0" :ellipsis="{ showTooltip: true }">
        {{ item.banMetadata.torrent.name }}</a-typography-text
      >
    </a-descriptions-item>
    <a-descriptions-item :label="t('page.banlist.banlist.listItem.reason')" :span="12">
      <a-typography-text style="margin-bottom: 0">
        {{ item.banMetadata.description }}
      </a-typography-text>
    </a-descriptions-item>
    <a-descriptions-item
      v-if="item.banMetadata.geo"
      :label="t('page.banlist.banlist.listItem.geo')"
      :span="4"
    >
      <CountryFlag :iso="item.banMetadata.geo?.iso" mode="squared" />
      {{ `${item.banMetadata.geo?.countryRegion} ${item.banMetadata.geo?.city ?? ''}` }}
      <a-link
        :href="`https://uri.amap.com/marker?position=${item.banMetadata.geo?.longitude},${item.banMetadata.geo?.latitude}`"
        :hoverable="false"
      >
        <icon-location />
      </a-link>
    </a-descriptions-item>
    <a-descriptions-item
      v-if="item.banMetadata.asn"
      :label="t('page.banlist.banlist.listItem.asn')"
      :span="4"
    >
      <a-space>
        <a-typography-text> {{ item.banMetadata.asn?.asOrganization }}</a-typography-text>
        <a-tag :color="getColor(item.banMetadata.asn?.asn.toString())">{{
          item.banMetadata.asn?.asn
        }}</a-tag>
        <a-tooltip
          :content="t('page.banlist.banlist.listItem.asn.subnet') + item.banMetadata.asn?.asNetwork"
        >
          <a-link
            :href="`https://2ip.io/analytics/asn-list/?asnId=${item.banMetadata.asn?.asn}`"
            :hoverable="false"
          >
            <icon-info-circle />
          </a-link>
        </a-tooltip>
      </a-space>
    </a-descriptions-item>
    <a-descriptions-item
      v-if="item.banMetadata.reverseLookup !== 'N/A'"
      :label="t('page.banlist.banlist.listItem.reserveDNSLookup')"
      :span="4"
    >
      {{ item.banMetadata.reverseLookup }}
    </a-descriptions-item>
  </a-descriptions>
</template>
<script setup lang="ts">
import { formatFileSize } from '@/utils/file'
import { getColor } from '@/utils/color'
import CountryFlag from './countryFlag.vue'
import type { BanList } from '@/api/model/banlist'
import { useResponsiveState } from '@arco-design/web-vue/es/grid/hook/use-responsive-state'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t, d } = useI18n()
defineProps<{
  item: BanList
}>()
const descriptionLayout = useResponsiveState(
  ref({
    xs: 0,
    md: 1
  }),
  1
)
</script>

<style scoped>
.red {
  color: red;
}
.green {
  color: green;
}
a {
  color: var(--color-text-1);
  text-decoration: none;
}
</style>
