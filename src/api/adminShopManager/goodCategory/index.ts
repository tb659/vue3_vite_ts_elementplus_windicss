import { useAxios } from '@/hooks/web/useAxios'
import type { GoodCategoryData } from './types'

const request = useAxios()

export const getGoodCategoryApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/product_type/', params })
  return res && res.data
}

export const postGoodCategoryApi = async (data: Partial<GoodCategoryData>): Promise<IResponse> => {
  const res = await request.post({ url: '/api/product_type/', data })
  return res && res.data
}

export const putGoodCategoryApi = async (data: Partial<GoodCategoryData>): Promise<IResponse> => {
  const res = await request.put({ url: '/api/product_type/', data })
  return res && res.data
}

export const deleteGoodCategoryApi = async (id: Partial<GoodCategoryData>): Promise<IResponse> => {
  const res = await request.delete({ url: `/api/product_type/${id}` })
  return res && res.data
}
