import { useAxios } from '@/hooks/web/useAxios'
import type { TableData } from './types'

const request = useAxios()

export const getTableListApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/sys/roles', params })
  return res && res.data
}

export const postTableApi = async (data: Partial<TableData>): Promise<IResponse> => {
  const res = await request.post({ url: '/api/sys/roles', data })
  return res && res.data
}

export const putTableApi = async (data: Partial<TableData>): Promise<IResponse> => {
  const res = await request.put({ url: '/api/sys/roles', data })
  return res && res.data
}

export const deleteTableApi = async (id: Partial<TableData>): Promise<IResponse> => {
  const res = await request.delete({ url: `/api/sys/roles/${id}` })
  return res && res.data
}

export const putDisableApi = async (id: Partial<TableData>): Promise<IResponse> => {
  const res = await request.put({ url: `/api/sys/roles/${id}/disable` })
  return res && res.data
}

export const putEnableApi = async (id: Partial<TableData>): Promise<IResponse> => {
  const res = await request.put({ url: `/api/sys/roles/${id}/enable` })
  return res && res.data
}
