import { useAxios } from '@/hooks/web/useAxios'
import type { GoodInfoData } from './types'

const request = useAxios()

export const getGoodInfoApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/product/', params })
  return res && res.data
}

export const postGoodInfoApi = async (data: Partial<GoodInfoData>): Promise<IResponse> => {
  const res = await request.post({ url: '/api/product/', data })
  return res && res.data
}

export const putGoodInfoApi = async (data: Partial<GoodInfoData>): Promise<IResponse> => {
  const res = await request.put({ url: '/api/product/', data })
  return res && res.data
}

export const deleteGoodInfoApi = async (id: Partial<GoodInfoData>): Promise<IResponse> => {
  const res = await request.delete({ url: `/api/product/${id}` })
  return res && res.data
}
