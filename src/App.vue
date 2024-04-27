<template>
  <a-config-provider :locale="locale">
    <a-layout>
      <a-layout-header>
        <pageHeader />
      </a-layout-header>
      <a-layout-content>
        <a-space direction="vertical" fill style="width: 100%; max-width: 1200px; margin: auto">
          <a-alert type="warning" closable>{{ $t('main.workInProgressTips') }}</a-alert>
          <a-tabs :active-key="currentName" @change="goto" size="large">
            <a-tab-pane
              v-for="router in routers"
              :key="router.name"
              :title="t(String(router.meta?.label))"
            >
            </a-tab-pane>
          </a-tabs>
          <RouterView />
          <a-divider />
        </a-space>
      </a-layout-content>
      <a-layout-footer><pageFooter /></a-layout-footer>
    </a-layout>
  </a-config-provider>
</template>
<script setup lang="ts">
import { useViewRoute } from './router'
import pageFooter from './components/pageFooter.vue'
import pageHeader from './components/pageHeader.vue'
import { useI18n } from 'vue-i18n'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import useLocale from './stores/locale'
import { computed } from 'vue'

const { currentLocale } = useLocale()
const { t } = useI18n()
const [routers, currentName, goto] = useViewRoute()
const locales = new Map([
  ['zh-CN', zhCN],
  ['en-US', enUS]
])
const locale = computed(() => {
  return locales.get(currentLocale.value) || zhCN
})
</script>
