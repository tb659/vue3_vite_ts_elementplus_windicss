export type TicketsOrderData = {
  id: number
  crtTime: number
  dataState: number
  dataVersion: number
  idNo: string
  idType: string
  mchId: number
  mchName: string
  purchaseDate: string
  ticketName: string
  ticketProductId: number
  ticketStatus: 'payed' | 'used' | 'expired' | 'invalid'
  ticketType: string
  touristId: number
  touristName: string
  touristNikeName: string
  visitDate: string
  price: number
}

export type TicketsDetailData = {
  id: number
  amount: number
  crtTime: number
  productCount: number
  productId: number
  productName: string
  productPrice: number
  touristOrderId: number
}
