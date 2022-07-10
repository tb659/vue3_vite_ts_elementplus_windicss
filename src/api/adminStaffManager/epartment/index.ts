import { useAxios } from '@/hooks/web/useAxios'
import type { EpartmentData } from './types'

const request = useAxios()

export const getEpartmentApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/duty_group/', params })
  return res && res.data
}

export const postEpartmentApi = async (data: Partial<EpartmentData>): Promise<IResponse> => {
  const res = await request.post({ url: '/api/duty_group/', data })
  return res && res.data
}

export const putEpartmentApi = async (data: Partial<EpartmentData>): Promise<IResponse> => {
  const res = await request.put({ url: '/api/duty_group/', data })
  return res && res.data
}

export const deleteEpartmentApi = async (id: Partial<EpartmentData>): Promise<IResponse> => {
  const res = await request.delete({ url: `/api/duty_group/${id}` })
  return res && res.data
}
