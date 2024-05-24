import type { version } from '@/api/model/version'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'
import { Octokit } from '@octokit/core'
export class GetVersionError extends Error {
  name = 'GetVersionError' as const
  constructor(
    message: string,
    public isApiWrong = true
  ) {
    super(message)
  }

  static is(err: unknown): err is GetVersionError {
    return (err as Error)?.name === GetVersionError.name
  }
}

export function getLatestVersion(token = useEndpointStore().accessToken) {
  const octokit = new Octokit({ auth: token })
  return octokit
    .request('GET /repos/{owner}/{repo}/releases/latest', {
      owner: 'PBH-BTN',
      repo: 'PeerBanHelper',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    .then((res) => res.data)
}

export function getVersion(endpoint = useEndpointStore().endpoint): Promise<version> {
  const url = new URL(urlJoin(endpoint, '/api/metadata/manifest'), location.href)
  return (
    fetch(url, { headers: getCommonHeader(false) })
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
