import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAutoUpdate = defineStore('autoUpdate', () => {
  const lastUpdate = ref(new Date())
  const autoUpdate = useStorage('autoUpdate.enable', true)
  const interval = useStorage('autoUpdate.interval', 3000)
  const pollingInterval = computed(() => {
    return autoUpdate.value ? interval.value : -1
  })
  function renewLastUpdate() {
    lastUpdate.value = new Date()
  }
  return { lastUpdate, autoUpdate, interval, pollingInterval, renewLastUpdate }
})
