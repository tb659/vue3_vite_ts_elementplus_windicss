import { useAxios } from '@/hooks/web/useAxios'

const request = useAxios()

// 获取所有字典
export const getDictApi = async (): Promise<IResponse> => {
  const res = await request.get({ url: '/dict/list' })
  return res && res.data
}

// 模拟获取某个字典
export const getDictOneApi = async (): Promise<IResponse> => {
  const res = await request.get({ url: '/dict/one' })
  return res && res.data
}

// 文件上传
export const postUploadApi = async (url: string, data): Promise<IResponse> => {
  const res = await request.post({ url: url, data })
  return res && res.data
}

// 疫情防控
export const getEpcSettingApi = async (): Promise<IResponse> => {
  const res = await request.get({ url: '/api/app_setting/epc' })
  return res && res.data
}

// 疫情防控
export const putEpcSettingApi = async (data: string): Promise<IResponse> => {
  const res = await request.put({ url: '/api/app_setting/epc', data })
  return res && res.data
}
