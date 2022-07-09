enum MchGroup {
  shop,
  venue
}

export type ShopInfoData = {
  id: number
  introduction: string
  mchType: string
  gis: string
  payQrCode: string
  crtTime: number
  tipTemplate: string
  mchGroup: MchGroup
}
