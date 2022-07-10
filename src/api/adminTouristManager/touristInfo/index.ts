import { useAxios } from '@/hooks/web/useAxios'
import type { TouristInfoData } from './types'

const request = useAxios()

export const getTouristInfoApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/tourist/', params })
  return res && res.data
}

export const postTouristInfoApi = async (data: Partial<TouristInfoData>): Promise<IResponse> => {
  const res = await request.post({ url: '/api/tourist/', data })
  return res && res.data
}

export const putTouristInfoApi = async (data: Partial<TouristInfoData>): Promise<IResponse> => {
  const res = await request.put({ url: '/api/tourist/', data })
  return res && res.data
}

export const deleteTouristInfoApi = async (id: Partial<TouristInfoData>): Promise<IResponse> => {
  const res = await request.delete({ url: `/api/tourist/${id}` })
  return res && res.data
}
