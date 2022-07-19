import { useAxios } from '@/hooks/web/useAxios'
import type { LeaseGoodData } from './types'

const request = useAxios()

export const getLeaseGoodApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/lease/', params })
  return res && res.data
}

export const postLeaseGoodApi = async (data: Partial<LeaseGoodData>): Promise<IResponse> => {
  const res = await request.post({ url: '/api/lease/', data })
  return res && res.data
}

export const putLeaseGoodApi = async (data: Partial<LeaseGoodData>): Promise<IResponse> => {
  const res = await request.put({ url: '/api/lease/', data })
  return res && res.data
}

export const deleteLeaseGoodApi = async (id: Partial<LeaseGoodData>): Promise<IResponse> => {
  const res = await request.delete({ url: `/api/lease/${id}` })
  return res && res.data
}

export const putLeaseGoodOnApi = async (id: Partial<LeaseGoodData>): Promise<IResponse> => {
  const res = await request.put({ url: `/api/lease/${id}/on_shelf` })
  return res && res.data
}

export const putLeaseGoodOffApi = async (id: Partial<LeaseGoodData>): Promise<IResponse> => {
  const res = await request.put({ url: `/api/lease/${id}/off_shelf` })
  return res && res.data
}
