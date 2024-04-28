<template>
  <a-config-provider :locale="ArcoI18nMessages[locale]">
    <a-layout style="min-height: 100vh;">
      <a-layout-header>
        <pageHeader />
      </a-layout-header>
      <a-layout-content>
        <a-space direction="vertical" fill style="width: 100%; max-width: 1200px; margin: auto">
          <a-alert type="warning" closable>{{ t('main.workInProgressTips') }}</a-alert>
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
import { ArcoI18nMessages } from './locale';

const { t, locale } = useI18n()
const [routers, currentName, goto] = useViewRoute()
</script>
