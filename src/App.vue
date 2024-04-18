<template>
  <a-layout class="layout">
    <a-layout>
      <a-layout-header>
        <a-page-header
          :style="{ background: 'var(--color-bg-2)' }"
          title="PeerBanHelper"
          :show-back="false"
        >
          <template #extra>
            <a-radio-group type="button" :model-value="currentName" @change="goto">
              <a-radio v-for="router in routers" :key="router.name" :value="router.name">
                {{ router.meta?.label }}
              </a-radio>
            </a-radio-group>
          </template>
        </a-page-header>
      </a-layout-header>
      <a-layout style="padding: 0 24px">
        <a-layout-content><RouterView /></a-layout-content>
        <!-- <a-layout-footer>Footer</a-layout-footer> -->
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { useViewRoute } from './router'
const [routers, currentName, goto] = useViewRoute()
watch(currentName, (val) => console.log('currentName', val))
</script>
<style scoped></style>
