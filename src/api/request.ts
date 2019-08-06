import axios from 'axios'
import cookie from 'js-cookie'
import openLoading from '@/components/loading'

const DEFAULT_CONFIG = {
  method: 'get',
  url: '/datas',
  timeout: 30000,
  loading: true,
  errorType: 'toast',
}

/**
 * 发起一个请求
 * @param service
 * @param params
 * @param optionsSource
 */
export default function request(
  service: string,
  params?: RequestParams,
  optionsSource?: RequestOptions
) {
  if (!service) return Promise.reject('service is null')

  const options: RequestOptions = Object.assign({}, DEFAULT_CONFIG, optionsSource)
  let { method, url, headers, loading } = options
  const sendData: any = {
    url: `${url}/${service}`,
    // method,
    // headers,
    data: params,
  }
  const catchKey = JSON.stringify(sendData)
  const catchDataSource = localStorage.getItem(catchKey) || ''
  let catchData: any

  try {
    catchData = JSON.parse(catchDataSource)
  } catch (error) {
    catchData = void 0
  }

  if (catchData) {
    return new Promise(resolve => resolve(catchData))
  } else {
    if (loading) openLoading(true)
    return axios(sendData)
      .then(res => {
        localStorage.setItem(catchKey, JSON.stringify(res.data))
        res.data
      })
      .catch((err: any) => {
        console.error({ sendData, err })
        return Promise.reject({ ...err, service, sendData, resData: err })
      })
      .finally(() => {
        if (loading) openLoading(false)
      })
  }
}
