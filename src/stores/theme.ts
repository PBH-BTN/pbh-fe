import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' //默认主题
  const theme = useStorage('theme', systemTheme)
  const toggleTheme = (dark: boolean) => {
    if (dark) {
      theme.value = 'dark'
      document.body.setAttribute('arco-theme', 'dark')
    } else {
      theme.value = 'light'
      document.body.removeAttribute('arco-theme')
    }
  }
  return { theme, toggleTheme }
})
