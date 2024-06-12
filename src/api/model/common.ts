export interface CommonResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface CommonResponseWithoutData {
  message: string
  success: boolean
}
