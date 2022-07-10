import { useAxios } from '@/hooks/web/useAxios'
import type { GoodOrderData } from './types'

const request = useAxios()

export const getGoodOrderyApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '', params })
  return res && res.data
}

export const postGoodOrderyApi = async (data: Partial<GoodOrderData>): Promise<IResponse> => {
  const res = await request.post({ url: '', data })
  return res && res.data
}

export const putGoodOrderyApi = async (data: Partial<GoodOrderData>): Promise<IResponse> => {
  const res = await request.put({ url: '', data })
  return res && res.data
}

export const deleteGoodOrderyApi = async (id: Partial<GoodOrderData>): Promise<IResponse> => {
  const res = await request.delete({ url: `${id}` })
  return res && res.data
}
