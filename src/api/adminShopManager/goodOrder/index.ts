import { useAxios } from '@/hooks/web/useAxios'

const request = useAxios()

export const getGoodOrderyApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/tourist_order/', params })
  return res && res.data
}

export const getGoodDetailApi = async (id: number): Promise<IResponse> => {
  const res = await request.get({ url: `/api/tourist_order/${id}` })
  return res && res.data
}
