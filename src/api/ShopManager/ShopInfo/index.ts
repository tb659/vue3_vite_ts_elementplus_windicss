import { useAxios } from '@/hooks/web/useAxios'
import type { types } from './types'

const request = useAxios()

export const getApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '', params })
  return res && res.data
}

export const postApi = async (data: Partial<types>): Promise<IResponse> => {
  const res = await request.post({ url: '', data })
  return res && res.data
}

export const putApi = async (data: Partial<types>): Promise<IResponse> => {
  const res = await request.put({ url: '', data })
  return res && res.data
}

export const deleteApi = async (id: Partial<types>): Promise<IResponse> => {
  const res = await request.delete({ url: `${id}` })
  return res && res.data
}
