/*
 * @Date: 2019-05-28 15:49:28
 * 全局常量表 $const
 */

export const LANGS = [
  { key: 'zh', name: '简体中文' },
  { key: 'hk', name: '繁體中文' },
  { key: 'en', name: 'English' },
]

export const UI_LANGS = {
  zh: require('vant/lib/locale/lang/zh-CN').default,
  hk: require('vant/lib/locale/lang/zh-TW').default,
  en: require('vant/lib/locale/lang/en-US').default,
}
