import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { ElMessage } from 'element-plus'

import qs from 'qs'

import { getToken, setToken } from '@/utils/auth'

import { config } from '@/config/axios/config'

import { formatUrl } from '@/utils'

import { REQUEST_TOKEN_KEY } from './config'

const { result_code, base_url } = config

// export const PATH_URL = 'http://120.55.167.167:9202'
export const PATH_URL = base_url[import.meta.env.VITE_API_BASEPATH]

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.request_timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (
      config.method === 'post' &&
      config!.headers!['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data)
    }
    // get参数编码
    if (config.method === 'get' && config.params) {
      let url = config.url as string
      url = formatUrl(url, config.params)
      config.params = {}
      config.url = url
    }
    // 携带授权信息
    getToken() && (config!.headers![REQUEST_TOKEN_KEY] = getToken())
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse<Recordable>) => {
    // 存储授权信息
    if (response.headers.authorization) {
      setToken(response.headers.authorization)
    }
    if (response.data.code === result_code) {
      return response
    } else {
      ElMessage.error(response.data.message)
    }
  },
  (error: AxiosError) => {
    console.log('err' + error) // for debug
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export { service }
