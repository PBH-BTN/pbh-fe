import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Message } from '@arco-design/web-vue'
import client from '@/api/client'

export default function useLocale() {
  const i18 = useI18n()
  const currentLocale = computed(() => {
    return i18.locale.value
  })
  client.defaults.headers.common['Accept-Language'] = currentLocale.value
  const changeLocale = (value: string) => {
    console.log('changeLocale', value)
    if (i18.locale.value === value) {
      return
    }
    i18.locale.value = value
    localStorage.setItem('pbh-locale', value)
    client.defaults.headers.common['Accept-Language'] = value
    document.querySelector('html')?.setAttribute('lang', value)
    Message.success(i18.t('navbar.action.locale'))
  }
  return {
    currentLocale,
    changeLocale
  }
}
