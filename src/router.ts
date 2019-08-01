/**
 * @Author: lanten
 * @Date: 2019-05-16 16:07:07
 * 子路由嵌套 自动载入所有 ./views 目录中的 routes.ts 文件
 * 如果 routes.ts 的内容是一个数组,数组成员将被加入到一级路由, name 属性可以省略,系统将自动生成
 */

import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Component from 'vue-class-component'
import store from './store'
import i18n from './lang'

const views = require.context('./views', true, /routes\.ts$/)
let routes: any = []
views.keys().map(path => {
  const conf = views(path).default
  if (Array.isArray(conf)) {
    const pathGroup = path.replace(/^\.\/(.+)\/routes\.ts$/, '$1')
    const pathGroupArray = pathGroup.split('/')
    routes = routes.concat(
      conf.map((v: RouteConfig) => {
        if (v.path) return v
        if (pathGroupArray[pathGroupArray.length - 1] === v.name) {
          v.path = `/${pathGroup}`
        } else {
          v.path = `/${pathGroup}/${v.name}`
        }
        return v
      })
    )
  } else {
    routes.push(conf)
  }
})

Vue.use(Router)

// 注册路由钩子
Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate'])

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  // 更新路由栈
  await store.dispatch('routeStack/update', { to, from })
  const { title } = to.meta

  if (title) {
    document.title = title
  } else {
    const titleKey = `pageTitle.${to.name}`
    const localizeTitle = i18n.t(titleKey)

    console.log({ titleKey, localizeTitle })
    document.title = localizeTitle === titleKey ? '' : <string>localizeTitle || ''
  }

  next()
})

export default router
