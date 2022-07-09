import { ShopInfoData } from '@/api/adminShopManager/shopInfo/types'
import { GoodCategoryData } from '@/api/adminShopManager/goodCategory/types'

enum productCategory {
  goods,
  lease,
  ticket
}

export type GoodInfoData = {
  buyingTips: string
  dataVersion: number
  id: number
  introduction: string
  inventoryNumber: number
  leaseDeposit: boolean
  leaseDepositMoney: number
  leaseMaxCount: number
  leaseUnit: string
  manufacturer: string
  mch: ShopInfoData
  crtTime: number
  name: string
  onShelf: boolean
  onShelfTime: string
  packingUnit: string
  price: number
  produceCategory: productCategory
  productImage: string
  productType: GoodCategoryData
  purchasePrice: number
  ticketType: string
  touristGroup: string
}
