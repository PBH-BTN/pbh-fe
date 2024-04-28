import type { version } from '@/api/model/version'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'
import { useI18n } from 'vue-i18n'

export class GetVersionError extends Error {
  constructor(
    message: string,
    public isApiWrong = true
  ) {
    super(message)
  }
}

export function getVersion(endpoint = useEndpointStore().endpoint): Promise<version> {
  const url = new URL(urlJoin(endpoint, 'api/version'), location.href)
  return (
    fetch(url, { headers: getCommonHeader() })
      .catch(() => {
        throw new GetVersionError('service.version.networkError', false)
      })
      .then((res) =>
        res.json().catch(() => {
          throw new GetVersionError('service.version.parseError')
        })
      )
      // 后续可以添加后端版本的校验和提醒
      .then((res: version) => {
        if (!res.version) {
          throw new GetVersionError('service.version.formatError')
        }
        return res
      })
  )
}
