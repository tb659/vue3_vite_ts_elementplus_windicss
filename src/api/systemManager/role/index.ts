import { useAxios } from '@/hooks/web/useAxios'
import type { RoleListData } from './types'

const request = useAxios()

export const getRoleListApi = async (params: any): Promise<IResponse> => {
  const res = await request.get({ url: '/api/sys/roles', params })
  return res && res.data
}

export const postRoleApi = async (data: Partial<RoleListData>): Promise<IResponse> => {
  const res = await request.post({ url: '/api/sys/roles', data })
  return res && res.data
}

export const putRoleApi = async (data: Partial<RoleListData>): Promise<IResponse> => {
  const res = await request.put({ url: '/api/sys/roles', data })
  return res && res.data
}

export const deleteRoleApi = async (id: Partial<RoleListData>): Promise<IResponse> => {
  const res = await request.delete({ url: `/api/sys/roles/${id}` })
  return res && res.data
}

export const putRoleDisableApi = async (id: Partial<RoleListData>): Promise<IResponse> => {
  const res = await request.put({ url: `/api/sys/roles/${id}/disable` })
  return res && res.data
}

export const putRoleEnableApi = async (id: Partial<RoleListData>): Promise<IResponse> => {
  const res = await request.put({ url: `/api/sys/roles/${id}/enable` })
  return res && res.data
}
