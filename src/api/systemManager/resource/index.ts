import { useAxios } from '@/hooks/web/useAxios'
import type { ResourceListData } from './types'

const request = useAxios()

export const getResourceListApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/sys/resources', params })
  return res && res.data
}

export const postResourceApi = async (data: Partial<ResourceListData>): Promise<IResponse> => {
  const res = await request.post({ url: '/api/sys/resources', data })
  return res && res.data
}

export const putResourceApi = async (data: Partial<ResourceListData>): Promise<IResponse> => {
  const res = await request.put({ url: '/api/sys/resources', data })
  return res && res.data
}

export const deleteResourceApi = async (id: Partial<ResourceListData>): Promise<IResponse> => {
  const res = await request.delete({ url: `/api/sys/resources/${id}` })
  return res && res.data
}

export const putResourceDisableApi = async (id: Partial<ResourceListData>): Promise<IResponse> => {
  const res = await request.put({ url: `/api/sys/resources/${id}/disable` })
  return res && res.data
}

export const putResourceEnableApi = async (id: Partial<ResourceListData>): Promise<IResponse> => {
  const res = await request.put({ url: `/api/sys/resources/${id}/enable` })
  return res && res.data
}
