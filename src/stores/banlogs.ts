import type { banlog } from '@/api/model/banlogs'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBanLogsStore = defineStore('banlogs', () => {
  const banLogsResult = ref<{
    pageIndex: Number
    pageSize: Number
    result: banlog[]
    total: Number
  }>()
  const getBanlogs = async () => {
    const response = await fetch('https://nas.gaojianli.me:8443/pbh/api/banlogs?pageIndex=0').then(
      (res) => res.json()
    )
    banLogsResult.value = response
  }
  return { banLogsResult, getBanlogs }
})
