import type { version } from "@/api/model/version"

export function getVersion(): Promise<version> {
    const url = new URL(import.meta.env.VITE_APP_BASE_URL + 'api/version', location.href)
    return fetch(url).then((res) => res.json())
}