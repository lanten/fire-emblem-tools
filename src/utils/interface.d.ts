/**
 * 转换成对象的 url 参数 (search)
 */
declare interface UrlQuery {
  [key: string]: string
}

declare interface DataSourceItem {
  title: string // 学级
  names: Array<string>
  data: Array<Array<any>>
}
