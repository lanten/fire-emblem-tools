/**
 * 在此处注册全局组件
 * @Date: 2019-07-17 17:33:03
 */

import Vue from 'vue'

import TransitionRouter from './transition-router'
import AppHeader from './app-header'
import VInput from './input'
import picker from './popup-picker'

Vue.component('transition-router', TransitionRouter)

// 导航器
Vue.component('app-header', AppHeader)

// 输入框
Vue.component('v-input', VInput)

// 快速打开一个选择器
Vue.prototype.$picker = picker
