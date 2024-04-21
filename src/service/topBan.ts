import type { topBanItem } from "@/api/model/topban";

export function getTopBan(params:{num:number}): Promise<topBanItem[]> {
    const url = new URL(import.meta.env.VITE_APP_BASE_URL + 'api/maxbans', location.href)
    url.searchParams.set('num', String(params.num))
    return fetch(url).then((res) => res.json())
}