import Vue from 'vue'
import Vant, { Locale } from 'vant'
import 'vant/lib/icon/local.css'

Vue.use(Vant)

const lang = $app.systemInfo.language
if (lang) Locale.use($const.LANGS.find(v => v.key == lang).lang, $const.UI_LANGS[lang])
