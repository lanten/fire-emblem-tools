import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const cns = require.context('./zh', true, /\.json$/)
const hks = require.context('./hk', true, /\.json$/)
const ens = require.context('./en', true, /\.json$/)

const langs = [{ name: 'zh', data: cns }, { name: 'hk', data: hks }, { name: 'en', data: ens }]

const messages: any = {}

langs.forEach(({ name, data }) => {
  const obj: any = {}

  data.keys().forEach(item => {
    const key = $app.toCamel(item.replace(/^\.\/(.*)\.json$/, '$1'))
    obj[key] = data(item)
  })
  messages[name] = obj
})

let localLang: string = $app.systemInfo.language

if (localLang === '') {
  localLang = setLanguage()
  $app.setLanguage(localLang)
}

function setLanguage(): string {
  let lang = navigator.language.toLowerCase()
  lang = lang.substr(0, 2) //截取lang前2位字符
  if (lang === 'zh') {
    if (lang.indexOf('tw') > -1 || lang.indexOf('hk') > -1) {
      return 'hk'
    } else {
      return 'zh'
    }
  } else {
    return 'en'
  }
}

export default new VueI18n({
  locale: localLang,
  messages,
  silentTranslationWarn: true, //禁用警告
})
