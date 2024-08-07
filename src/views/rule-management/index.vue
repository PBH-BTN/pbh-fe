<template>
  <a-tabs default-active-key="ip" lazy-load>
    <a-tab-pane v-for="type in blackListTypes" :key="type">
      <template #title>
        <iconList :type="type" />
        {{ t('page.rule_management.' + type) }}
      </template>
      <genericBlackList :type="type" />
    </a-tab-pane>
    <a-tab-pane key="subscribe">
      <template #title>
        <a-space><icon-cloud />{{ t('page.rule_management.ruleSubscribe.title') }}</a-space>
      </template>
      <subscribeManagement />
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { Icon } from '@arco-design/web-vue';
import subscribeManagement from './components/subscribe/index.vue'
import genericBlackList from './components/generic/index.vue'
import { useI18n } from 'vue-i18n'
import type { ruleType } from '@/api/model/blacklist';
import { IconLocation, IconStorage } from '@arco-design/web-vue/es/icon';
import { defineComponent, h } from 'vue';


const { t } = useI18n()
const blackListTypes: ruleType[] = ['ip', 'port', 'asn', 'region', 'city']
//const blackListTypes: ruleType[] = ['ip', 'port', 'asn', 'region', 'city', 'netType']
const IconFont = Icon.addFromIconFontCn({ src: 'https://at.alicdn.com/t/c/font_4646549_f3kbb5m24hq.js' });



const iconList = defineComponent({
  props: {
    type: String
  },
  setup(props) {
    return () => {
      switch (props.type) {
        case 'ip': return h(IconFont, { type: "icon-IP" })
        case 'port': return h(IconFont, { type: "icon-dituleiduankou" })
        case 'asn': return h(IconStorage)
        case 'region': return h(IconLocation)
        case 'city': return h(IconFont, { type: "icon-chengshi" })
        case 'netType': return h(IconFont, { type: "icon-kuandai" })
      }
    }
  }
})
</script>
