import { useI18n } from 'vue-i18n'
import { Message } from '@arco-design/web-vue'

export default function useLocale() {
  const i18 = useI18n({ useScope: 'global' })

  const changeLocale = (value: string) => {
    if (i18.locale.value === value || !i18.availableLocales.includes(value)) {
      return
    }
    i18.locale.value = value
    document.querySelector('html')?.setAttribute('lang', value)
    Message.success(i18.t('navbar.action.locale'))
  }

  return {
    changeLocale
  }
}
