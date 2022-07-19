import { useAxios } from '@/hooks/web/useAxios'
// import type { QueueInfoData } from './types'

const request = useAxios()

export const getQueueInfoDataApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/queuing/', params })
  return res && res.data
}

// export const postApi = async (data: Partial<Data>): Promise<IResponse> => {
//   const res = await request.post({ url: '/api/queuing/', data })
//   return res && res.data
// }

// export const putApi = async (data: Partial<Data>): Promise<IResponse> => {
//   const res = await request.put({ url: '/api/queuing/', data })
//   return res && res.data
// }

// export const deleteApi = async (id: Partial<Data>): Promise<IResponse> => {
//   const res = await request.delete({ url: `/api/queuing/${id}` })
//   return res && res.data
// }
