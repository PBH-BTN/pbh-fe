export interface CommonResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface Pagination<T> {
  pageIndex: number
  pageSize: number
  results: T[]
  total: number
}

export type CommonResponseWithPage<T> = CommonResponse<Pagination<T>>
export interface CommonResponseWithoutData {
  message: string
  success: boolean
}
