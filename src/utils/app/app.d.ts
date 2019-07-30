/*
 * @Date: 2019-05-17 18:17:01
 * TS 声明文件
 */

declare namespace $app {
  /**
   * 中划线转驼峰
   * @param {String} str
   * @param {Boolean} c 首字母是否大写
   */
  function toCamel(str: string, c?: boolean): string

  /**
   * 获取系统信息
   */
  const systemInfo: SystemInfo

  /**
   * 当前 url 参数
   */
  const query: UrlQuery

  /**
   * 设置语言
   * @param lang ['zh','hk','en']
   */
  function setLanguage(lang: string): void

  /**
   * 获取 url 参数
   */
  function getQuery(): UrlQuery

  /**
   * 批量校验
   * @param rules
   * @param datas
   * @returns 如果没有返回 string , 则校验通过
   */
  function checkRules(datas: any, rules: Array<CheckRulesItem>): string | undefined
}

interface CheckRulesItem {
  key: string
  nullMessage?: any
  isNull?: boolean
  reg?: RegExp
  message?: any
}
