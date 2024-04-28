import { getNavigatorLanguage } from '@/locale'

export function getCommonHeader(): Headers {
  // Accept-Language
  const lang = document.querySelector('html')?.getAttribute('lang') || getNavigatorLanguage()
  const headers = new Headers()
  headers.set('Accept-Language', lang)
  return headers
}
