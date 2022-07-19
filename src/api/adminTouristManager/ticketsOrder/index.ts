import { useAxios } from '@/hooks/web/useAxios'

const request = useAxios()

export const getTicketsOrderApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/tourist_ticket/', params })
  return res && res.data
}

export const getTicketsDetailApi = async (id: number): Promise<IResponse> => {
  const res = await request.get({ url: `/api/tourist_ticket/${id}` })
  return res && res.data
}
