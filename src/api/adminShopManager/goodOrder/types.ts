import { ShopInfoData } from '@/api/adminShopManager/shopInfo/types'
import { GoodInfoData } from '@/api/adminShopManager/goodInfo/types'

export type GoodOrderData = {
  id: number
  orderCode: number
  crtTime: number
  dataState: number
  dataVersion: number
  mch: ShopInfoData
  product: GoodInfoData
  status: number
  price: number
}
