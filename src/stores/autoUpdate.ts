import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAutoUpdate = defineStore('autoUpdate', () => {
  const lastUpdate = ref(new Date().toLocaleString())
  const autoUpdate = ref(true)
  function toggleAutoUpdate(v: boolean) {
    autoUpdate.value = v
  }
  function setLastUpdate(d: Date) {
    lastUpdate.value = d.toLocaleString()
  }
  return { lastUpdate, autoUpdate, toggleAutoUpdate, setLastUpdate }
})
