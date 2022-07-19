import { useAxios } from '@/hooks/web/useAxios'
import type { TicketListData } from './types'

const request = useAxios()

export const getTicketListApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/ticket/', params })
  return res && res.data
}

export const postTicketListApi = async (data: Partial<TicketListData>): Promise<IResponse> => {
  const res = await request.post({ url: '/api/ticket/', data })
  return res && res.data
}

export const putTicketListApi = async (data: Partial<TicketListData>): Promise<IResponse> => {
  const res = await request.put({ url: '/api/ticket/', data })
  return res && res.data
}

export const deleteTicketListApi = async (id: Partial<TicketListData>): Promise<IResponse> => {
  const res = await request.delete({ url: `/api/ticket/${id}` })
  return res && res.data
}

export const putTicketListOnApi = async (id: Partial<TicketListData>): Promise<IResponse> => {
  const res = await request.put({ url: `/api/ticket/${id}/on_shelf` })
  return res && res.data
}

export const putTicketListOffApi = async (id: Partial<TicketListData>): Promise<IResponse> => {
  const res = await request.put({ url: `/api/ticket/${id}/off_shelf` })
  return res && res.data
}
