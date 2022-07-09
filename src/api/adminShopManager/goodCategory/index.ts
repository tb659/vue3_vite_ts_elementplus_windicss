import { useAxios } from '@/hooks/web/useAxios'
import type { GoodCategoryData } from './types'

const request = useAxios()

export const getShopInfoApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/merchant/', params })
  return res && res.data
}

export const postShopInfoApi = async (data: Partial<GoodCategoryData>): Promise<IResponse> => {
  const res = await request.post({ url: '/api/merchant/', data })
  return res && res.data
}

export const putShopInfoApi = async (data: Partial<GoodCategoryData>): Promise<IResponse> => {
  const res = await request.put({ url: '/api/merchant/', data })
  return res && res.data
}

export const deleteShopInfoApi = async (id: Partial<GoodCategoryData>): Promise<IResponse> => {
  const res = await request.delete({ url: `/api/merchant/${id}` })
  return res && res.data
}
