<template>
  <a-popover :trigger="tigger === 'switch' ? 'click' : 'hover'">
    <a-button
      class="auto-update-btn"
      :class="ticktock ? 'ticktock' : ''"
      :type="autoUpdate.autoUpdate ? 'primary' : 'outline'"
      :shape="'circle'"
      @click="() => tigger !== 'switch' && switchAutoUpdate()"
      ref="autoUpdateBtn"
    >
      <icon-sync />
    </a-button>
    <template #title>
      <a-space>
        <div>{{ t('navbar.action.autoUpdate') }}</div>
        <a-switch v-if="tigger === 'switch'" v-model="autoUpdate.autoUpdate" />
      </a-space>
    </template>
    <template #content>
      <p>{{ t('navbar.action.autoUpdate.lastUpdate') }}</p>
      <p>{{ d(autoUpdate.lastUpdate, 'longlong') }}</p>
    </template>
  </a-popover>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAutoUpdate } from '@/stores/autoUpdate'
import { computed, ref, watch } from 'vue'
const { t, d } = useI18n()
const autoUpdate = useAutoUpdate()
const ticktock = ref(false)
const autoUpdateBtn = ref()

const props = defineProps<{
  tigger: 'click' | 'switch'
}>()

const tigger = computed(() => props.tigger)

watch(
  () => autoUpdate.lastUpdate,
  () => {
    ticktock.value = true
    const timmer = setTimeout(() => {
      ticktock.value = false
    }, 300)
    autoUpdateBtn.value?.$el?.addEventListener(
      'transitionend',
      () => {
        clearTimeout(timmer)
        ticktock.value = false
      },
      { once: true }
    )
  }
)

const switchAutoUpdate = () => {
  autoUpdate.autoUpdate = !autoUpdate.autoUpdate
}
</script>

<style lang="less" scoped>
.auto-update-btn,
.auto-update-btn:hover {
  font-size: 16px;
  &.ticktock {
    animation: whirl 0.3s ease-in-out 1;
  }
}

@keyframes whirl {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
