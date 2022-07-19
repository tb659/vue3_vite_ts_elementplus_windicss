export type LeaseOrderData = {
  id: number
  amount: number
  crtTime: number
  dataState: number
  dataVersion: number
  mchId: number
  mchName: string
  orderNumber: string
  orderStatus: 1 | 2 | 3 | 4 // 订单状态 1: 待支付,2:支付成功,3:支付失败,4:已核销
  touristId: number
  wxOpenId: string
}
export type LeaseGoodsDetailData = {
  id: number
  amount: number
  crtTime: number
  productCount: number
  productId: number
  productName: string
  productPrice: number
  touristOrderId: number
}
