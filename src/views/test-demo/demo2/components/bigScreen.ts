export type tempObj = {
  name: string
  value: number
}
// 天气
export type weather = {
  type: string
  date: string
  imgUrl: any
}
// 综合 水 电 气
export type LifeIndicators = {
  icon: any
  name: string
  value?: string
}
// 只能工单
export type workerOrder = {
  name: string
  value: number
  color: string
  imgUrl: any
}
