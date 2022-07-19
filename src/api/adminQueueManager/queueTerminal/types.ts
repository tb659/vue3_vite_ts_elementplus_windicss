import { ShopInfoData } from '@/api/adminShopManager/shopInfo/types'

export type QueueTerminalData = {
  id: number
  dataState: number
  dataVersion: number
  disabled: boolean
  lastAccessTime: string
  mch: ShopInfoData
  mchId: number
  name: string
  openTime: string
  queuingDeviceSecret: string
  queuingDeviceState: 'online' | 'offline'
  waitingLimit: number
  waitingSeconds: number
}
