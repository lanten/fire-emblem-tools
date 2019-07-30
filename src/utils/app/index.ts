/*
 * @Date: 2019-05-17 17:48:04
 * 全局工具函数集,禁止包含业务逻辑,尽可能是没有副作用的纯函数
 */

import cookie from 'js-cookie'

export { default as systemInfo } from './systemInfo'

/**
 * 中划线转驼峰
 * @param {String} str
 * @param {Boolean} c 首字母是否大写
 */
export function toCamel(str: string, c?: boolean): string {
  let strH = str.replace(/([^-])(?:-+([^-]))/g, (_, $1, $2) => $1 + $2.toUpperCase())
  if (c) strH = strH.slice(0, 1).toUpperCase() + strH.slice(1)
  return strH
}

// 设置语言
export function setLanguage(lang: string) {
  cookie.set('language', lang)
}

// 获取 url 参数
export function getQuery(): UrlQuery {
  const query: UrlQuery = {}
  const { search } = window.location

  if (search) {
    search
      .substr(1)
      .split('&')
      .forEach(str => {
        const strArr = str.split('=')
        query[strArr[0]] = decodeURIComponent(strArr[1])
      })
  }
  return query
}

// 当前 url 参数
export const query = getQuery()

/**
 * 批量正则校验
 * @param {Array} rules example:[{ key: 'name',isNull:true, reg: /^.+$/, message: 'name is null!'}]
 * @param {Object} datas 需要校验的数据
 */
export function checkRules(datas: any, rules: Array<CheckRulesItem>): string | undefined {
  for (let i = 0; i < rules.length; i++) {
    const { key, reg, message, isNull, nullMessage } = rules[i]
    const value = datas[key]
    if (isNull && (value === '' || value === null || value === undefined))
      return nullMessage || message

    if (reg && !reg.test(value)) return message
  }
  return undefined
}
