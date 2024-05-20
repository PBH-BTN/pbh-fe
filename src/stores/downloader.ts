import type { Downloader } from '@/api/model/clientStatus'
import { getDownloaders } from '@/service/downloaders'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDownloader = defineStore('downlaoder', () => {
  const downloaders = ref<Downloader[]>([])
  const updateDownloaders = (data: Downloader[]) => {
    downloaders.value = data
  }
  return { downloaders, updateDownloaders }
})
