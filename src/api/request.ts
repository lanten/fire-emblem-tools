import axios from 'axios'
import cookie from 'js-cookie'

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
  let { method, url, headers } = options
  const sendData: any = {
    url: `${url}/${service}`,
    // method,
    // headers,
    data: params,
  }
  return axios(sendData)
    .then(res => res.data)
    .catch((err: any) => {
      console.error({ sendData, err })
      return Promise.reject({ ...err, service, sendData, resData: err })
    })
}
