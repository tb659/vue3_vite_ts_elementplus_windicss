import { useAxios } from '@/hooks/web/useAxios'
import type { EpidemicManager } from './types'

const request = useAxios()

export const getEpidemicManagerApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/tourist_epc/', params })
  return res && res.data
}

export const postEpidemicManagerApi = async (
  data: Partial<EpidemicManager>
): Promise<IResponse> => {
  const res = await request.post({ url: '/api/tourist_epc/', data })
  return res && res.data
}

export const putEpidemicManagerApi = async (data: Partial<EpidemicManager>): Promise<IResponse> => {
  const res = await request.put({ url: '/api/tourist_epc/', data })
  return res && res.data
}

export const deleteEpidemicManagerApi = async (
  id: Partial<EpidemicManager>
): Promise<IResponse> => {
  const res = await request.delete({ url: `/api/tourist_epc/${id}` })
  return res && res.data
}

export const approvalEpidemicManagerApi = async (id: number): Promise<IResponse> => {
  const res = await request.put({ url: `/api/tourist_epc/approval/${id}?approvalStatus=approved` })
  return res && res.data
}
