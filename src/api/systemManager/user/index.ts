import { useAxios } from '@/hooks/web/useAxios'
import type { types } from './types'

const request = useAxios()

export const getTableListApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/sys/users', params })
  return res && res.data
}

export const saveTableApi = async (data: Partial<types>): Promise<IResponse> => {
  const res = await request.post({ url: '/example/save', data })
  return res && res.data
}

export const delTableListApi = async (ids: string[] | number[]): Promise<IResponse> => {
  const res = await request.post({ url: '/example/delete', data: { ids } })
  return res && res.data
}
