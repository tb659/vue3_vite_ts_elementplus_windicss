import { ShopInfoData } from '@/api/adminShopManager/shopInfo/types'

export type GoodCategoryData = {
  codeNumber: number
  crtTime: number
  dataState: number
  dataVersion: number
  description: string
  id: number
  imgPath: string
  mch: ShopInfoData
  mchId: number
  name: string
}
