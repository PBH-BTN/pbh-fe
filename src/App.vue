<template>
  <a-config-provider :locale="ArcoI18nMessages[locale]">
    <a-layout>
      <a-layout-header>
        <pageHeader />
      </a-layout-header>
      <a-layout-content>
        <a-space direction="vertical" fill style="width: 100%; max-width: 1200px; margin: auto">
          <!-- <a-alert type="warning" closable>{{ t('main.workInProgressTips') }}</a-alert> -->
          <!-- <router-view v-if="currentName === 'login'" /> -->
          <Login v-if="status === 'needLogin'" />
          <a-tabs
            v-else
            :active-key="currentName"
            @change="goto"
            size="large"
            :animation="true"
            :destroy-on-hide="true"
            :lazy-load="true"
          >
            <a-tab-pane
              v-for="router in routers"
              :key="router.name"
              :title="t(String(router.meta?.label))"
            >
              <component :is="router.component" />
            </a-tab-pane>
          </a-tabs>
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
import { ArcoI18nMessages } from './locale'
import { useEndpointStore } from './stores/endpoint'
import { computed } from 'vue'
import Login from '@/views/login/index.vue'

const endPointStore = useEndpointStore()
const status = computed(() => endPointStore.status)

const { t, locale } = useI18n()
const [routers, currentName, goto] = useViewRoute()
</script>
