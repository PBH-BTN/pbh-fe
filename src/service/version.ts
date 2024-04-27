import type { version } from '@/api/model/version'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'

export class GetVersionError extends Error {
  constructor(
    message: string,
    public isApiWrong = true
  ) {
    super(message)
  }
}

export function getVersion(): Promise<version> {
  const { endpoint } = useEndpointStore()

  const url = new URL(urlJoin(endpoint, 'api/version'), location.href)
  return fetch(url)
    .catch(() => {
      throw new GetVersionError('网络故障，无法发起请求', false)
    })
    .then((res) =>
      res.json().catch(() => {
        throw new GetVersionError('无法解析接口返回数据，请检查服务地址是否正确')
      })
    )
    // 后续可以添加后端版本的校验和提醒
    .then((res: version) => {
      if (!res.version) {
        throw new GetVersionError('后端接口响应格式错误，请检查后端版本')
      }
      return res
    })
}
