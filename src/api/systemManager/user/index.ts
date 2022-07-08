import { useAxios } from '@/hooks/web/useAxios'
import type { UserListData } from './types'

const request = useAxios()

export const getUserListApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/sys/users', params })
  return res && res.data
}

export const postUserApi = async (data: Partial<UserListData>): Promise<IResponse> => {
  const res = await request.post({ url: '/api/sys/users', data })
  return res && res.data
}

export const putUserApi = async (data: Partial<UserListData>): Promise<IResponse> => {
  const res = await request.put({ url: '/api/sys/users', data })
  return res && res.data
}

export const deleteUserApi = async (id: Partial<UserListData>): Promise<IResponse> => {
  const res = await request.delete({ url: `/api/sys/users/${id}` })
  return res && res.data
}

export const putUserDisableApi = async (id: Partial<UserListData>): Promise<IResponse> => {
  const res = await request.put({ url: `/api/sys/users/${id}/disable` })
  return res && res.data
}

export const putUserEnableApi = async (id: Partial<UserListData>): Promise<IResponse> => {
  const res = await request.put({ url: `/api/sys/users/${id}/enable` })
  return res && res.data
}

export const putPasswordApi = async (data: Partial<UserListData>): Promise<IResponse> => {
  const res = await request.put({ url: `/api/sys/users/password/reset`, data })
  return res && res.data
}
