import { useAxios } from '@/hooks/web/useAxios'
import type { WorkOrderData } from './types'

const request = useAxios()

export const getWorkOrderApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/work_order/', params })
  return res && res.data
}

export const postWorkOrderApi = async (data: Partial<WorkOrderData>): Promise<IResponse> => {
  const res = await request.post({ url: '/api/work_order/', data })
  return res && res.data
}

export const putWorkOrderApi = async (data: Partial<WorkOrderData>): Promise<IResponse> => {
  const res = await request.put({ url: '/api/work_order/', data })
  return res && res.data
}

export const deleteWorkOrderApi = async (id: Partial<WorkOrderData>): Promise<IResponse> => {
  const res = await request.delete({ url: `/api/work_order/${id}` })
  return res && res.data
}
