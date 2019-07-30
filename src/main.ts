import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import i18n from './lang'

import './plugins/vant' // vant
import './utils/rem' // rem 自适应
import './components/global-components' // 注册全局组件

Vue.config.productionTip = false

// VNode 根节点挂载: window.$root
window.$root = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
