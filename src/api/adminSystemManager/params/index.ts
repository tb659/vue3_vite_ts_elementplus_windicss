import { useAxios } from '@/hooks/web/useAxios'
import type { Data } from './types'

const request = useAxios()

export const getApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '', params })
  return res && res.data
}

export const putApi = async (data: Partial<Data>): Promise<IResponse> => {
  const res = await request.put({ url: '', data })
  return res && res.data
}
