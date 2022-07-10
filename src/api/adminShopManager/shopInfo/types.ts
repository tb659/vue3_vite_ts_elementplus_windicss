export type ShopInfoData = {
  id: number
  name: string
  dataVersion: number
  introduction: string
  mchType: string
  gis: string
  payQrCode: string
  crtTime: number
  tipTemplate: string
  mchCategory: 'shop' | 'venue'
}
