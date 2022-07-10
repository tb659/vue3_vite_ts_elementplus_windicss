import { useAxios } from '@/hooks/web/useAxios'
import type { StaffInfoData } from './types'

const request = useAxios()

export const getStaffInfoApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/employee/', params })
  return res && res.data
}

export const postStaffInfoApi = async (data: Partial<StaffInfoData>): Promise<IResponse> => {
  const res = await request.post({ url: '/api/employee/', data })
  return res && res.data
}

export const putStaffInfoApi = async (data: Partial<StaffInfoData>): Promise<IResponse> => {
  const res = await request.put({ url: '/api/employee/', data })
  return res && res.data
}

export const deleteStaffInfoApi = async (id: Partial<StaffInfoData>): Promise<IResponse> => {
  const res = await request.delete({ url: `/api/employee/${id}` })
  return res && res.data
}
