import { useAxios } from '@/hooks/web/useAxios'
import type { QueueTerminalData } from './types'

const request = useAxios()

export const getQueueTerminalDataApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/queuing_device/', params })
  return res && res.data
}

export const postQueueTerminalDataApi = async (
  data: Partial<QueueTerminalData>
): Promise<IResponse> => {
  const res = await request.post({ url: '/api/queuing_device/', data })
  return res && res.data
}

export const putQueueTerminalDataApi = async (
  data: Partial<QueueTerminalData>
): Promise<IResponse> => {
  const res = await request.put({ url: '/api/queuing_device/', data })
  return res && res.data
}

export const deleteQueueTerminalDataApi = async (
  id: Partial<QueueTerminalData>
): Promise<IResponse> => {
  const res = await request.delete({ url: `/api/queuing_device/${id}` })
  return res && res.data
}
