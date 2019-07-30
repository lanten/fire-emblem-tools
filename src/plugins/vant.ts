import Vue from 'vue'
import Vant, { Locale } from 'vant'

Vue.use(Vant)

const lang = $app.systemInfo.language
if (lang) Locale.use($const.LANGS.find(v => v.key == lang).lang, $const.UI_LANGS[lang])
