declare interface Fn<T = any> {
  (...arg: T[]): T
}

declare type Nullable<T> = T | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type ElememtPlusSize = 'default' | 'small' | 'large'

declare type ElementPlusInfoType = 'success' | 'info' | 'warning' | 'danger'

declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

declare type ComponentRef<T> = InstanceType<T>

declare type LocaleType = 'zh-CN' | 'en'

declare type AxiosHeaders =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'

declare type AxiosMethod = 'get' | 'post' | 'delete' | 'put'

declare type AxiosResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

declare type UploadAccessLevel = 'PUBLIC' | 'PRIVATE'

declare interface AxiosConfig {
  params?: any
  data?: any
  url?: string
  method?: AxiosMethod
  headersType?: string
  responseType?: AxiosResponseType
}
interface Data {
  page: number
  rows: any[]
  size: number
  total: number
}
declare interface IResponse<T = any> {
  code: string
  // data: Data
  data: T extends Data ? T : T & any
  message: string
  sign: null
  success: boolean
}
declare interface Window {
  BMap: any
}
declare interface Env {
  BASE_URL?: string
  DEV?: boolean
  MODE?: string
  PROD?: boolean
  SSR?: boolean
  VITE_API_BASEPATH?: string
  VITE_APP_TITLE?: string
  VITE_BASE_PATH?: string
  VITE_USER_NODE_ENV?: string
}
