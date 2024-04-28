import type { version } from '@/api/model/version'

import axios from '@/api/client'

export const getVersion = (): Promise<version> => axios.get('api/version').then((res) => res.data)
