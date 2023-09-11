import Request from './request'
import { AxiosResponse } from 'axios'
import type { RequestConfig } from './request/types'

interface MyResponse<T> {
  status: number
  msg: string
  data: T
}

// 重写返回类型
interface YWZRequestConfig<T, R> extends RequestConfig<MyResponse<R>> {
  data?: T
}

const request = new Request({
  baseURL: '/zd-api',
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => config,
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      return result
    },
  },
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {YWZRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const MyRequest = <D = any, T = any>(config: YWZRequestConfig<D, T>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<MyResponse<T>>(config)
}
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url)
}
// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest()
}

export default MyRequest
